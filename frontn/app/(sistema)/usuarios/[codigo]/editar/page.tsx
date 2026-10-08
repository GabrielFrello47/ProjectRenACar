"use client"

import { Usuario } from "@/app/types/usuario";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UsuarioForm from "../../components/UsuarioForm";

export default function EditarUsuario() {

    const parametro = useParams();

    const codigo = Number(parametro.codigo);

    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const router = useRouter();

    useEffect(() => {
        buscarDados();
    }, []);

    const buscarDados = async () => {
        try {
            const valorUsuarioBack = await axios.get<Usuario>("http://localhost:8080/usuarios/" + codigo);

            if (valorUsuarioBack.status == 200) {
                setUsuario(valorUsuarioBack.data);
            } else {
                router.push("/usuarios");
            }
        } catch (error) {
            alert("Erro ao carregar usuário!");
            router.push("/usuarios");
        }
    }

    if (!usuario) return (<div className="p-8">Carregando Dados ...</div>)

    return (
        <div>
            <div>
                <Link href="/usuarios">
                    Voltar para Listagem
                </Link>
            </div>
            <h1>
                Editar Usuario
            </h1>
            <p>
                Altere os dados abaixo para atualizar o Usuario
            </p>
            <div>
                <UsuarioForm usuarioExistente={usuario} />
            </div>
        </div>
    )
}