import { Cliente } from "./cliente";
import { Veiculo } from "./veiculo";

export class Locacao{

constructor (

    public id: number | null,
    public dataInicio:Date,
    public dataFim:Date,
    public valorTotal:number,
    public cliente:string | null,
    public veiculo:string | null,

    ){}

}

export interface LocacaoFormProps{
    LocacaoExistente?:Locacao
}