"use client"

import Link from "next/link";
import UsuarioForm from "../../components/UsuarioForm";
import { useParams } from "@/node_modules/next/navigation";

export default function EditarUsuario() {

const parametro = useParams();

const codigo = Number (parametro.codigo);

return (
    <div>
        <div>
            <Link href="/usuarios">
                Voltar para Listagem
            </Link>
        </div>
        <h1>
            Novo Usuario
        </h1>
        <p>
            Preencha os dados abaixo para editar um novo Usuario
        </p>
        <div>
            <UsuarioForm/>
        </div>
    </div>
)
}