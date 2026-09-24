"use client"

import Link from "next/link";
import LocacoesForm from "../../components/LocacoesForm";
import { useParams } from "next/navigation";

export default function EditarLocacao() {

const parametro = useParams();

const id = Number(parametro.id);

return (
    <div>
        <div>
            <Link href="/locacoes">
                Voltar para Listagem
            </Link>
        </div>
        <h1>
            Editar Locacao
        </h1>
        <p>
            Altere os dados abaixo para atualizar a Locacao
        </p>
        <div>
            <LocacoesForm id={id}/>
        </div>
    </div>
)
}