"use client";

import { Locacao } from "@/app/types/locacao";
import { Cliente } from "@/app/types/cliente";
import { Veiculo } from "@/app/types/veiculo";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LocacoesFormProps {
  id?: number;
}

export default function LocacoesForm({ id }: LocacoesFormProps) {
  const router = useRouter();
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [veiculoId, setVeiculoId] = useState("");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [carregando, setCarregando] = useState(!!id);
  const [salvando, setSalvando] = useState(false);

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
        alert("Erro ao carregar clientes/veículos!");
      }
    }

    carregarListas();
  }, []);

  useEffect(() => {
    if (!id) return;

    async function carregarLocacao() {
      try {
        const dados = await axios.get<Locacao>(`http://localhost:8080/locacoes/${id}`);
        setDataInicio(dados.data.dataInicio);
        setDataFim(dados.data.dataFim);
        setValorTotal(String(dados.data.valorTotal));
        setClienteId(dados.data.cliente ? String(dados.data.cliente.id) : "");
        setVeiculoId(dados.data.veiculo ? String(dados.data.veiculo.id) : "");
      } catch (error) {
        alert("Erro ao carregar locação!");
      } finally {
        setCarregando(false);
      }
    }

    carregarLocacao();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);

    const payload = {
      dataInicio,
      dataFim,
      valorTotal: Number(valorTotal),
      cliente: clienteId ? { id: Number(clienteId) } : null,
      veiculo: veiculoId ? { id: Number(veiculoId) } : null,
    };

    try {
      if (id) {
        await axios.put(`http://localhost:8080/locacoes/${id}`, payload);
      } else {
        await axios.post("http://localhost:8080/locacoes", payload);
      }
      router.push("/locacoes");
    } catch (error) {
      alert("Erro ao salvar locação!");
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return <p className="text-sm text-slate-500">Carregando dados da locação...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-5 max-w-lg mx-auto">
      <div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">Data de início</label>
          <input
            name="dataInicio"
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-1.5 mt-5">
          <label className="block text-sm font-medium text-slate-700">Data de fim</label>
          <input
            name="dataFim"
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-1.5 mt-5">
          <label className="block text-sm font-medium text-slate-700">Valor total (R$)</label>
          <input
            name="valorTotal"
            type="number"
            step="0.01"
            placeholder="600.00"
            value={valorTotal}
            onChange={(e) => setValorTotal(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-1.5 mt-5">
          <label className="block text-sm font-medium text-slate-700">Cliente</label>
          <select
            name="cliente"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
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
          <label className="block text-sm font-medium text-slate-700">Veículo</label>
          <select
            name="veiculo"
            value={veiculoId}
            onChange={(e) => setVeiculoId(e.target.value)}
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
            disabled={salvando}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
          >
            {salvando ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </form>
  );
}