import sqlite3
import os

DB_FILE = "loja.db"

def conectar_banco():
    if os.path.exists(DB_FILE):
        os.remove(DB_FILE)
        
    try:
        conexao = sqlite3.connect(DB_FILE)
        conexao.execute("PRAGMA foreign_keys = ON;")
        return conexao
    except sqlite3.Error as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return None

def criar_tabelas(conexao):
    cursor = conexao.cursor()
    
    try:
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS cliente (
            CPF TEXT(11) PRIMARY KEY NOT NULL,
            nomeCliente TEXT(45) NOT NULL,
            telefoneCliente TEXT(15),
            enderecoCliente TEXT(100)
        );
        """)

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS funcionario (
            CPF TEXT(11) PRIMARY KEY NOT NULL,
            nomeFuncionario TEXT(45) NOT NULL,
            cargoFuncionario TEXT(45),
            telefoneFuncionario TEXT(15),
            enderecoFuncionario TEXT(100)
        );
        """)

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS produto (
            idProduto INTEGER PRIMARY KEY AUTOINCREMENT,
            nomeProduto TEXT(45) NOT NULL,
            precoProduto REAL NOT NULL,
            categoriaProduto TEXT(45),
            quantidadeProduto INTEGER DEFAULT 0
        );
        """)

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS venda (
            idVenda INTEGER PRIMARY KEY AUTOINCREMENT,
            dataVenda TEXT NOT NULL,
            valorVenda REAL NOT NULL,
            formaPagamento TEXT(45),
            cliente_CPF TEXT(11) NOT NULL,
            funcionario_CPF TEXT(11) NOT NULL,
            FOREIGN KEY (cliente_CPF) REFERENCES cliente (CPF),
            FOREIGN KEY (funcionario_CPF) REFERENCES funcionario (CPF)
        );
        """)

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS produtos_venda (
            produto_idProduto INTEGER NOT NULL,
            venda_idVenda INTEGER NOT NULL,
            quantidadeVenda INTEGER NOT NULL,
            precoVenda REAL NOT NULL,
            nomeProdutos TEXT(45),
            PRIMARY KEY (produto_idProduto, venda_idVenda),
            FOREIGN KEY (produto_idProduto) REFERENCES produto (idProduto),
            FOREIGN KEY (venda_idVenda) REFERENCES venda (idVenda)
        );
        """)
        
        conexao.commit()
        print("Tabelas criadas com sucesso.")

    except sqlite3.Error as e:
        print(f"Erro ao criar tabelas: {e}")
        conexao.rollback()

def popular_tabelas(conexao):
    cursor = conexao.cursor()
    
    try:
        clientes_data = [
            ('111222333A4', 'Ana Silva', '11987654321', 'Rua A, 123'),
            ('555666777B8', 'Bruno Costa', '21912345678', 'Av. B, 456'),
        ]
        cursor.executemany("INSERT INTO cliente (CPF, nomeCliente, telefoneCliente, enderecoCliente) VALUES (?, ?, ?, ?)", clientes_data)
        
        funcionarios_data = [
            ('123456789D0', 'João Pereira', 'Chaveiro Mestre', '11911112222', 'Rua X, 10'),
            ('098765432E1', 'Maria Oliveira', 'Atendente', '11933334444', 'Av. Y, 20')
        ]
        cursor.executemany("INSERT INTO funcionario (CPF, nomeFuncionario, cargoFuncionario, telefoneFuncionario, enderecoFuncionario) VALUES (?, ?, ?, ?, ?)", funcionarios_data)
        
        produtos_data = [
            ('Carregador Turbo KDPAN', 65.00, 'Produto', 50),
            ('Power Bank Magnético KAIDI', 150.00, 'Produto', 50),
            ('Cabo HDMI B-MAX 3M', 30.00, 'Produto', 50),
            ('Controle Remoto Lelong', 25.00, 'Produto', 50),
            ('Chave Canivete Automotiva', 120.00, 'Serviço', 999), 
            ('Cópia de Chaves', 0.00, 'Serviço', 999),
            ('Abertura de Portas', 0.00, 'Serviço', 999),
            ('Chaveiro Automotivo', 0.00, 'Serviço', 999),
            ('Troca de Fechaduras', 0.00, 'Serviço', 999),
            ('Sistemas de Segurança', 0.00, 'Serviço', 999),
            ('Carimbos e Impressão', 0.00, 'Serviço', 999), 
            ('Instalar Fechadura (Emergência)', 150.00, 'Serviço Emergencial', 999), 
            ('Abrir Porta de Carro (Emergência)', 120.00, 'Serviço Emergencial', 999),
            ('Abrir Porta de Casa (Emergência)', 100.00, 'Serviço Emergencial', 999) 
        ]
        cursor.executemany("INSERT INTO produto (nomeProduto, precoProduto, categoriaProduto, quantidadeProduto) VALUES (?, ?, ?, ?)", produtos_data)

        venda_exemplo = (1, '2025-11-18', 65.00, 'PIX', '111222333A4', '098765432E1')
        cursor.execute("INSERT INTO venda (idVenda, dataVenda, valorVenda, formaPagamento, cliente_CPF, funcionario_CPF) VALUES (?, ?, ?, ?, ?, ?)", venda_exemplo)

        produtos_venda_exemplo = [
            (1, 1, 1, 65.00, 'Carregador Turbo KDPAN'), 
            (6, 1, 2, 0.00, 'Cópia de Chaves')       
        ]
        cursor.executemany("INSERT INTO produtos_venda (produto_idProduto, venda_idVenda, quantidadeVenda, precoVenda, nomeProdutos) VALUES (?, ?, ?, ?, ?)", produtos_venda_exemplo)
        
        conexao.commit()
        print("Banco de dados populado com os dados do site 'Chaveiro Gama'.")
        
    except sqlite3.Error as e:
        print(f"Erro ao popular tabelas: {e}")
        conexao.rollback()

if __name__ == "__main__":
    conexao = conectar_banco()
    
    if conexao:
        criar_tabelas(conexao)
        popular_tabelas(conexao)
        conexao.close()
        print(f"Banco de dados '{DB_FILE}' criado e fechado.")