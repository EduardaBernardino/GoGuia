import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";



export const perfil = sqliteTable("perfil", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
});


export const pessoa = sqliteTable("pessoa", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
  email: text("email").notNull().unique(),
  numTelefone: text("num_telefone"),
  codPerfil: integer("cod_perfil").references(() => perfil.id).notNull(),
});


export const statusRoteiro = sqliteTable("status_roteiro", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
});

export const statusReserva = sqliteTable("status_reserva", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
});


export const statusPagamento = sqliteTable("status_pagamento", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
});


export const rota = sqliteTable("rota", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  tempo: text("tempo"),
  distancia: real("distancia"),
});


export const pontoRota = sqliteTable("ponto_rota", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  coordenada: text("coordenada", { mode: "json" }).$type<[number, number]>().notNull(),
  posicao: integer("posicao").notNull(),
  codRota: integer("cod_rota").references(() => rota.id).notNull(),
});


export const roteiro = sqliteTable("roteiro", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  titulo: text("titulo").notNull(),
  descricao: text("descricao"),
  preco: real("preco").notNull(),
  desconto: real("desconto").default(0),
  codStatusRoteiro: integer("cod_status_roteiro").references(() => statusRoteiro.id).notNull(),
  codGuia: integer("cod_pessoa").references(() => pessoa.id).notNull(),
  local: text("cod_local").notNull(),
  codRota: integer("cod_rota").references(() => rota.id).notNull(),
});


export const reserva = sqliteTable("reserva", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  data: integer("data", { mode: "timestamp" }).notNull(),
  quantPessoas: integer("quant_pessoas").notNull(),
  codGuia: integer("cod_guia").references(() => pessoa.id).notNull(),
  codStatusReserva: integer("cod_status_reserva").references(() => statusReserva.id).notNull(),
  codTurista: integer("cod_turista").references(() => pessoa.id).notNull(),
  codRoteiro: integer("cod_roteiro").references(() => roteiro.id).notNull(),
});


export const tipoPagamento = sqliteTable("tipo_pagamento", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
});


export const pagamento = sqliteTable("pagamento", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  extras: text("extras"),
  valor: real("valor").notNull(),
  codReserva: integer("cod_reserva").references(() => reserva.id).notNull(),
  codStatusPagamento: integer("cod_status_pagamento").references(() => statusPagamento.id).notNull(),
  codTipoPagamento: integer("cod_tipo_pagamento").references(() => tipoPagamento.id).notNull(),
});