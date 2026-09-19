"use client";

import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        :root{
          --orange:#E8590C; --orange2:#FF7A2E; --ink:#0F0E0D; --panel:rgba(255,255,255,0.05);
          --line:rgba(255,255,255,0.10); --muted:#A8A29A; --white:#FFFFFF;
        }
        *{box-sizing:border-box;} html{scroll-behavior:smooth;}
        body{margin:0;background:var(--ink);color:var(--white);font-family:'Work Sans',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
        h1,h2,h3{font-family:'Space Grotesk',sans-serif;margin:0;letter-spacing:-0.02em;}
        p{margin:0;} a{color:inherit;text-decoration:none;} .wrap{max-width:1180px;margin:0 auto;padding:0 28px;}

        body::before{content:'';position:fixed;top:-20%;right:-10%;width:60vw;height:60vw;
          background:radial-gradient(circle,var(--orange) 0%,transparent 70%);opacity:0.18;filter:blur(60px);pointer-events:none;z-index:0;}

        header{position:sticky;top:0;z-index:50;backdrop-filter:blur(14px);background:rgba(15,14,13,0.6);border-bottom:1px solid var(--line);}
        nav{display:flex;align-items:center;justify-content:space-between;height:78px;position:relative;z-index:1;}
        .logo{display:flex;align-items:center;gap:10px;font-weight:700;font-size:19px;}
        .logo svg{width:32px;height:32px;}
        .nav-links{display:flex;gap:34px;}
        .nav-links a{font-size:14.5px;color:var(--muted);transition:color .2s;}
        .nav-links a:hover{color:var(--white);}
        .btn{display:inline-flex;align-items:center;justify-content:center;padding:12px 24px;border-radius:999px;font-weight:600;font-size:14.5px;transition:all .2s;}
        .btn-primary{background:linear-gradient(135deg,var(--orange2),var(--orange));color:#fff;box-shadow:0 8px 24px -8px rgba(232,89,12,0.6);}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 28px -8px rgba(232,89,12,0.75);}
        .btn-ghost{border:1px solid var(--line);color:var(--white);}
        .btn-ghost:hover{background:var(--panel);}
        .menu-toggle{display:none;background:none;border:none;color:#fff;}

        .hero{padding:110px 0 90px;position:relative;z-index:1;}
        .badge{display:inline-flex;align-items:center;gap:8px;padding:7px 16px;border-radius:999px;border:1px solid var(--line);background:var(--panel);font-size:13px;color:var(--muted);margin-bottom:28px;}
        .badge span{width:6px;height:6px;border-radius:50%;background:var(--orange2);}
        .hero h1{font-size:clamp(40px,6vw,74px);font-weight:800;line-height:1.02;max-width:15ch;}
        .hero h1 em{font-style:normal;background:linear-gradient(135deg,var(--orange2),var(--orange));-webkit-background-clip:text;background-clip:text;color:transparent;}
        .hero p{margin-top:24px;font-size:18px;line-height:1.6;color:var(--muted);max-width:44ch;}
        .hero-actions{display:flex;gap:14px;margin-top:38px;flex-wrap:wrap;}

        .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:80px;}
        .card{background:var(--panel);border:1px solid var(--line);border-radius:20px;padding:32px;transition:transform .25s,border-color .25s;}
        .card:hover{transform:translateY(-6px);border-color:rgba(232,89,12,0.5);}
        .card .ic{width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,rgba(232,89,12,0.25),rgba(255,122,46,0.1));display:flex;align-items:center;justify-content:center;margin-bottom:20px;color:var(--orange2);}
        .card h3{font-size:18px;margin-bottom:10px;}
        .card p{font-size:14.5px;color:var(--muted);line-height:1.6;}

        section.features{padding:60px 0 100px;position:relative;z-index:1;}
        .section-head{text-align:center;max-width:52ch;margin:0 auto 20px;}
        .section-head h2{font-size:clamp(28px,3.6vw,42px);font-weight:700;}
        .section-head p{color:var(--muted);margin-top:14px;font-size:16px;}

        .cta{position:relative;z-index:1;margin:0 28px 80px;border-radius:28px;padding:64px 40px;text-align:center;
          background:linear-gradient(135deg,#2A1206,#0F0E0D);border:1px solid rgba(232,89,12,0.3);overflow:hidden;}
        .cta h2{font-size:clamp(26px,3.4vw,38px);margin-bottom:16px;}
        .cta p{color:var(--muted);margin-bottom:30px;}
        .cta-actions{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}

        footer{border-top:1px solid var(--line);padding:36px 0;position:relative;z-index:1;}
        .footer-row{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:13.5px;color:var(--muted);}

        @media(prefers-reduced-motion:no-preference){
          .badge,.hero h1,.hero p,.hero-actions{opacity:0;animation:up .7s ease forwards;}
          .badge{animation-delay:.05s;} .hero h1{animation-delay:.15s;} .hero p{animation-delay:.28s;} .hero-actions{animation-delay:.4s;}
        }
        @keyframes up{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}

        @media(max-width:860px){
          .grid3{grid-template-columns:1fr;}
          .nav-links{position:fixed;inset:78px 0 0 0;background:var(--ink);flex-direction:column;padding:30px;gap:22px;transform:translateX(100%);transition:transform .25s;}
          .nav-links.open{transform:translateX(0);}
          .menu-toggle{display:block;}
        }
      `}</style>

      <header>
        <div className="wrap">
          <nav>
            <div className="logo">
              <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
                <path d="M4 28 L18 8 L24 8 L14 24 L26 24 L36 8" stroke="#FF7A2E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontWeight: 800, letterSpacing: "-0.03em", textTransform: "uppercase" }}>RentACar</span>
            </div>

            <div className={`nav-links ${menuOpen ? "open" : ""}`} id="navLinks">
              <a href="#recursos" onClick={() => setMenuOpen(false)}>Recursos</a>
              <a href="#historia" onClick={() => setMenuOpen(false)}>História</a>
              <a href="#login" onClick={() => setMenuOpen(false)}>Entrar</a>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <a href="#login" className="btn btn-primary">Entrar</a>
              <button
                className="menu-toggle"
                aria-label="Menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                ☰
              </button>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="wrap">
          <div className="badge"><span></span>Qualidade e segurança acima de tudo</div>
          <h1>Alugue um carro <em>sem enrolação</em>, pro seu dia a dia.</h1>
          <p>Frota revisada, reserva em minutos e suporte de verdade em cada quilômetro rodado.</p>
          <div className="hero-actions">
            <a href="#recursos" className="btn btn-primary">Reservar agora</a>
            <a href="#historia" className="btn btn-ghost">Nossa história</a>
          </div>

          <div className="grid3" id="recursos">
            <div className="card">
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.8"/></svg>
              </div>
              <h3>Segurança primeiro</h3>
              <p>Revisão completa antes de cada retirada e seguro incluso em toda locação.</p>
            </div>
            <div className="card">
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="7" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M5 11l2-5h10l2 5" stroke="currentColor" strokeWidth="1.8"/></svg>
              </div>
              <h3>Frota nova</h3>
              <p>Carros com no máximo dois anos de uso, sempre higienizados.</p>
            </div>
            <div className="card">
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.8"/></svg>
              </div>
              <h3>Reserva rápida</h3>
              <p>Do clique na tela até a chave na mão em poucos minutos.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features" id="historia">
        <div className="wrap">
          <div className="section-head">
            <h2>Qualidade e segurança acima de tudo para o seu dia a dia.</h2>
            <p>Nascemos da frustração de alugar um carro sem saber em que mãos ele esteve antes — por isso cada decisão da RentACar parte dessa pergunta.</p>
          </div>
        </div>
      </section>

      <div className="cta" id="login">
        <h2>Pronto para pegar a estrada?</h2>
        <p>Crie sua conta e reserve seu próximo carro agora mesmo.</p>
        <div className="cta-actions">
          <a href="#" className="btn btn-primary">Entrar</a>
          <a href="#" className="btn btn-ghost">Criar conta</a>
        </div>
      </div>

      <footer>
        <div className="wrap">
          <div className="footer-row">
            <span>© 2026 RentACar</span>
            <span>Criciúma, SC</span>
          </div>
        </div>
      </footer>
    </>
  );
}