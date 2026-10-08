// Diz ao Next.js que este componente roda no NAVEGADOR (Client Component).
// Necessário porque usamos useState, useEffect e eventos de clique.
"use client";

// Importa o tipo Cliente (interface com id, nome, cpf, telefone, email).
// O "@/" é um atalho configurado no tsconfig que aponta para a raiz do src.
import { Cliente } from "@/app/types/cliente";
// Importa o axios, biblioteca para fazer requisições HTTP (GET, POST, DELETE...) à API.
import axios from "axios";
// Importa o Link do Next.js: cria links de navegação entre páginas sem recarregar a página toda.
import Link from "next/link";
// Importa dois hooks do React: useEffect (executar código em momentos do ciclo de vida)
// e useState (guardar valores que, ao mudar, atualizam a tela).
import { useEffect, useState } from "react";

// Declara o componente da página. "export default" faz dele o componente principal deste arquivo
// (no App Router do Next.js, é o que aparece na rota /clientes).
export default function Clientes(){

    // Cria o estado "clientes" (a lista) e a função "setClientes" para alterá-la.
    // <Cliente[]> indica que é um array de Cliente; começa como array vazio [].
    const [clientes,setClientes] = useState<Cliente[]>([]);

    // useEffect executa o código de dentro quando o componente é exibido na tela.
    useEffect(()=>{
        // Chama a função que busca os clientes na API.
        carregarDados();
    // O array vazio [] significa: execute SOMENTE UMA VEZ, na primeira renderização.
    },[]);

    // Função assíncrona (async) que busca os clientes. "await" só funciona dentro de funções async.
    const carregarDados = async ()=>{

        // try/catch: tenta executar o bloco e, se algo der errado, cai no catch.
        try {
            // Faz um GET no back-end Spring Boot e espera a resposta.
            // <Cliente[]> diz ao TypeScript que o corpo da resposta é uma lista de clientes.
            const dados = await axios.get<Cliente[]>("http://localhost:8080/clientes");

            // dados.data é o corpo da resposta (a lista). Guardar no estado faz a tela atualizar.
            setClientes(dados.data);

        // Executado se a requisição falhar (API fora do ar, erro 500, etc.).
        } catch (error) {
            // Mostra um aviso simples para o usuário.
            alert("Erro ao carregar dados!")
        }


    }

    // Função chamada ao clicar em "Excluir". Recebe o id do cliente a ser removido.
    const handleDeletar = async (id: number) => {

        // confirm() abre uma caixa Ok/Cancelar do navegador e retorna true ou false.
        const confirmar = confirm("Tem certeza que deseja excluir este cliente?");
        // Se o usuário clicou em Cancelar, sai da função sem fazer nada.
        if (!confirmar) return;

        try {
            // Envia um DELETE para a API. A crase (`) permite inserir o id dentro do texto com ${id}.
            await axios.delete(`http://localhost:8080/clientes/${id}`);
            // Depois de excluir, busca a lista de novo para a tabela refletir a remoção.
            await carregarDados();
        } catch (error) {
            // Se o DELETE falhar, avisa o usuário.
            alert("Erro ao excluir cliente!");
        }

    }


    // O return define o que será desenhado na tela (JSX = HTML dentro do JavaScript).
    return (
        // Container geral da página. Tailwind: min-h-screen (altura mínima = tela inteira),
        // w-full (largura total), bg-slate-50 (fundo cinza claro), p-6/md:p-8 (espaçamento interno,
        // maior em telas médias+), font-sans (fonte sem serifa).
        <div className="min-h-screen w-full bg-slate-50 p-6 md:p-8 font-sans">
            {/* Cabeçalho: em telas pequenas empilha (flex-col), em sm+ fica lado a lado (sm:flex-row).
                justify-between afasta título e botão; gap-4 dá espaço entre eles; mb-8 margem abaixo. */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                {/* Título da página: texto grande, negrito, cor quase preta */}
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                    Gestao de clientes
                </h1>
                {/* Link estilizado como botão azul que leva à página de cadastro (/clientes/novo).
                    hover: muda a cor ao passar o mouse; focus: mostra um anel ao navegar pelo teclado. */}
                <Link
                    href="/clientes/novo"
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Novo Cliente
                </Link>
            </div>

            {/* Área que envolve a tabela */}
            <div className="w-full">
                {/* "Cartão" branco com borda, cantos arredondados e sombra leve.
                    overflow-hidden corta o conteúdo que passar dos cantos arredondados. */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden w-full">
                    {/* overflow-x-auto cria rolagem horizontal se a tabela não couber (celulares) */}
                    <div className="overflow-x-auto w-full">
                        {/* Tabela HTML. border-collapse junta as bordas das células. */}
                        <table className="w-full text-left border-collapse">
                            {/* Cabeçalho da tabela */}
                            <thead>
                                {/* Linha do cabeçalho com fundo cinza e linha inferior */}
                                <tr className="bg-slate-100/75 border-b border-slate-200">
                                    {/* Cada <th> é o título de uma coluna (texto pequeno, MAIÚSCULO, negrito) */}
                                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Código
                                    </th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Nome
                                    </th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        CPF
                                    </th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Telefone
                                    </th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        E-mail
                                    </th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            {/* Corpo da tabela. divide-y coloca uma linha separadora entre as linhas. */}
                            <tbody className="divide-y divide-slate-200">
                               {/* map percorre a lista e devolve uma <tr> para cada cliente */}
                               {clientes.map((cliente)=>(
                                // "key" é obrigatória no React em listas: identifica cada item de forma única.
                                // hover: destaca a linha em azul claro ao passar o mouse.
                                <tr key={cliente.id} className="hover:bg-blue-50/50 transition-colors duration-150">
                                    {/* Cada <td> é uma célula; as chaves {} inserem valores JavaScript no HTML */}
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        {cliente.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        {cliente.nome}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        {cliente.cpf}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        {cliente.telefone}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        {cliente.email}
                                    </td>
                                    {/* Célula de ações; space-x-2 separa os dois botões horizontalmente */}
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800 space-x-2">
                                        {/* Link para a tela de edição daquele cliente: /clientes/<id>/editar */}
                                        <Link
                                            href={`/clientes/${cliente.id}/editar`}
                                            className="inline-flex items-center justify-center px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md transition-colors duration-150"
                                        >
                                            Editar
                                        </Link>
                                        {/* Botão vermelho. onClick chama handleDeletar passando o id do cliente.
                                            O "!" após id diz ao TypeScript: "garanto que não é undefined"
                                            (no tipo Cliente o id é opcional, pois ainda não existe ao cadastrar). */}
                                        <button
                                            onClick={() => handleDeletar(cliente.id!)}
                                            className="inline-flex items-center justify-center px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium rounded-md transition-colors duration-150"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                                ))}

                                {/* Renderização condicional: o && só mostra o que vem depois
                                    se a condição à esquerda for verdadeira (lista vazia). */}
                                { clientes.length === 0 &&
                                (
                                    <tr>
                                        {/* colSpan={6} faz a célula ocupar as 6 colunas da tabela, centralizando a mensagem */}
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-800 italic" >
                                            Nenhum cliente encontrado!
                                        </td>
                                    </tr>
                                )
                                }



                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )

}