import sqlite3
import os
import json
from datetime import datetime

# Configurações de Arquivos
DB_FILE = "loja.db"
JS_FILE = "loja_dados.js"

# --- 1. CONFIGURAÇÃO DO BANCO DE DADOS ---

def conectar_banco():
    try:
        conexao = sqlite3.connect(DB_FILE)
        conexao.execute("PRAGMA foreign_keys = ON;") 
        return conexao
    except sqlite3.Error as e:
        print(f"Erro de conexão: {e}")
        return None

def criar_tabelas():
    conexao = conectar_banco()
    if not conexao: return
    cursor = conexao.cursor()

    try:
        # Tabelas Base
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

        # Tabelas de Movimentação
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
    except sqlite3.Error as e:
        print(f"Erro ao criar tabelas: {e}")
    finally:
        conexao.close()

# --- 2. FUNÇÃO DE POPULAR DADOS  ---

def popular_dados_iniciais():
    """Insere dados de teste apenas se as tabelas estiverem vazias."""
    conexao = conectar_banco()
    cursor = conexao.cursor()
    
    try:
        # 1. Popular Clientes
        cursor.execute("SELECT count(*) FROM cliente")
        if cursor.fetchone()[0] == 0:
            clientes = [
                ('11122233344', 'Ana Silva', '11987654321', 'Rua A, 123'),
                ('55566677788', 'Bruno Costa', '21912345678', 'Av. B, 456'),
                ('99988877766', 'Carla Dias', '31945678901', 'Praça C, 789')
            ]
            cursor.executemany("INSERT INTO cliente VALUES (?, ?, ?, ?)", clientes)
            print("[INFO] Clientes padrão inseridos.")

        # 2. Popular Funcionários
        cursor.execute("SELECT count(*) FROM funcionario")
        if cursor.fetchone()[0] == 0:
            funcionarios = [
                ('12345678900', 'João Pereira', 'Chaveiro Mestre', '11911112222', 'Rua X, 10'),
                ('09876543211', 'Maria Oliveira', 'Atendente', '11933334444', 'Av. Y, 20')
            ]
            cursor.executemany("INSERT INTO funcionario VALUES (?, ?, ?, ?, ?)", funcionarios)
            print("[INFO] Funcionários padrão inseridos.")

        # 3. Popular Produtos
        cursor.execute("SELECT count(*) FROM produto")
        if cursor.fetchone()[0] == 0:
            produtos = [
                ('Cópia Chave Yale', 8.00, 'Serviço', 100),
                ('Chave Tetra', 25.00, 'Produto', 50),
                ('Cadeado 30mm', 18.00, 'Produto', 75),
                ('Abertura Residência (Comercial)', 120.00, 'Serviço', 999),
                ('Instalação Fechadura', 80.00, 'Serviço', 999),
                ('Fechadura Porta (Simples)', 65.00, 'Produto', 30)
            ]
            cursor.executemany("INSERT INTO produto (nomeProduto, precoProduto, categoriaProduto, quantidadeProduto) VALUES (?, ?, ?, ?)", produtos)
            print("[INFO] Produtos padrão inseridos.")
        
        conexao.commit()
    except sqlite3.Error as e:
        print(f"Erro ao popular tabelas: {e}")
    finally:
        conexao.close()

# --- 3. INTEGRAÇÃO COM JAVASCRIPT ---

def exportar_para_js():
    conexao = conectar_banco()
    cursor = conexao.cursor()
    
    try:
        cursor.execute("SELECT * FROM produto")
        produtos = [{"id": row[0], "nome": row[1], "preco": row[2], "estoque": row[4]} for row in cursor.fetchall()]

        cursor.execute("""
            SELECT v.idVenda, v.dataVenda, v.valorVenda, c.nomeCliente, f.nomeFuncionario
            FROM venda v
            JOIN cliente c ON v.cliente_CPF = c.CPF
            JOIN funcionario f ON v.funcionario_CPF = f.CPF
        """)
        vendas = [{"id": row[0], "data": row[1], "total": row[2], "cliente": row[3], "vendedor": row[4]} for row in cursor.fetchall()]

        dados_completos = {
            "loja": "Chaveiro System",
            "atualizado_em": str(datetime.now()),
            "catalogo": produtos,
            "historico_vendas": vendas
        }

        conteudo_js = f"const dadosLoja = {json.dumps(dados_completos, indent=4, ensure_ascii=False)};"
        
        with open(JS_FILE, "w", encoding="utf-8") as f:
            f.write(conteudo_js)
        print(f"\n[SISTEMA] Arquivo '{JS_FILE}' atualizado!")

    except Exception as e:
        print(f"Erro na exportação: {e}")
    finally:
        conexao.close()

# --- 4. FUNÇÕES CRUD E VENDAS ---

def realizar_venda():
    conexao = conectar_banco()
    cursor = conexao.cursor()

    print("\n--- Nova Venda ---")
    
    # Listar Clientes e Funcionários para facilitar
    print("\n--- Clientes Disponíveis ---")
    for c in conexao.execute("SELECT CPF, nomeCliente FROM cliente"): print(f"{c[0]} - {c[1]}")
    
    cpf_cliente = input("\nDigite o CPF do Cliente: ")
    
    print("\n--- Funcionários Disponíveis ---")
    for f in conexao.execute("SELECT CPF, nomeFuncionario FROM funcionario"): print(f"{f[0]} - {f[1]}")
    
    cpf_func = input("\nDigite o CPF do Funcionário: ")

    # Validação simples
    try:
        cursor.execute("SELECT nomeCliente FROM cliente WHERE CPF = ?", (cpf_cliente,))
        if not cursor.fetchone(): raise ValueError("Cliente não encontrado.")
        
        cursor.execute("SELECT nomeFuncionario FROM funcionario WHERE CPF = ?", (cpf_func,))
        if not cursor.fetchone(): raise ValueError("Funcionário não encontrado.")
    except ValueError as ve:
        print(ve); conexao.close(); return

    # Carrinho
    carrinho = []
    total_venda = 0.0

    while True:
        print("\n--- Produtos Disponíveis ---")
        for p in conexao.execute("SELECT idProduto, nomeProduto, precoProduto, quantidadeProduto FROM produto"):
            print(f"ID {p[0]} | {p[1]} | R${p[2]:.2f} | Estoque: {p[3]}")
            
        id_prod = input("\nID do Produto (ou 'fim' para encerrar): ")
        if id_prod.lower() == 'fim': break

        cursor.execute("SELECT nomeProduto, precoProduto, quantidadeProduto FROM produto WHERE idProduto = ?", (id_prod,))
        prod = cursor.fetchone()

        if prod:
            qtd = int(input(f"Quantidade (Disp: {prod[2]}): "))
            if qtd <= prod[2]:
                subtotal = qtd * prod[1]
                total_venda += subtotal
                carrinho.append((id_prod, prod[0], prod[1], qtd))
                print(f"Adicionado: {prod[0]} (R${subtotal:.2f})")
            else:
                print("Estoque insuficiente!")
        else:
            print("Produto não encontrado.")

    if not carrinho:
        print("Venda cancelada.")
        conexao.close()
        return

    # Finalizar
    try:
        pagamento = input("Forma de Pagamento (Dinheiro/Cartão/Pix): ")
        data_hoje = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        cursor.execute("""
            INSERT INTO venda (dataVenda, valorVenda, formaPagamento, cliente_CPF, funcionario_CPF)
            VALUES (?, ?, ?, ?, ?)
        """, (data_hoje, total_venda, pagamento, cpf_cliente, cpf_func))
        
        id_venda = cursor.lastrowid

        for item in carrinho:
            # item = (id_prod, nome, preco, qtd)
            cursor.execute("""
                INSERT INTO produtos_venda (produto_idProduto, venda_idVenda, quantidadeVenda, precoVenda, nomeProdutos)
                VALUES (?, ?, ?, ?, ?)
            """, (item[0], id_venda, item[3], item[2], item[1]))

            cursor.execute("UPDATE produto SET quantidadeProduto = quantidadeProduto - ? WHERE idProduto = ?", (item[3], item[0]))

        conexao.commit()
        print(f"\n[SUCESSO] Venda #{id_venda} concluída! Total: R${total_venda:.2f}")
        exportar_para_js()

    except sqlite3.Error as e:
        conexao.rollback()
        print(f"Erro no banco: {e}")
    finally:
        conexao.close()

# --- 5. MENU ---

def menu():
    criar_tabelas()
    popular_dados_iniciais() # <--- Executa automaticamente ao abrir o programa
    
    while True:
        print("\n=== SISTEMA CHAVEIRO ===")
        print("1. Nova Venda")
        print("2. Ver Catálogo (Produtos)")
        print("3. Ver Histórico de Vendas")
        print("4. Atualizar Arquivo JS")
        print("0. Sair")
        
        op = input("Opção: ")
        
        if op == "1":
            realizar_venda()
        elif op == "2":
            cx = conectar_banco()
            print(f"\n{'ID':<4} {'Nome':<30} {'Preço':<10} {'Estoque'}")
            print("-" * 60)
            for r in cx.execute("SELECT idProduto, nomeProduto, precoProduto, quantidadeProduto FROM produto"):
                print(f"{r[0]:<4} {r[1]:<30} R${r[2]:<9.2f} {r[3]}")
            cx.close()
        elif op == "3":
             cx = conectar_banco()
             print("\n--- Histórico ---")
             for r in cx.execute("SELECT idVenda, dataVenda, valorVenda, cliente_CPF FROM venda"):
                 print(f"Venda #{r[0]} | Data: {r[1]} | R${r[2]:.2f} | Cliente CPF: {r[3]}")
             cx.close()
        elif op == "4":
            exportar_para_js()
        elif op == "0":
            break
        else:
            print("Opção inválida.")

if __name__ == "__main__":
    menu()