import Link from "next/link";

export default function UsuarioForm() {

    return (

        <form className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-5 max-w-lg mx-auto">
            <div>
                <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">
                    Nome completo
                    </label>

                    <input
                        name="nome"
                        type="text"
                        placeholder="Nome completo"
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <div className="space-y-1.5 mt-5">
                    <label className="block text-sm font-medium text-slate-700">
                    CPF
                    </label>

                    <input
                        name="cpf"
                        type="text"
                        placeholder="Somente números"
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <div className="space-y-1.5 mt-5">
                    <label className="block text-sm font-medium text-slate-700">
                    Email
                    </label>

                    <input
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <div className="space-y-1.5 mt-5">
                    <label className="block text-sm font-medium text-slate-700">
                    Senha
                    </label>

                    <input
                        name="senha"
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                <div className="flex items-center justify-end gap-3 mt-8">
                    <Link
                        href="/usuarios"
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