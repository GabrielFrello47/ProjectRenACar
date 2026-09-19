export default function Footer() {

    const anoAtual = new Date().getFullYear();
    return (

<footer className="bg-white border-t border-slate-200">
<div className="max-w-5xl mx-auto px-6 py-5">
    <div>
        <p className="text-xs text-slate-500 text-center">
            © {anoAtual}{" "}
            <span className="font-semibold text-slate-700">RentACar</span>
            {" "}— Todos os direitos reservados.
        </p>
    </div>
</div>
</footer>
    );

}