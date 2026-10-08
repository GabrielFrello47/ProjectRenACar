// Informa ao Next.js que este componente roda no NAVEGADOR (Client Component).
// Necessário por causa do useState, do useRouter e dos eventos (onChange).
"use client";

// Biblioteca para fazer requisições HTTP à API (aqui, o POST para cadastrar).
import axios from "axios";
// Hook do Next.js que permite navegar entre páginas via código (router.push).
// Atenção: no App Router o import é de "next/navigation", e não de "next/router".
import { useRouter } from "next/navigation";
// Importa a classe Cliente (id, nome, cpf, telefone, email).
// Aqui ela é usada com "new", então Cliente é uma classe e não apenas uma interface.
import { Cliente } from "@/app/types/cliente";
// Componente de link do Next.js: navega sem recarregar a página inteira.
import Link from "next/link";
// Hook do React para guardar valores que, ao mudar, atualizam a tela.
import { useState } from "react";

// Declara o componente do formulário. "export default" o torna o componente principal do arquivo.
export default function ClienteForm() {

    // Cria o objeto router, usado mais abaixo para redirecionar o usuário após salvar.
    const router = useRouter();
    // Estado que guarda o cliente que está sendo digitado no formulário.
    // Começa com id null (ainda não existe no banco) e os demais campos como texto vazio.
    const [cliente, setCliente] = useState<Cliente>(new Cliente(null, "", "", "", ""));

    // Função chamada sempre que o usuário digita em algum campo.
    // "campo" só pode ser um destes 4 nomes (union type) e "valor" é o texto digitado.
    const handlerChange = (campo: 'nome' | 'cpf' | 'telefone' | 'email', valor: string) => {
        // Usa a forma funcional do setState: recebe o valor anterior do estado
        // e devolve o novo. É a forma mais segura de atualizar com base no estado atual.
        setCliente(valorAnterior =>
            // Cria um novo objeto Cliente (o React precisa de um objeto novo para detectar a mudança).
            new Cliente(
                // O id nunca muda no formulário; mantém o anterior.
                valorAnterior.id,
                // Se o campo digitado for "nome", usa o novo valor; senão, mantém o nome anterior.
                campo === 'nome' ? valor : valorAnterior.nome,
                // Mesma lógica para o cpf.
                campo === 'cpf' ? valor : valorAnterior.cpf,
                // Mesma lógica para o telefone.
                campo === 'telefone' ? valor : valorAnterior.telefone,
                // Mesma lógica para o email.
                campo === 'email' ? valor : valorAnterior.email,
            )
        );
    }

    // Função executada ao enviar o formulário. É async porque faz uma requisição HTTP.
    // Recebe um FormData (dados do form), mas ele não é usado: o código usa o estado "cliente".
    const handlerSalvar = async (formData: FormData) => {

        // try/catch: se a requisição falhar, cai no catch.
        try {
            // Envia um POST para o back-end Spring Boot com o cliente no corpo (convertido em JSON).
            // "await" espera a resposta. <Cliente> indica o tipo do dado retornado.
            // (var funciona, mas o recomendado hoje é const.)
            var dadosRetorno = await axios.post<Cliente>("http://localhost:8080/clientes", cliente);

            // 200 = OK e 201 = Created (recurso criado). Ambos indicam sucesso.
            if (dadosRetorno.status === 200 || dadosRetorno.status === 201) {
                // Avisa o usuário que deu certo.
                alert("Cliente foi criado com sucesso");
                // Redireciona para a listagem de clientes.
                router.push("/clientes");
            } else {
                // Qualquer outro status: mostra o que a API devolveu.
                alert(dadosRetorno.data);
            }
        // O axios lança exceção para status de erro (400, 500...) e falhas de rede.
        } catch (error) {
            // Mensagem genérica de erro.
            alert("Erro ao criar cliente");
        }

    }

    // O return define o que aparece na tela (JSX = HTML dentro do JavaScript).
    return (

        // <form> com "action": no React 19/Next.js, passar uma função aqui faz o React chamá-la
        // ao enviar o formulário (clique em Salvar ou Enter). Ela recebe o FormData.
        // Classes Tailwind: fundo branco, borda, cantos arredondados, sombra, espaçamento interno (p-8),
        // espaço vertical entre filhos (space-y-5), largura máxima (max-w-lg) e centralizado (mx-auto).
        <form action={handlerSalvar} className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-5 max-w-lg mx-auto">
            {/* Div que agrupa todos os campos e os botões */}
            <div>
                {/* Grupo do campo Nome (space-y-1.5 = pequeno espaço entre label e input) */}
                <div className="space-y-1.5">
                    {/* Rótulo do campo. "block" faz o label ocupar a linha toda, ficando acima do input. */}
                    <label className="block text-sm font-medium text-slate-700">
                    Nome completo
                    </label>

                    {/* Campo de texto do nome */}
                    <input
                        // Nome do campo no formulário (também usado no FormData).
                        name="nome"
                        // Tipo texto simples.
                        type="text"
                        // Texto de dica, exibido enquanto o campo está vazio.
                        placeholder="Nome completo"
                        // Campo "controlado": o valor exibido vem sempre do estado do React.
                        value={cliente.nome}
                        // A cada tecla digitada, chama handlerChange informando o campo e o novo texto (e.target.value).
                        onChange={(e) => handlerChange('nome', e.target.value)}
                        // Estilo: largura total, borda, cantos arredondados; ao focar (focus:), mostra um anel azul.
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                {/* Grupo do campo CPF (mt-5 = margem acima, para separar do campo anterior) */}
                <div className="space-y-1.5 mt-5">
                    <label className="block text-sm font-medium text-slate-700">
                    CPF
                    </label>

                    <input
                        name="cpf"
                        type="text"
                        // Dica para o usuário digitar apenas números.
                        placeholder="Somente números"
                        // Valor vem do estado.
                        value={cliente.cpf}
                        // Atualiza o campo "cpf" no estado a cada digitação.
                        onChange={(e) => handlerChange('cpf', e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                {/* Grupo do campo Telefone */}
                <div className="space-y-1.5 mt-5">
                    <label className="block text-sm font-medium text-slate-700">
                    Telefone
                    </label>

                    <input
                        name="telefone"
                        type="text"
                        // Exemplo do formato esperado.
                        placeholder="(00) 00000-0000"
                        value={cliente.telefone}
                        onChange={(e) => handlerChange('telefone', e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                {/* Grupo do campo Email */}
                <div className="space-y-1.5 mt-5">
                    <label className="block text-sm font-medium text-slate-700">
                    Email
                    </label>

                    <input
                        name="email"
                        // type="email" faz o navegador validar o formato (precisa ter @) ao enviar.
                        type="email"
                        placeholder="cliente@email.com"
                        value={cliente.email}
                        onChange={(e) => handlerChange('email', e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                {/* Área dos botões: lado a lado (flex), alinhados à direita (justify-end), com espaço entre eles (gap-3) */}
                <div className="flex items-center justify-end gap-3 mt-8">
                    {/* Link que volta para a listagem sem salvar nada */}
                    <Link
                        href="/clientes"
                        className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        Cancelar
                    </Link>
                    {/* type="submit" dispara o envio do formulário, que executa o handlerSalvar (via action do form) */}
                    <button
                        type="submit"
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
                    >
                        Salvar
                    </button>
                </div>

            </div>
        </form>

    );

}