'use client'

import { useRouter } from "next/navigation";

export default function Login(){
    const router = useRouter();

    const handleLogin = async(formData:FormData) =>{
        router.push("/home")
    }

    return(
        <div className="min-h-screen w-full flex items-center justify-center bg-[#1A1917] px-4">
            <div className="w-full max-w-md bg-[#232120] border border-[#3A3733] rounded-2xl shadow-2xl p-8 space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Entrar no sistema
                    </h1>
                    <p className="text-sm text-[#9B958B]">Insira suas credenciais para acessar o painel</p>
                </div>
                <form action={handleLogin} className="space-y-4" >
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#C9C4BC]">
                            E-Mail
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="seu@email.com"
                            className="w-full px-4 py-2.5 bg-[#141312] border border-[#3A3733] rounded-lg text-white placeholder-[#635E57] focus:outline-none focus:ring-2 focus:ring-[#E8590C] focus:border-transparent transition-all"
                        >
                        </input>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#C9C4BC]">
                            Senha
                        </label>
                        <input
                            name="senha"
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 bg-[#141312] border border-[#3A3733] rounded-lg text-white placeholder-[#635E57] focus:outline-none focus:ring-2 focus:ring-[#E8590C] focus:border-transparent transition-all"
                        >
                        </input>
                    </div>
                    <button 
                        type="submit"
                        className="w-full py-2.5 px-4 bg-[#E8590C] hover:bg-[#C24509] text-white font-medium rounded-lg shadow-lg shadow-orange-950/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E8590C] focus:ring-offset-2 focus:ring-offset-[#232120]"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}