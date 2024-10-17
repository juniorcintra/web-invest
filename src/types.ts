export type User = {
  id: number;
  login: string;
  nome: string;
  cpf: string;
  email: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
  access_token: string;
  refresh_token: string;
};

export type Wallet = {
  id: number;
  nome: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  ativos: Ativo[];
};

export type Ativo = {
  id: number;
  quantidade: number;
  valorMedio: number;
  carteiraId: number;
  acaoId: number;
  acao: Acao;
};

export type Acao = {
  id: number;
  ticker: string;
  valorAtual: number;
  empresaId: number;
  createdAt: string;
  updatedAt: string;
  empresa: Company;
};

export type Company = {
  id: number;
  nome: string;
  cnpj: string;
  setor: string;
  createdAt: string;
  updatedAt: string;
};

export type BodyActions = {
  ticker: string;
  quantidade: number;
  valorMedio: number;
};
