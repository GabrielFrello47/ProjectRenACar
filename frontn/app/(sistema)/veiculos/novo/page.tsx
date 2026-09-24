import Link from "next/link";
import VeiculosForm from "../components/VeiculosForm";

export default function CadastroVeiculo() {

return (
    <div>
        <div>
            <Link href="/veiculos">
                Voltar para Listagem
            </Link>
        </div>
        <h1>
            Novo Veiculo
        </h1>
        <p>
            Preencha os dados abaixo para cadastrar um novo Veiculo
        </p>
        <div>
            <VeiculosForm/>
        </div>
    </div>
)
}