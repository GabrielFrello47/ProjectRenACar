"use client";

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

interface CardInfo {
  titulo: string;
  descricao: string;
  href: string;
  endpoint: string;
}

const cards: CardInfo[] = [
  { titulo: "Usuários", descricao: "Contas com acesso ao painel", href: "/usuarios", endpoint: "http://localhost:8080/usuarios" },
  { titulo: "Clientes", descricao: "Cadastro de clientes da locadora", href: "/clientes", endpoint: "http://localhost:8080/clientes" },
  { titulo: "Veículos", descricao: "Frota disponível para locação", href: "/veiculos", endpoint: "http://localhost:8080/veiculos" },
  { titulo: "Locações", descricao: "Contratos de aluguel em andamento", href: "/locacoes", endpoint: "http://localhost:8080/locacoes" },
];

export default function Home() {
  const [contagens, setContagens] = useState<Record<string, number | null>>({});

  useEffect(() => {
    cards.forEach(async (card) => {
      try {
        const res = await axios.get<unknown[]>(card.endpoint);
        setContagens((prev) => ({ ...prev, [card.titulo]: res.data.length }));
      } catch (error) {
        setContagens((prev) => ({ ...prev, [card.titulo]: null }));
      }
    });
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-50 p-6 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Painel RentACar
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Visão geral do sistema. Escolha uma área para gerenciar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map((card) => (
            <Link
              key={card.titulo}
              href={card.href}
              className="group bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all duration-150"
            >
              <div>
                <h2 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {card.titulo}
                </h2>
                <p className="text-sm text-slate-500 mt-1">{card.descricao}</p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-3xl font-bold text-slate-800">
                  {contagens[card.titulo] === undefined
                    ? "..."
                    : contagens[card.titulo] === null
                    ? "—"
                    : contagens[card.titulo]}
                </span>
                <span className="text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform">
                  Ver tudo →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}