"use client";

import { Cliente } from "@/app/types/cliente";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Clientes(){

    const [clientes,setClientes] = useState<Cliente[]>([]);

    useEffect(()=>{
        carregarDados();
    },[]);

    const carregarDados = async ()=>{

        try {
            const dados = await axios.get<Cliente[]>("http://localhost:8080/clientes");

            setClientes( dados.data);

        } catch (error) {
            alert("Erro ao carregar dados!")
        }
       

    }
    

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6 md:p-8 font-sans">
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                    Gestao de clientes
                </h1>
                <Link 
                    href="/clientes/novo"
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Novo Cliente
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
                                        Nome
                                    </th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        CPF
                                    </th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Telefone
                                    </th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        E-mail
                                    </th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                               {clientes.map((cliente)=>(     
                                <tr key={cliente.id} className="hover:bg-blue-50/50 transition-colors duration-150">
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        {cliente.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        {cliente.nome}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        {cliente.cpf}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        {cliente.telefone}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        {cliente.email}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                        <Link
                                            href={`/clientes/${cliente.id}/editar`}
                                            className="inline-flex items-center justify-center px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md transition-colors duration-150"
                                        >
                                            Editar
                                        </Link>
                                    </td>
                                </tr>
                                ))}

                                { clientes.length === 0 &&
                                (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-800 italic" >
                                            Nenhum cliente encontrado!
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