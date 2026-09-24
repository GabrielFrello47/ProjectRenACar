import Link from "next/link";
import ClienteForm from "../components/ClientesForm";

export default function CadastroCliente() {

return (
    <div>
        <div>
            <Link href="/clientes">
                Voltar para Listagem
            </Link>
        </div>
        <h1>
            Novo Cliente
        </h1>
        <p>
            Preencha os dados abaixo para cadastrar um novo Cliente
        </p>
        <div>
            <ClienteForm/>
        </div>
    </div>
)
}