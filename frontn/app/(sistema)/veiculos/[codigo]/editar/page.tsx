"use client"

import Link from "next/link";
import VeiculosForm from "../../components/VeiculosForm";
import { useParams } from "next/navigation";

export default function EditarVeiculo() {

const parametro = useParams();

const id = Number(parametro.id);

return (
    <div>
        <div>
            <Link href="/veiculos">
                Voltar para Listagem
            </Link>
        </div>
        <h1>
            Editar Veiculo
        </h1>
        <p>
            Altere os dados abaixo para atualizar o Veiculo
        </p>
        <div>
            <VeiculosForm id={id}/>
        </div>
    </div>
)
}