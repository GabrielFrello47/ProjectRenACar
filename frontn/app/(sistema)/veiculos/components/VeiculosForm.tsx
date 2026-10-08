"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Veiculo } from "@/app/types/veiculo";
import Link from "next/link";
import { useState } from "react";

export default function VeiculosForm() {

    const router = useRouter();
    const [veiculo, setVeiculo] = useState<Veiculo>(new Veiculo(null, "", "", "", "", 0));

    const handlerChange = (campo: 'marca' | 'modelo' | 'placa' | 'ano', valor: string) => {
        setVeiculo(valorAnterior =>
            new Veiculo(
                valorAnterior.id,
                campo === 'marca' ? valor : valorAnterior.marca,
                campo === 'modelo' ? valor : valorAnterior.modelo,
                campo === 'placa' ? valor : valorAnterior.placa,
                campo === 'ano' ? valor : valorAnterior.ano,
                valorAnterior.valorDiaria,
            )
        );
    }

    const handlerChangeValorDiaria = (valor: string) => {
        setVeiculo(valorAnterior =>
            new Veiculo(
                valorAnterior.id,
                valorAnterior.marca,
                valorAnterior.modelo,
                valorAnterior.placa,
                valorAnterior.ano,
                Number(valor),
            )
        );
    }

    const handlerSalvar = async (formData: FormData) => {

        try {
            var dadosRetorno = await axios.post<Veiculo>("http://localhost:8080/veiculos", veiculo);

            if (dadosRetorno.status === 200 || dadosRetorno.status === 201) {
                alert("Veiculo foi criado com sucesso");
                router.push("/veiculos");
            } else {
                alert(dadosRetorno.data);
            }
        } catch (error) {
            alert("Erro ao criar veiculo");
        }

    }

    return (

        <form action={handlerSalvar} className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-5 max-w-lg mx-auto">
            <div>
                <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">
                    Marca
                    </label>

                    <input
                        name="marca"
                        type="text"
                        placeholder="Ex: Fiat"
                        value={veiculo.marca}
                        onChange={(e) => handlerChange('marca', e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <div className="space-y-1.5 mt-5">
                    <label className="block text-sm font-medium text-slate-700">
                    Modelo
                    </label>

                    <input
                        name="modelo"
                        type="text"
                        placeholder="Ex: Argo"
                        value={veiculo.modelo}
                        onChange={(e) => handlerChange('modelo', e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <div className="space-y-1.5 mt-5">
                    <label className="block text-sm font-medium text-slate-700">
                    Placa
                    </label>

                    <input
                        name="placa"
                        type="text"
                        placeholder="ABC1D23"
                        value={veiculo.placa}
                        onChange={(e) => handlerChange('placa', e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <div className="space-y-1.5 mt-5">
                    <label className="block text-sm font-medium text-slate-700">
                    Ano
                    </label>

                    <input
                        name="ano"
                        type="text"
                        placeholder="2023"
                        value={veiculo.ano}
                        onChange={(e) => handlerChange('ano', e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <div className="space-y-1.5 mt-5">
                    <label className="block text-sm font-medium text-slate-700">
                    Valor da diária (R$)
                    </label>

                    <input
                        name="valorDiaria"
                        type="number"
                        step="0.01"
                        placeholder="150.00"
                        value={veiculo.valorDiaria}
                        onChange={(e) => handlerChangeValorDiaria(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <div className="flex items-center justify-end gap-3 mt-8">
                    <Link
                        href="/veiculos"
                        className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
                    >
                        Salvar
                    </button>
                </div>
            
            </div>
        </form>

    );

}