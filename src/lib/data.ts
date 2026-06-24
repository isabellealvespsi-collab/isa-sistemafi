import { createClient } from './supabase/client'

const sb = () => createClient()

/* ── Saídas ── */
export async function getSaidas(mes?: number, ano?: number) {
  let q = sb().from('saidas').select('*').order('data', { ascending: false })
  if (mes && ano) {
    const start = `${ano}-${String(mes).padStart(2,'0')}-01`
    const end   = `${ano}-${String(mes).padStart(2,'0')}-31`
    q = q.gte('data', start).lte('data', end)
  }
  const { data } = await q
  return data ?? []
}

export async function addSaida(saida: { data: string; descricao: string; categoria: string; titular: string; valor: number; conta: string }) {
  const { data, error } = await sb().from('saidas').insert([saida]).select().single()
  return { data, error }
}

/* ── Entradas ── */
export async function getEntradas(mes?: number, ano?: number) {
  let q = sb().from('entradas').select('*').order('data', { ascending: false })
  if (mes && ano) {
    const start = `${ano}-${String(mes).padStart(2,'0')}-01`
    const end   = `${ano}-${String(mes).padStart(2,'0')}-31`
    q = q.gte('data', start).lte('data', end)
  }
  const { data } = await q
  return data ?? []
}

export async function addEntrada(entrada: { data: string; descricao: string; tipo: string; titular: string; valor: number; conta: string }) {
  const { data, error } = await sb().from('entradas').insert([entrada]).select().single()
  return { data, error }
}

/* ── Contas bancárias ── */
export async function getContas() {
  const { data } = await sb().from('contas_bancarias').select('*').order('nome')
  return data ?? []
}

export async function updateSaldoConta(id: string, saldo: number) {
  return sb().from('contas_bancarias').update({ saldo }).eq('id', id)
}

/* ── Cartões ── */
export async function getCartoes() {
  const { data } = await sb().from('cartoes_credito').select('*').order('nome')
  return data ?? []
}

export async function getLancamentosCartao(mes?: number, ano?: number) {
  let q = sb().from('lancamentos_cartao').select('*, cartoes_credito(nome, cor, rgb)').order('data', { ascending: false })
  if (mes && ano) {
    const start = `${ano}-${String(mes).padStart(2,'0')}-01`
    const end   = `${ano}-${String(mes).padStart(2,'0')}-31`
    q = q.gte('data', start).lte('data', end)
  }
  const { data } = await q
  return data ?? []
}

/* ── Despesas fixas ── */
export async function getDespesasFixas() {
  const { data } = await sb().from('despesas_fixas').select('*').eq('ativa', true).order('dia_vencimento')
  return data ?? []
}

export async function getPagamentosMes(mes: number, ano: number) {
  const { data } = await sb().from('pagamentos_despesas').select('*').eq('mes', mes).eq('ano', ano)
  return data ?? []
}

export async function marcarPago(despesaId: string, mes: number, ano: number) {
  return sb().from('pagamentos_despesas').upsert({ despesa_id: despesaId, mes, ano, pago: true, data_pagamento: new Date().toISOString().split('T')[0] })
}

/* ── Metas ── */
export async function getMetas() {
  const { data } = await sb().from('metas').select('*').eq('ativa', true).order('created_at')
  return data ?? []
}

export async function updateMeta(id: string, valor_atual: number) {
  return sb().from('metas').update({ valor_atual }).eq('id', id)
}

export async function addMeta(meta: { nome: string; valor_meta: number; valor_atual: number; prazo: string; titular: string; cor: string }) {
  const { data, error } = await sb().from('metas').insert([meta]).select().single()
  return { data, error }
}

/* ── Resumo geral (Visão Geral) ── */
export async function getResumoMes(mes: number, ano: number) {
  const [saidas, entradas, contas, metas] = await Promise.all([
    getSaidas(mes, ano),
    getEntradas(mes, ano),
    getContas(),
    getMetas(),
  ])

  const totalSaidas   = saidas.reduce((s: number, i: any)   => s + Number(i.valor), 0)
  const totalEntradas = entradas.reduce((s: number, i: any) => s + Number(i.valor), 0)
  const totalContas   = contas.reduce((s: number, i: any)   => s + Number(i.saldo), 0)

  return { saidas, entradas, contas, metas, totalSaidas, totalEntradas, totalContas, saldo: totalEntradas - totalSaidas }
}
