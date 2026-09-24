"use client";

import { Cliente } from "@/app/types/cliente";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ClienteFormProps {
  id?: number;
}

export default function ClienteForm({ id }: ClienteFormProps) {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(!!id);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function carregarCliente() {
      try {
        const dados = await axios.get<Cliente>(`http://localhost:8080/clientes/${id}`);
        setNome(dados.data.nome);
        setCpf(dados.data.cpf);
        setTelefone(dados.data.telefone);
        setEmail(dados.data.email);
      } catch (error) {
        alert("Erro ao carregar cliente!");
      } finally {
        setCarregando(false);
      }
    }

    carregarCliente();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);

    const payload = { nome, cpf, telefone, email };

    try {
      if (id) {
        await axios.put(`http://localhost:8080/clientes/${id}`, payload);
      } else {
        await axios.post("http://localhost:8080/clientes", payload);
      }
      router.push("/clientes");
    } catch (error) {
      alert("Erro ao salvar cliente!");
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return <p className="text-sm text-slate-500">Carregando dados do cliente...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-5 max-w-lg mx-auto">
      <div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">Nome completo</label>
          <input
            name="nome"
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-1.5 mt-5">
          <label className="block text-sm font-medium text-slate-700">CPF</label>
          <input
            name="cpf"
            type="text"
            placeholder="Somente números"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-1.5 mt-5">
          <label className="block text-sm font-medium text-slate-700">Telefone</label>
          <input
            name="telefone"
            type="text"
            placeholder="(00) 00000-0000"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-1.5 mt-5">
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            name="email"
            type="email"
            placeholder="cliente@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="flex items-center justify-end gap-3 mt-8">
          <Link
            href="/clientes"
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