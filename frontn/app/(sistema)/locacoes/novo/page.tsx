import Link from "next/link";
import LocacoesForm from "../components/LocacoesForm";

export default function CadastroLocacao() {

return (
    <div>
        <div>
            <Link href="/locacoes">
                Voltar para Listagem
            </Link>
        </div>
        <h1>
            Nova Locacao
        </h1>
        <p>
            Preencha os dados abaixo para cadastrar uma nova Locacao
        </p>
        <div>
            <LocacoesForm/>
        </div>
    </div>
)
}