"use client";

import { Veiculo } from "@/app/types/veiculo";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface VeiculosFormProps {
  id?: number;
}

export default function VeiculosForm({ id }: VeiculosFormProps) {
  const router = useRouter();
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [ano, setAno] = useState("");
  const [valorDiaria, setValorDiaria] = useState("");
  const [carregando, setCarregando] = useState(!!id);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function carregarVeiculo() {
      try {
        const dados = await axios.get<Veiculo>(`http://localhost:8080/veiculos/${id}`);
        setMarca(dados.data.marca);
        setModelo(dados.data.modelo);
        setPlaca(dados.data.placa);
        setAno(dados.data.ano);
        setValorDiaria(String(dados.data.valorDiaria));
      } catch (error) {
        alert("Erro ao carregar veículo!");
      } finally {
        setCarregando(false);
      }
    }

    carregarVeiculo();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);

    const payload = { marca, modelo, placa, ano, valorDiaria: Number(valorDiaria) };

    try {
      if (id) {
        await axios.put(`http://localhost:8080/veiculos/${id}`, payload);
      } else {
        await axios.post("http://localhost:8080/veiculos", payload);
      }
      router.push("/veiculos");
    } catch (error) {
      alert("Erro ao salvar veículo!");
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return <p className="text-sm text-slate-500">Carregando dados do veículo...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-5 max-w-lg mx-auto">
      <div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">Marca</label>
          <input
            name="marca"
            type="text"
            placeholder="Ex: Fiat"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-1.5 mt-5">
          <label className="block text-sm font-medium text-slate-700">Modelo</label>
          <input
            name="modelo"
            type="text"
            placeholder="Ex: Argo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-1.5 mt-5">
          <label className="block text-sm font-medium text-slate-700">Placa</label>
          <input
            name="placa"
            type="text"
            placeholder="ABC1D23"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-1.5 mt-5">
          <label className="block text-sm font-medium text-slate-700">Ano</label>
          <input
            name="ano"
            type="text"
            placeholder="2023"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-1.5 mt-5">
          <label className="block text-sm font-medium text-slate-700">Valor da diária (R$)</label>
          <input
            name="valorDiaria"
            type="number"
            step="0.01"
            placeholder="150.00"
            value={valorDiaria}
            onChange={(e) => setValorDiaria(e.target.value)}
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