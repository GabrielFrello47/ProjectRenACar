import { Cliente } from "./cliente";
import { Veiculo } from "./veiculo";

export class Locacao{

constructor (

    public id: number | null,
    public dataInicio:string,
    public dataFim:string,
    public valorTotal:number,
    public cliente:Cliente | null,
    public veiculo:Veiculo | null,

    ){}

}