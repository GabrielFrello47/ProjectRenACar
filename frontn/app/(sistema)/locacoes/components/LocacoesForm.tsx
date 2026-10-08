"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Locacao } from "@/app/types/locacao";
import { Cliente } from "@/app/types/cliente";
import { Veiculo } from "@/app/types/veiculo";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LocacoesForm() {

    const router = useRouter();
    const [locacao, setLocacao] = useState<Locacao>(new Locacao(null, new Date(),  new Date(), 0, null, null));
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

    const formatarParaInput = (data: Date | undefined) => {
      if (!data || !(data instanceof Date) || isNaN(data.getTime())) return '';
      // Retorna no formato YYYY-MM-DD exigido pelo input type="date"
      return data.toISOString().split('T')[0];
  }

    useEffect(() => {
        async function carregarListas() {
            try {
                const [resClientes, resVeiculos] = await Promise.all([
                    axios.get<Cliente[]>("http://localhost:8080/clientes"),
                    axios.get<Veiculo[]>("http://localhost:8080/veiculos"),
                ]);
                setClientes(resClientes.data);
                setVeiculos(resVeiculos.data);
            } catch (error) {
                alert("Erro ao carregar clientes/veiculos!");
            }
        }
        carregarListas();
    }, []);

    const handlerChange = (campo: 'dataInicio' | 'dataFim', valor: string) => {

      const novaData = valor ? new Date(`${valor}T00:00:00`) : new Date();
        setLocacao(valorAnterior =>
            new Locacao(
                valorAnterior.id,
                campo === 'dataInicio' ? novaData : valorAnterior.dataInicio,
                campo === 'dataFim' ? novaData : valorAnterior.dataFim,
                valorAnterior.valorTotal,
                valorAnterior.cliente,
                valorAnterior.veiculo,
            )
        );
    }

    const handlerChangeValorTotal = (valor: string) => {
        setLocacao(valorAnterior =>
            new Locacao(
                valorAnterior.id,
                valorAnterior.dataInicio,
                valorAnterior.dataFim,
                Number(valor),
                valorAnterior.cliente,
                valorAnterior.veiculo,
            )
        );
    }

    const handlerChangeCliente = (clienteId: string) => {
        const clienteEncontrado = clientes.find(c => String(c.id) === clienteId) ?? null;
        setLocacao(valorAnterior =>
            new Locacao(
                valorAnterior.id,
                valorAnterior.dataInicio,
                valorAnterior.dataFim,
                valorAnterior.valorTotal,
                clienteEncontrado?.id?.toString()||null,
                valorAnterior.veiculo,
            )
        );
    }

    const handlerChangeVeiculo = (veiculoId: string) => {
        const veiculoEncontrado = veiculos.find(v => String(v.id) === veiculoId) ?? null;
        setLocacao(valorAnterior =>
            new Locacao(
                valorAnterior.id,
                valorAnterior.dataInicio,
                valorAnterior.dataFim,
                valorAnterior.valorTotal,
                valorAnterior.cliente,
                veiculoEncontrado?.id?.toString()||null,
            )
        );
    }

    const handlerSalvar = async (formData: FormData) => {

        try {
            var dadosRetorno = await axios.post<Locacao>("http://localhost:8080/locacoes", locacao);

            if (dadosRetorno.status === 200 || dadosRetorno.status === 201) {
                alert("Locacao foi criada com sucesso");
                router.push("/locacoes");
            } else {
                alert(dadosRetorno.data);
            }
        } catch (error) {
            alert("Erro ao criar locacao");
        }

    }

    return (

        <form action={handlerSalvar} className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-5 max-w-lg mx-auto">
            <div>
                <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">
                    Data de início
                    </label>

                    <input
                        name="dataInicio"
                        type="date"
                        value={formatarParaInput(locacao.dataInicio)}
                        onChange={(e) => handlerChange('dataInicio', e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <div className="space-y-1.5 mt-5">
                    <label className="block text-sm font-medium text-slate-700">
                    Data de fim
                    </label>

                    <input
                        name="dataFim"
                        type="date"
                        value={formatarParaInput(locacao.dataInicio)}
                        onChange={(e) => handlerChange('dataFim', e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <div className="space-y-1.5 mt-5">
                    <label className="block text-sm font-medium text-slate-700">
                    Valor total (R$)
                    </label>

                    <input
                        name="valorTotal"
                        type="number"
                        step="0.01"
                        placeholder="600.00"
                        value={locacao.valorTotal}
                        onChange={(e) => handlerChangeValorTotal(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <div className="space-y-1.5 mt-5">
                    <label className="block text-sm font-medium text-slate-700">
                    Cliente
                    </label>

                    <select
                        name="cliente"
                        value={locacao.cliente ?? ""}
                        onChange={(e) => handlerChangeCliente(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        <option value="">Selecione...</option>
                        {clientes.map((cliente) => (
                            <option key={cliente.id} value={cliente.id ?? ""}>
                                {cliente.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-1.5 mt-5">
                    <label className="block text-sm font-medium text-slate-700">
                    Veículo
                    </label>

                    <select
                        name="veiculo"
                        value={locacao.veiculo ?? ""}
                        onChange={(e) => handlerChangeVeiculo(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        <option value="">Selecione...</option>
                        {veiculos.map((veiculo) => (
                            <option key={veiculo.id} value={veiculo.id ?? ""}>
                                {veiculo.marca} {veiculo.modelo}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center justify-end gap-3 mt-8">
                    <Link
                        href="/locacoes"
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