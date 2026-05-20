import Database from "better-sqlite3";
import path from "path";

const CAMINHO_BANCO = path.resolve(process.cwd(), "pato.db");

let instanciaDb: Database.Database | null = null;

/**
 * Retorna a instância singleton da conexão com o banco de dados SQLite.
 * Cria a conexão na primeira chamada e a reutiliza nas chamadas subsequentes.
 * @returns {Database.Database} Instância da conexão com o banco de dados
 */
export const obterConexao = (): Database.Database => {
  if (!instanciaDb) {
    instanciaDb = new Database(CAMINHO_BANCO);
    instanciaDb.pragma("journal_mode = WAL");
    instanciaDb.pragma("foreign_keys = ON");
  }
  return instanciaDb;
};

/**
 * Inicializa o banco de dados criando as tabelas necessárias caso ainda não existam.
 * Deve ser chamada uma vez na inicialização do servidor.
 * @returns {void}
 */
export const inicializarBancoDados = (): void => {
  const db = obterConexao();

  db.exec(`
    CREATE TABLE IF NOT EXISTS despesas (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao   TEXT    NOT NULL,
      valor       REAL    NOT NULL,
      data        TEXT    NOT NULL,
      categoria   TEXT    NOT NULL,
      observacoes TEXT
    );
  `);

  console.log("Banco de dados inicializado com sucesso.");
};
