"use client";

import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        :root{
          --orange-600:#E8590C;
          --orange-700:#C24509;
          --orange-100:#FBE3CE;
          --asphalt-900:#1A1917;
          --asphalt-700:#3A3733;
          --asphalt-500:#635E57;
          --cream-50:#FAF7F2;
          --line:#E7E0D6;
          --white:#FFFFFF;
          --radius-sm:4px;
          --radius-md:8px;
          --maxw:1160px;
        }

        *{box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{
          margin:0;
          font-family:'Work Sans', sans-serif;
          color:var(--asphalt-900);
          background:var(--cream-50);
          -webkit-font-smoothing:antialiased;
        }
        h1,h2,h3,.display{
          font-family:'Space Grotesk', sans-serif;
          font-weight:600;
          line-height:1.08;
          margin:0;
          letter-spacing:-0.01em;
        }
        p{margin:0;}
        a{color:inherit;}
        img,svg{display:block;max-width:100%;}
        .wrap{max-width:var(--maxw);margin:0 auto;padding:0 28px;}
        button{font-family:inherit;cursor:pointer;}

        :focus-visible{outline:2px solid var(--orange-600);outline-offset:3px;}

        .btn{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          gap:8px;
          padding:13px 26px;
          border-radius:999px;
          font-size:15px;
          font-weight:600;
          border:1px solid transparent;
          text-decoration:none;
          white-space:nowrap;
          transition:transform .15s ease, background .15s ease, border-color .15s ease;
        }
        .btn:active{transform:scale(0.97);}
        .btn-primary{background:var(--orange-600);color:var(--white);}
        .btn-primary:hover{background:var(--orange-700);}
        .btn-outline-dark{background:transparent;color:var(--white);border-color:rgba(255,255,255,0.35);}
        .btn-outline-dark:hover{border-color:rgba(255,255,255,0.8);}
        .btn-ghost{background:transparent;color:var(--asphalt-900);border-color:var(--line);}
        .btn-ghost:hover{border-color:var(--asphalt-500);}
        .btn-login{background:var(--asphalt-900);color:var(--white);padding:10px 22px;font-size:14px;}
        .btn-login:hover{background:#000;}
        .btn-on-orange{background:var(--asphalt-900);color:var(--white);}
        .btn-on-orange:hover{background:#000;}

        .road-divider{
          height:3px;
          background-image:repeating-linear-gradient(to right, var(--orange-600) 0 28px, transparent 28px 48px);
          background-repeat:repeat-x;
        }

        header{
          position:sticky;top:0;z-index:50;
          background:rgba(250,247,242,0.92);
          backdrop-filter:blur(8px);
          border-bottom:1px solid var(--line);
        }
        nav.wrap{
          display:flex;align-items:center;justify-content:space-between;
          height:76px;
        }
        .logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--asphalt-900);}
        .logo-mark{width:36px;height:36px;flex:none;}
        .logo-word{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:19px;letter-spacing:-0.01em;}

        .nav-links{display:flex;align-items:center;gap:36px;}
        .nav-links a{font-size:15px;font-weight:500;text-decoration:none;color:var(--asphalt-700);}
        .nav-links a:hover{color:var(--asphalt-900);}
        .nav-actions{display:flex;align-items:center;gap:22px;}

        .menu-toggle{display:none;background:none;border:none;padding:8px;color:var(--asphalt-900);}

        .hero{
          background:var(--asphalt-900);
          color:var(--white);
          overflow:hidden;
          position:relative;
        }
        .hero .wrap{
          display:grid;
          grid-template-columns:1.05fr 0.95fr;
          align-items:center;
          gap:40px;
          padding-top:88px;
          padding-bottom:88px;
        }
        .hero-eyebrow{
          font-size:15px;
          color:var(--orange-600);
          font-weight:600;
          margin-bottom:18px;
        }
        .hero h1{
          font-size:clamp(34px,4.6vw,54px);
          color:var(--white);
          max-width:14ch;
        }
        .hero p.lead{
          margin-top:22px;
          font-size:18px;
          line-height:1.6;
          color:#C9C4BC;
          max-width:46ch;
        }
        .hero-actions{display:flex;gap:14px;margin-top:34px;flex-wrap:wrap;}
        .hero-art{position:relative;}
        .hero-art svg{width:100%;height:auto;}

        .trust{border-bottom:1px solid var(--line);}
        .trust .wrap{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          padding:36px 28px;
        }
        .trust-item{
          padding:0 24px;
          border-left:1px solid var(--line);
        }
        .trust-item:first-child{border-left:none;padding-left:0;}
        .trust-num{
          font-family:'Space Grotesk',sans-serif;
          font-weight:700;
          font-size:30px;
          color:var(--orange-600);
        }
        .trust-label{font-size:14px;color:var(--asphalt-700);margin-top:4px;}

        section{padding:96px 0;}
        .section-head{max-width:56ch;margin-bottom:56px;}
        .section-head h2{font-size:clamp(26px,3vw,36px);}
        .section-head p{margin-top:14px;font-size:16px;color:var(--asphalt-700);line-height:1.6;}

        .features{display:flex;flex-direction:column;}
        .feature-row{
          display:grid;
          grid-template-columns:64px 1fr;
          gap:24px;
          padding:32px 0;
          border-top:1px solid var(--line);
        }
        .features .feature-row:last-child{border-bottom:1px solid var(--line);}
        .feature-icon{
          width:52px;height:52px;
          border-radius:var(--radius-md);
          background:var(--orange-100);
          color:var(--orange-700);
          display:flex;align-items:center;justify-content:center;
        }
        .feature-row h3{font-size:20px;margin-bottom:8px;}
        .feature-row p{color:var(--asphalt-700);font-size:15.5px;line-height:1.6;max-width:60ch;}

        .steps{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:0;
        }
        .step{
          padding:0 32px 0 0;
          position:relative;
        }
        .step + .step{border-left:1px dashed var(--line);padding-left:32px;}
        .step-num{
          font-family:'Space Grotesk',sans-serif;
          font-size:15px;
          font-weight:700;
          color:var(--orange-600);
          margin-bottom:18px;
        }
        .step h3{font-size:19px;margin-bottom:10px;}
        .step p{color:var(--asphalt-700);font-size:15px;line-height:1.6;}

        .mission{
          background:var(--asphalt-900);
          color:var(--white);
        }
        .mission .wrap{
          padding:100px 28px;
          max-width:900px;
        }
        .mission .tag{color:var(--orange-600);font-size:14px;font-weight:600;margin-bottom:22px;}
        .mission blockquote{
          font-family:'Space Grotesk',sans-serif;
          font-size:clamp(24px,3.6vw,40px);
          font-weight:600;
          line-height:1.25;
          margin:0 0 26px 0;
        }
        .mission .by{color:#B9B4AC;font-size:15px;line-height:1.7;max-width:60ch;}

        .cta{
          background:var(--orange-600);
          color:var(--white);
        }
        .cta .wrap{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:24px;
          padding:64px 28px;
          flex-wrap:wrap;
        }
        .cta h2{font-size:clamp(24px,3vw,32px);color:var(--white);max-width:16ch;}
        .cta-actions{display:flex;gap:14px;flex-wrap:wrap;}

        footer{background:var(--cream-50);border-top:1px solid var(--line);}
        footer .wrap{
          padding:56px 28px 40px;
        }
        .footer-top{
          display:flex;
          justify-content:space-between;
          gap:40px;
          flex-wrap:wrap;
          padding-bottom:40px;
        }
        .footer-links{display:flex;gap:48px;flex-wrap:wrap;}
        .footer-col h4{font-size:13px;color:var(--asphalt-900);margin-bottom:14px;font-weight:600;}
        .footer-col a{display:block;font-size:14.5px;color:var(--asphalt-700);text-decoration:none;padding:5px 0;}
        .footer-col a:hover{color:var(--asphalt-900);}
        .footer-bottom{
          display:flex;justify-content:space-between;align-items:center;
          padding-top:28px;border-top:1px solid var(--line);
          font-size:13.5px;color:var(--asphalt-500);
          flex-wrap:wrap;gap:12px;
        }

        @media (prefers-reduced-motion: no-preference){
          .hero-eyebrow,.hero h1,.hero p.lead,.hero-actions{
            opacity:0;
            animation:rise .7s ease forwards;
          }
          .hero-eyebrow{animation-delay:.05s;}
          .hero h1{animation-delay:.15s;}
          .hero p.lead{animation-delay:.28s;}
          .hero-actions{animation-delay:.4s;}
          .hero-art{opacity:0;animation:fade .9s ease forwards;animation-delay:.3s;}
        }
        @keyframes rise{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        @keyframes fade{from{opacity:0;}to{opacity:1;}}

        @media (max-width:900px){
          .hero .wrap{grid-template-columns:1fr;padding-top:56px;padding-bottom:56px;}
          .hero-art{order:-1;max-width:340px;margin:0 auto 8px;}
          .trust .wrap{grid-template-columns:1fr;gap:20px;}
          .trust-item{border-left:none;padding-left:0;padding-top:0;}
          .trust-item + .trust-item{border-top:1px solid var(--line);padding-top:20px;}
          .steps{grid-template-columns:1fr;gap:36px;}
          .step + .step{border-left:none;padding-left:0;border-top:1px dashed var(--line);padding-top:32px;}
          .feature-row{grid-template-columns:48px 1fr;}
          section{padding:64px 0;}
        }
        @media (max-width:720px){
          .nav-links{
            position:fixed;inset:76px 0 0 0;
            background:var(--cream-50);
            flex-direction:column;
            align-items:flex-start;
            padding:28px;
            gap:22px;
            transform:translateX(100%);
            transition:transform .25s ease;
          }
          .nav-links.open{transform:translateX(0);}
          .nav-links a{font-size:17px;}
          .menu-toggle{display:block;}
          .nav-actions .btn-login{padding:9px 18px;}
          .cta .wrap{flex-direction:column;align-items:flex-start;}
        }
      `}</style>

      <header>
        <nav className="wrap">
          <a href="#" className="logo" aria-label="RentACar, página inicial">
            <svg className="logo-mark" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 30 L9 21 C9.8 18.6 12 17 14.6 17 H33.4 C36 17 38.2 18.6 39 21 L42 30" stroke="#E8590C" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="4" y="30" width="40" height="9" rx="4.5" fill="#1A1917"/>
              <circle cx="14" cy="39" r="4.6" fill="#1A1917"/>
              <circle cx="14" cy="39" r="1.8" fill="#FAF7F2"/>
              <circle cx="34" cy="39" r="4.6" fill="#1A1917"/>
              <circle cx="34" cy="39" r="1.8" fill="#FAF7F2"/>
              <path d="M15 24.5H33" stroke="#FAF7F2" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="logo-word">RentACar</span>
          </a>

          <div className={`nav-links ${menuOpen ? "open" : ""}`} id="navLinks">
            <a href="#recursos" onClick={() => setMenuOpen(false)}>Por que a RentACar</a>
            <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a>
            <a href="#historia" onClick={() => setMenuOpen(false)}>Nossa história</a>
          </div>

          <div className="nav-actions">
            <a href="/login" className="btn btn-login">Entrar</a>
            <button
              className="menu-toggle"
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              aria-controls="navLinks"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
        </nav>
      </header>

      <div className="road-divider"></div>

      <section className="hero">
        <div className="wrap">
          <div className="hero-copy">
            <p className="hero-eyebrow">Aluguel de carros</p>
            <h1>Qualidade e segurança acima de tudo, para o seu dia a dia.</h1>
            <p className="lead">Uma frota revisada, um processo de reserva sem enrolação e suporte de verdade em cada quilômetro. É assim que a RentACar encara aluguel de carro.</p>
            <div className="hero-actions">
              <a href="#como-funciona" className="btn btn-primary">Reservar um carro</a>
              <a href="#recursos" className="btn btn-outline-dark">Como funciona</a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="240" cy="255" rx="190" ry="14" fill="#000000" opacity="0.25"/>
              <path d="M60 190 L78 140 C86 118 106 104 129 104 H305 C330 104 353 119 361 142 L378 190"
                    stroke="#E8590C" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round"/>
              <path d="M60 190 H30 a10 10 0 0 0 -10 10 v14 a10 10 0 0 0 10 10 h420 a10 10 0 0 0 10 -10 v-14 a10 10 0 0 0 -10 -10 H378"
                    fill="#F3EEE6"/>
              <path d="M60 190 H30 a10 10 0 0 0 -10 10 v14 a10 10 0 0 0 10 10 h420 a10 10 0 0 0 10 -10 v-14 a10 10 0 0 0 -10 -10 H378"
                    stroke="#E8590C" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round"/>
              <path d="M100 143 C106 126 116 116 132 116 H298 C315 116 326 127 332 144 L336 158 H96 Z" fill="#1A1917"/>
              <path d="M133 122 H185 V150 H108 Z" fill="#3A3733"/>
              <path d="M195 122 H297 L318 150 H195 Z" fill="#3A3733"/>
              <circle cx="118" cy="224" r="34" fill="#1A1917"/>
              <circle cx="118" cy="224" r="15" fill="#F3EEE6"/>
              <circle cx="356" cy="224" r="34" fill="#1A1917"/>
              <circle cx="356" cy="224" r="15" fill="#F3EEE6"/>
              <circle cx="88" cy="184" r="7" fill="#FBE3CE"/>
              <circle cx="392" cy="184" r="6" fill="#FBE3CE"/>
            </svg>
          </div>
        </div>
      </section>

      <section className="trust">
        <div className="wrap">
          <div className="trust-item">
            <div className="trust-num">40+</div>
            <div className="trust-label">modelos na frota, revisados a cada troca</div>
          </div>
          <div className="trust-item">
            <div className="trust-num">3 min</div>
            <div className="trust-label">tempo médio pra fechar uma reserva</div>
          </div>
          <div className="trust-item">
            <div className="trust-num">24h</div>
            <div className="trust-label">suporte disponível durante toda a locação</div>
          </div>
        </div>
      </section>

      <section id="recursos">
        <div className="wrap">
          <div className="section-head">
            <h2>Por que escolher a RentACar</h2>
            <p>Cada carro que sai do nosso pátio carrega o mesmo compromisso: chegar com você inteiro no seu destino.</p>
          </div>

          <div className="features">
            <div className="feature-row">
              <div className="feature-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <h3>Segurança em primeiro lugar</h3>
                <p>Revisão completa antes de cada retirada, checklist de itens de segurança e seguro incluso em todas as locações — sem letra miúda.</p>
              </div>
            </div>

            <div className="feature-row">
              <div className="feature-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 17l3-9h10l3 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="17" width="18" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><circle cx="8" cy="10.5" r="0.9" fill="currentColor"/><circle cx="16" cy="10.5" r="0.9" fill="currentColor"/></svg>
              </div>
              <div>
                <h3>Frota nova e bem cuidada</h3>
                <p>Carros com no máximo dois anos de uso, manutenção preventiva em dia e higienização completa antes de cada entrega.</p>
              </div>
            </div>

            <div className="feature-row">
              <div className="feature-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <h3>Praticidade no dia a dia</h3>
                <p>Reserve pelo site, retire com o app e devolva onde for melhor pra você. Sem fila, sem papelada, sem perder tempo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="como-funciona"
        style={{ background: "var(--white)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}
      >
        <div className="wrap">
          <div className="section-head">
            <h2>Como funciona</h2>
            <p>Do clique na tela até a chave na mão, três passos separam você do seu próximo carro.</p>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <h3>Escolha o carro ideal</h3>
              <p>Filtre por categoria, câmbio ou consumo e veja o preço fechado, sem taxa escondida.</p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <h3>Reserve em minutos</h3>
              <p>Confirme data, local de retirada e forma de pagamento. Você recebe a confirmação na hora.</p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <h3>Retire e dirija</h3>
              <p>Vistoria rápida, chave na mão e suporte a um telefonema de distância durante toda a locação.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mission" id="historia">
        <div className="wrap">
          <p className="tag">Nossa história</p>
          <blockquote>Qualidade e segurança acima de tudo para o seu dia a dia.</blockquote>
          <p className="by">Nascemos da frustração de alugar um carro e não saber em que mãos ele esteve antes. Desde então, cada decisão da RentACar — da escolha da frota ao treinamento de quem cuida dela — parte da mesma pergunta: isso é bom o suficiente pra colocar minha própria família dentro desse carro?</p>
        </div>
      </section>

      <section className="cta" id="login">
        <div className="wrap">
          <h2>Pronto para pegar a estrada?</h2>
          <div className="cta-actions">
            <a href="#" className="btn btn-on-orange">Entrar</a>
            <a
              href="#"
              className="btn btn-outline-dark"
              style={{ borderColor: "rgba(26,25,23,0.35)", color: "var(--asphalt-900)" }}
            >
              Criar conta
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footer-top">
            <a href="#" className="logo" aria-label="RentACar, página inicial">
              <svg className="logo-mark" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 30 L9 21 C9.8 18.6 12 17 14.6 17 H33.4 C36 17 38.2 18.6 39 21 L42 30" stroke="#E8590C" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="4" y="30" width="40" height="9" rx="4.5" fill="#1A1917"/>
                <circle cx="14" cy="39" r="4.6" fill="#1A1917"/>
                <circle cx="14" cy="39" r="1.8" fill="#FAF7F2"/>
                <circle cx="34" cy="39" r="4.6" fill="#1A1917"/>
                <circle cx="34" cy="39" r="1.8" fill="#FAF7F2"/>
                <path d="M15 24.5H33" stroke="#FAF7F2" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="logo-word">RentACar</span>
            </a>

            <div className="footer-links">
              <div className="footer-col">
                <h4>Produto</h4>
                <a href="#recursos">Por que a RentACar</a>
                <a href="#como-funciona">Como funciona</a>
              </div>
              <div className="footer-col">
                <h4>Empresa</h4>
                <a href="#historia">Nossa história</a>
                <a href="#login">Entrar</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 RentACar. Todos os direitos reservados.</span>
            <span>Criciúma, SC</span>
          </div>
        </div>
      </footer>
    </>
  );
}