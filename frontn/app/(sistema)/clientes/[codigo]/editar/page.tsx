"use client"

import Link from "next/link";
import ClienteForm from "../../components/ClientesForm";
import { useParams } from "next/navigation";

export default function EditarCliente() {

const parametro = useParams();

const id = Number(parametro.id);

return (
    <div>
        <div>
            <Link href="/clientes">
                Voltar para Listagem
            </Link>
        </div>
        <h1>
            Editar Cliente
        </h1>
        <p>
            Altere os dados abaixo para atualizar o Cliente
        </p>
        <div>
            <ClienteForm id={id}/>
        </div>
    </div>
)
}