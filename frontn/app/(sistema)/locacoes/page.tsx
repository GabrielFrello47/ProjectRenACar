"use client";

import { Locacao } from "@/app/types/locacao";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Locacoes(){

    const [locacoes,setLocacoes] = useState<Locacao[]>([]);

    useEffect(()=>{
        carregarDados();
    },[]);

    const carregarDados = async ()=>{

        try {
            const dados = await axios.get<Locacao[]>("http://localhost:8080/locacoes");

            setLocacoes(dados.data);

        } catch (error) {
            alert("Erro ao carregar dados!")
        }
       

    }

    const handleDeletar = async (id: number) => {

        const confirmar = confirm("Tem certeza que deseja excluir esta locacao?");
        if (!confirmar) return;

        try {
            await axios.delete(`http://localhost:8080/locacoes/${id}`);
            await carregarDados();
        } catch (error) {
            alert("Erro ao excluir locacao!");
        }

    }
    

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6 md:p-8 font-sans">
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                    Gestao de locacoes
                </h1>
                <Link 
                    href="/locacoes/novo"
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Nova Locação
                </Link>
            </div>
    
            <div className="w-full">
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden w-full">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-100/75 border-b border-slate-200">
                                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Código
                                    </th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Data início
                                    </th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Data fim
                                    </th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Valor total
                                    </th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Cliente
                                    </th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Veículo
                                    </th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                               {locacoes.map((locacao)=>(     
                                <tr key={locacao.id} className="hover:bg-blue-50/50 transition-colors duration-150">
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        {locacao.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        {locacao.dataInicio.toString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        {locacao.dataFim.toString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        {locacao.valorTotal}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        {locacao.cliente}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        {locacao.veiculo ? `${locacao.veiculo} ${locacao.veiculo}` : ""}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800 space-x-2">
                                        <Link
                                            href={`/locacoes/${locacao.id}/editar`}
                                            className="inline-flex items-center justify-center px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md transition-colors duration-150"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDeletar(locacao.id!)}
                                            className="inline-flex items-center justify-center px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium rounded-md transition-colors duration-150"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                                ))}

                                { locacoes.length === 0 &&
                                (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-slate-800 italic" >
                                            Nenhuma locacao encontrada!
                                        </td>
                                    </tr>
                                )
                                }



                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )

}