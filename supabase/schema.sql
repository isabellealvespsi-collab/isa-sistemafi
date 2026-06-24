-- ============================================================
-- PROSPERIDADE — Schema completo do banco de dados
-- Execute este SQL no Supabase SQL Editor
-- ============================================================

-- ── Extensões ──
create extension if not exists "uuid-ossp";

-- ── Enum: titular ──
create type titular_enum as enum ('Isa', 'Fe', 'Casal');

-- ============================================================
-- 1. PERFIS (Isa e Fe)
-- ============================================================
create table if not exists profiles (
  id         uuid references auth.users on delete cascade primary key,
  nome       text not null,
  avatar_url text,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
create policy "Usuários veem próprio perfil" on profiles
  for all using (auth.uid() = id);

-- ============================================================
-- 2. SAÍDAS (Extrato — alma do sistema)
-- ============================================================
create table if not exists saidas (
  id         uuid default uuid_generate_v4() primary key,
  data       date not null,
  descricao  text not null,
  categoria  text not null,
  titular    titular_enum not null,
  valor      numeric(12,2) not null check (valor > 0),
  conta      text not null,
  created_at timestamptz default now(),
  created_by uuid references auth.users default auth.uid()
);

alter table saidas enable row level security;
create policy "Casal vê todas as saídas" on saidas
  for all using (true);

-- Índices para performance
create index saidas_data_idx      on saidas(data desc);
create index saidas_titular_idx   on saidas(titular);
create index saidas_categoria_idx on saidas(categoria);

-- ============================================================
-- 3. ENTRADAS
-- ============================================================
create table if not exists entradas (
  id         uuid default uuid_generate_v4() primary key,
  data       date not null,
  descricao  text not null,
  tipo       text not null default 'Salário', -- Salário, Freelance, Rendimento, Outros
  titular    titular_enum not null,
  valor      numeric(12,2) not null check (valor > 0),
  conta      text not null,
  created_at timestamptz default now(),
  created_by uuid references auth.users default auth.uid()
);

alter table entradas enable row level security;
create policy "Casal vê todas as entradas" on entradas
  for all using (true);

create index entradas_data_idx    on entradas(data desc);
create index entradas_titular_idx on entradas(titular);

-- ============================================================
-- 4. CONTAS BANCÁRIAS
-- ============================================================
create table if not exists contas_bancarias (
  id         uuid default uuid_generate_v4() primary key,
  nome       text not null,           -- Nubank, Itaú, Inter, Bradesco
  sigla      text not null,           -- Nu, It, In, Br
  cor        text not null,           -- Hex color #820AD1
  rgb        text not null,           -- '130,10,209'
  saldo      numeric(12,2) default 0,
  titular    titular_enum not null,
  created_at timestamptz default now()
);

alter table contas_bancarias enable row level security;
create policy "Casal vê todas as contas" on contas_bancarias
  for all using (true);

-- Dados iniciais das contas
insert into contas_bancarias (nome, sigla, cor, rgb, saldo, titular) values
  ('Nubank',   'Nu', '#820AD1', '130,10,209', 8240.00,  'Isa'),
  ('Itaú',     'It', '#EC7000', '236,112,0',  7180.50,  'Fe'),
  ('Inter',    'In', '#FF7A00', '255,122,0',  12000.00, 'Casal'),
  ('Bradesco', 'Br', '#CC0000', '204,0,0',    2100.00,  'Fe');

-- ============================================================
-- 5. CARTÕES DE CRÉDITO
-- ============================================================
create table if not exists cartoes_credito (
  id         uuid default uuid_generate_v4() primary key,
  nome       text not null,
  sigla      text not null,
  bandeira   text not null,           -- VISA, MASTERCARD
  cor        text not null,
  rgb        text not null,
  limite     numeric(12,2) not null,
  vencimento int not null,            -- dia do mês (1-31)
  titular    titular_enum not null,
  created_at timestamptz default now()
);

alter table cartoes_credito enable row level security;
create policy "Casal vê todos os cartões" on cartoes_credito
  for all using (true);

insert into cartoes_credito (nome, sigla, bandeira, cor, rgb, limite, vencimento, titular) values
  ('Nubank', 'Nu', 'VISA',       '#820AD1', '130,10,209', 7000, 10, 'Isa'),
  ('Itaú',   'It', 'MASTERCARD', '#EC7000', '236,112,0',  5000, 15, 'Fe'),
  ('Inter',  'In', 'VISA',       '#FF7A00', '255,122,0',  3000, 20, 'Casal');

-- ============================================================
-- 6. LANÇAMENTOS DE CARTÃO
-- ============================================================
create table if not exists lancamentos_cartao (
  id         uuid default uuid_generate_v4() primary key,
  cartao_id  uuid references cartoes_credito on delete cascade,
  data       date not null,
  descricao  text not null,
  categoria  text not null,
  valor      numeric(12,2) not null check (valor > 0),
  created_at timestamptz default now(),
  created_by uuid references auth.users default auth.uid()
);

alter table lancamentos_cartao enable row level security;
create policy "Casal vê todos os lançamentos de cartão" on lancamentos_cartao
  for all using (true);

create index lancamentos_cartao_data_idx on lancamentos_cartao(data desc);

-- ============================================================
-- 7. DESPESAS FIXAS
-- ============================================================
create table if not exists despesas_fixas (
  id            uuid default uuid_generate_v4() primary key,
  descricao     text not null,
  categoria     text not null,
  valor         numeric(12,2) not null check (valor > 0),
  dia_vencimento int not null,        -- dia do mês (1-31)
  titular       titular_enum not null,
  conta         text not null,
  ativa         boolean default true,
  created_at    timestamptz default now()
);

alter table despesas_fixas enable row level security;
create policy "Casal vê todas as despesas fixas" on despesas_fixas
  for all using (true);

-- ============================================================
-- 8. PAGAMENTOS DE DESPESAS FIXAS (controle mensal)
-- ============================================================
create table if not exists pagamentos_despesas (
  id              uuid default uuid_generate_v4() primary key,
  despesa_id      uuid references despesas_fixas on delete cascade,
  mes             int not null,        -- 1-12
  ano             int not null,
  pago            boolean default false,
  data_pagamento  date,
  created_at      timestamptz default now()
);

alter table pagamentos_despesas enable row level security;
create policy "Casal vê todos os pagamentos" on pagamentos_despesas
  for all using (true);

-- ============================================================
-- 9. METAS FINANCEIRAS
-- ============================================================
create table if not exists metas (
  id           uuid default uuid_generate_v4() primary key,
  nome         text not null,
  valor_meta   numeric(12,2) not null,
  valor_atual  numeric(12,2) default 0,
  prazo        date not null,
  titular      titular_enum not null,
  cor          text default '#D966FF',
  ativa        boolean default true,
  created_at   timestamptz default now()
);

alter table metas enable row level security;
create policy "Casal vê todas as metas" on metas
  for all using (true);

-- ============================================================
-- 10. VIEWS úteis (atualizam automaticamente)
-- ============================================================

-- Resumo mensal de saídas por categoria
create or replace view resumo_saidas_mes as
select
  extract(year  from data)::int as ano,
  extract(month from data)::int as mes,
  categoria,
  titular,
  sum(valor)   as total,
  count(*)     as quantidade
from saidas
group by 1,2,3,4;

-- Resumo mensal de entradas por tipo
create or replace view resumo_entradas_mes as
select
  extract(year  from data)::int as ano,
  extract(month from data)::int as mes,
  tipo,
  titular,
  sum(valor)   as total,
  count(*)     as quantidade
from entradas
group by 1,2,3,4;

-- Saldo calculado por conta (saldo inicial + entradas - saídas)
create or replace view saldo_contas as
select
  c.id,
  c.nome,
  c.sigla,
  c.cor,
  c.rgb,
  c.titular,
  c.saldo as saldo_inicial,
  coalesce(e.total_entradas, 0) as total_entradas,
  coalesce(s.total_saidas, 0)   as total_saidas,
  c.saldo
    + coalesce(e.total_entradas, 0)
    - coalesce(s.total_saidas, 0) as saldo_atual
from contas_bancarias c
left join (
  select conta, sum(valor) as total_entradas from entradas group by conta
) e on e.conta = c.nome
left join (
  select conta, sum(valor) as total_saidas from saidas group by conta
) s on s.conta = c.nome;

-- Fatura atual por cartão
create or replace view fatura_cartoes as
select
  cc.id,
  cc.nome,
  cc.sigla,
  cc.bandeira,
  cc.cor,
  cc.rgb,
  cc.limite,
  cc.vencimento,
  cc.titular,
  coalesce(sum(lc.valor), 0) as fatura_atual,
  cc.limite - coalesce(sum(lc.valor), 0) as limite_disponivel
from cartoes_credito cc
left join lancamentos_cartao lc
  on lc.cartao_id = cc.id
  and extract(month from lc.data) = extract(month from current_date)
  and extract(year  from lc.data) = extract(year  from current_date)
group by cc.id, cc.nome, cc.sigla, cc.bandeira, cc.cor, cc.rgb, cc.limite, cc.vencimento, cc.titular;
