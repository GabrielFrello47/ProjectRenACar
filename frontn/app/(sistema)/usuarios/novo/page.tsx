import Link from "next/link";
import UsuarioForm from "../components/UsuarioForm";

export default function CadastroUsuario() {

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
            Preencha os dados abaixo para cadastrar um novo Usuario
        </p>
        <div>
            <UsuarioForm/>
        </div>
    </div>
)
}