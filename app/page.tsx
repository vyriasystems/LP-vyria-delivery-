"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";

const ORANGE = "#E8521A";
const DARK = "#1a1a1a";
const LIGHT = "#f9f7f4";

const features = [
  { icon: "menu", label: "Cardapio digital" },
  { icon: "pulse", label: "Pedidos ao vivo" },
  { icon: "spark", label: "IA integrada" },
  { icon: "chat", label: "WhatsApp automatico" }
] as const;

type DifferentialCard = {
  icon: string;
  title: string;
  text: string;
  href?: string;
  linkLabel?: string;
};

type FunctionalityBlock = {
  badge?: string;
  title: string;
  subtitle: string;
  list: string[];
  mockup: string;
  cta?: { label: string; href?: string; youtubeModalId?: string };
};

const functionalityBlocks: FunctionalityBlock[] = [
  {
    title: "Seu cardapio online em minutos",
    subtitle:
      "Crie produtos, categorias e personalize sua loja. Compartilhe o link com seus clientes e comece a receber pedidos agora mesmo - sem depender de marketplaces.",
    list: ["Link publico exclusivo", "Abrir e fechar loja", "Imagens dos produtos", "Categorias organizadas"],
    mockup: "Loja publica",
    cta: { label: "Ver exemplo de loja", youtubeModalId: "HcLP4z4DWfA" }
  },
  {
    title: "Nunca perca um pedido",
    subtitle:
      "Receba pedidos diretamente no seu painel, acompanhe o status em tempo real e mantenha sua operacao organizada - do preparo a entrega.",
    list: [
      "Notificacao instantanea",
      "Status: pendente -> preparo -> entregue",
      "Historico completo",
      "PDV para balcao (Pro)"
    ],
    mockup: "Painel de pedidos"
  },
  {
    title: "IA que faz o trabalho pesado",
    subtitle:
      "Fotografe o cardapio em papel e a IA importa tudo automaticamente. Gera descricoes irresistiveis e fotos profissionais para cada produto - sem fotografo, sem copywriter.",
    list: [
      "Importar cardapio por foto",
      "Descricao gerada por IA",
      "Foto profissional gerada por IA"
    ],
    mockup: "IA gerando foto do produto",
    cta: { label: "Ver como funciona", youtubeModalId: "0Fwj1ppS_Tg" }
  },
  {
    title: "Seu WhatsApp respondendo sozinho",
    subtitle:
      "Configure uma vez e esqueça. Quando o cliente mandar mensagem, o sistema responde automaticamente com o link do cardápio — 24h por dia, sem você precisar estar online.",
    list: [
      "Resposta automática no WhatsApp",
      "Envia o link do cardápio instantaneamente",
      "Funciona fora do horário de atendimento"
    ],
    mockup: "WhatsApp automatico"
  }
];

const plans = [
  {
    name: "Start",
    price: 49,
    badge: "Iniciante",
    features: ["Dashboard", "Cardapio de produtos", "Financeiro basico", "Configuracoes", "Link publico"],
    highlighted: false
  },
  {
    name: "Growth",
    price: 99,
    badge: "Popular",
    features: [
      "Tudo do Start",
      "Pedidos em tempo real",
      "Promocoes",
      "Relatorios",
      "Importar cardapio por foto com IA"
    ],
    highlighted: true
  },
  {
    name: "Pro",
    price: 149,
    badge: "Completo",
    features: [
      "Tudo do Growth",
      "KDS monitor de cozinha",
      "PDV balcao",
      "Impressao automatica",
      "Aparencia personalizada",
      "Foto e descricao com IA"
    ],
    highlighted: false
  }
] as const;

const testimonials = [
  {
    name: "Caio Sergio",
    business: "Delivery de lanches",
    date: "16 Abril 2026",
    selfie: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Sistema bom demais, acompanho em tempo real pelo smartphone e tudo mais."
  },
  {
    name: "Monique Peres",
    business: "Lanchonete",
    date: "17 Marco 2026",
    selfie: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Otima experiencia, atendimento impecavel e sistema muito funcional."
  },
  {
    name: "Alan Barbosa",
    business: "Pizzaria",
    date: "20 Fevereiro 2026",
    selfie: "https://randomuser.me/api/portraits/men/41.jpg",
    text: "O melhor do mercado. Muito facil de operar e o suporte responde rapido."
  },
  {
    name: "Ana Paula Andrade",
    business: "Restaurante",
    date: "25 Fevereiro 2026",
    selfie: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "Sistema completo, estou atendendo todos os pedidos e minha equipe evoluiu muito."
  },
  {
    name: "Gabriel Assalin",
    business: "Hamburgueria",
    date: "19 Fevereiro 2026",
    selfie: "https://randomuser.me/api/portraits/men/22.jpg",
    text: "Tenho gerido bem meu negocio com o painel. Recomendo de olhos fechados."
  },
  {
    name: "Gisele Martins",
    business: "Açaiteria",
    date: "25 Fevereiro 2026",
    selfie: "https://randomuser.me/api/portraits/women/25.jpg",
    text: "Estou com a Vyria ha meses e o principal e o suporte: sempre ajudam quando preciso."
  },
  {
    name: "Tiago Simoes",
    business: "Marmitaria",
    date: "14 Fevereiro 2026",
    selfie: "https://randomuser.me/api/portraits/men/77.jpg",
    text: "Profissionais excelentes e sistema estavel. Indico para quem quer crescer."
  },
  {
    name: "Rayssa Karine",
    business: "Confeitaria",
    date: "10 Fevereiro 2026",
    selfie: "https://randomuser.me/api/portraits/women/31.jpg",
    text: "Melhor sistema para trabalhar, da total suporte para gerenciar as vendas."
  },
  {
    name: "Marcia Simoes",
    business: "Doceria",
    date: "13 Marco 2026",
    selfie: "https://randomuser.me/api/portraits/women/52.jpg",
    text: "Atendimento rapido, painel limpo e muito facil para treinar equipe nova."
  },
  {
    name: "Joao Victor Lima",
    business: "Restaurante familiar",
    date: "12 Fevereiro 2026",
    selfie: "https://randomuser.me/api/portraits/men/12.jpg",
    text: "Em dois anos de operacao foi a melhor decisao. O resultado apareceu em pouco tempo."
  },
  {
    name: "Rafaela Souza",
    business: "Pizzaria artesanal",
    date: "11 Abril 2026",
    selfie: "https://randomuser.me/api/portraits/women/13.jpg",
    text: "Otimo treinamento da equipe e sistema pratico para quem vende muito no dia a dia."
  },
  {
    name: "Robson Brandao",
    business: "Lancheria",
    date: "16 Marco 2026",
    selfie: "https://randomuser.me/api/portraits/men/50.jpg",
    text: "Empresa muito competente, suporte mais rapido do Brasil."
  }
] as const;

const benefits = ["Resposta em ate 24h", "Sem compromisso", "Suporte em portugues"] as const;

function Icon({ name }: { name: string }) {
  if (name === "rocket") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19l4-1 10-10c.6-.6.6-1.6 0-2.2l-1.8-1.8c-.6-.6-1.6-.6-2.2 0L5 14l-1 4 1 1zM12 6l6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  if (name === "spark") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3zM18 14l.8 2 .2.2 2 .8-2 .8-.2.2-.8 2-.8-2-.2-.2-2-.8 2-.8.2-.2.8-2z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  if (name === "chart") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19h16M7 16V9m5 7V6m5 10v-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  if (name === "whatsapp" || name === "chat") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a8 8 0 0 0-7.8 9.8L3 20l6.3-1.2A8 8 0 1 0 12 4z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  if (name === "menu") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
  }
  if (name === "pulse") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h4l2.4-4.2L13 16l2.2-4H21" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  if (name === "mapPin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 21.5c-3.8-3.2-6.5-6.8-6.5-10.3a6.5 6.5 0 1 1 13 0c0 3.5-2.7 7.1-6.5 10.3z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="11.2" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg>;
}

function Logo() {
  return (
    <div className="logo">
      <span className="logoMark">V</span>
      <div>
        <strong>Vyria</strong>
        <small>Delivery</small>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [videoModalId, setVideoModalId] = useState<string | null>(null);
  const [activeReview, setActiveReview] = useState<string | null>(null);
  const whatsappMessage = encodeURIComponent("Ola! Quero uma demonstracao da Vyria.");
  const whatsappLink = `https://wa.me/5562995597811?text=${whatsappMessage}`;
  const instagramUrl = "https://www.instagram.com/vyriadelivery/";

  const differentialCards: DifferentialCard[] = useMemo(
    () => [
      {
        icon: "rocket",
        title: "Seu cardapio no ar em minutos",
        text: "Cadastre, configure e compartilhe o link. Sem precisar de tecnico, sem complicacao."
      },
      {
        icon: "spark",
        title: "IA integrada desde o Growth",
        text: "Importe cardapios por foto, gere descricoes e fotos profissionais automaticamente."
      },
      {
        icon: "mapPin",
        title: "Atendimento presencial",
        text: "Estamos em Senador Canedo - GO e atendemos toda a região. Prefere resolver pessoalmente? A gente marca.",
        href: "https://maps.app.goo.gl/eubdeNcYsP3QXeKo7",
        linkLabel: "Ver no mapa →"
      },
      {
        icon: "whatsapp",
        title: "Suporte via WhatsApp",
        text: "Estamos aqui para ajudar. Fale direto com a equipe e resolva qualquer duvida rapidamente."
      }
    ],
    [whatsappLink]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoModalId) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoModalId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [videoModalId]);

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.get("nome"),
          whatsapp: data.get("whatsapp"),
          loja: data.get("loja"),
          mensagem: data.get("mensagem")
        })
      });
      if (!response.ok) throw new Error("Falha ao enviar");
      setMessage("Recebemos sua mensagem! Entraremos em contato em breve.");
      form.reset();
    } catch {
      setMessage("Nao foi possivel enviar agora. Tente novamente em alguns minutos.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page">
      <header className={`navbar ${scrolled ? "navbarScrolled" : ""}`}>
        <div className="container navContent">
          <Link href="/" aria-label="Vyria Delivery">
            {logoError ? (
              <Logo />
            ) : (
              <span className="brandCircle">
                <Image
                  src="/logo.png"
                  alt="Vyria Delivery"
                  width={42}
                  height={42}
                  className="brandImage"
                  onError={() => setLogoError(true)}
                />
              </span>
            )}
          </Link>
          <nav className="navLinks">
            <a href="#funcionalidades">Funcionalidades</a>
            <a href="#planos">Planos</a>
            <a href="#depoimentos">Depoimentos</a>
            <a href="#contato">Contato</a>
          </nav>
          <div className="navActions">
            <button className="menuButton" onClick={() => setMenuOpen(true)} aria-label="Abrir menu"><Icon name="menu" /></button>
          </div>
        </div>
      </header>

      <aside className={`drawer ${menuOpen ? "drawerOpen" : ""}`} aria-hidden={!menuOpen}>
        <button className="drawerBackdrop" onClick={() => setMenuOpen(false)} aria-label="Fechar menu" />
        <div className="drawerPanel">
          <button className="closeDrawer" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">x</button>
          <a href="#funcionalidades" onClick={() => setMenuOpen(false)}>Funcionalidades</a>
          <a href="#planos" onClick={() => setMenuOpen(false)}>Planos</a>
          <a href="#depoimentos" onClick={() => setMenuOpen(false)}>Depoimentos</a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
          <Link href="/login" className="btn btnOutlineDark">Entrar</Link>
          <Link href="/register" className="btn btnPrimary">Comecar agora</Link>
        </div>
      </aside>

      {videoModalId ? (
        <div className="videoModal" role="dialog" aria-modal="true" aria-label="Video no YouTube">
          <button type="button" className="videoModalBackdrop" onClick={() => setVideoModalId(null)} aria-label="Fechar video" />
          <div className="videoModalPanel">
            <button type="button" className="videoModalClose" onClick={() => setVideoModalId(null)} aria-label="Fechar">
              ×
            </button>
            <div className="videoModalFrame">
              <iframe
                title="Demonstracao Vyria no YouTube"
                src={`https://www.youtube.com/embed/${videoModalId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}

      <main>
        <section className="hero">
          <div className="container heroGrid">
            <div>
              <p className="chip revealDelay1">Novo: geracao de fotos com IA</p>
              <h1 className="heroTitle revealDelay2">Sua loja de delivery,<br />do zero ao profissional</h1>
              <p className="heroSubtitle revealDelay3">
                Cardapio digital com link proprio, pedidos em tempo real e IA que trabalha por voce - numa plataforma feita para quem vende comida de verdade.
              </p>
              <div className="heroActions revealDelay4">
                <a className="btn btnPrimary heroCta" href={whatsappLink} target="_blank" rel="noreferrer">Falar com consultor</a>
              </div>
              <p className="heroProof revealDelay5">
                <span className="googleDot" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.24-.96 2.3-2.04 3.01l3.3 2.56c1.92-1.77 3.03-4.38 3.03-7.49 0-.73-.07-1.43-.19-2.11H12z" />
                    <path fill="#34A853" d="M12 22c2.76 0 5.08-.91 6.77-2.47l-3.3-2.56c-.91.61-2.08.97-3.47.97-2.67 0-4.94-1.8-5.75-4.22H2.84v2.65A9.99 9.99 0 0 0 12 22z" />
                    <path fill="#4A90E2" d="M6.25 13.72A5.98 5.98 0 0 1 6.25 10.28V7.63H2.84A10 10 0 0 0 2 12c0 1.57.37 3.05 1.03 4.37l3.22-2.65z" />
                    <path fill="#FBBC05" d="M12 6.06c1.5 0 2.85.52 3.91 1.53l2.93-2.93C17.07 2.97 14.76 2 12 2A9.99 9.99 0 0 0 2.84 7.63l3.41 2.65c.81-2.42 3.08-4.22 5.75-4.22z" />
                  </svg>
                </span>
                <span className="heroStars">⭐⭐⭐⭐⭐</span>
                <span>Usado por lojistas em todo o Brasil</span>
              </p>
            </div>
            <div className="heroMockup revealDelay4">
              <Image
                src="/hero-fixa.png"
                alt="Painel da plataforma Vyria"
                fill
                sizes="(max-width: 1024px) 92vw, 520px"
                priority
                className="heroMockupImage"
              />
            </div>
          </div>
        </section>

        <section className="proofBar">
          <div className="container">
            <p>Tudo que sua loja precisa em um so lugar</p>
            <div className="proofGrid">
              {features.map((item) => (
                <div key={item.label} className="proofItem"><span><Icon name={item.icon} /></span>{item.label}</div>
              ))}
            </div>
          </div>
        </section>

        <section id="funcionalidades">
          {functionalityBlocks.map((block, index) => (
            <div key={block.title} className={`featureSection ${index % 2 === 0 ? "light" : "white"}`}>
              <div
                className={`container featureGrid ${index % 2 !== 0 && index !== 3 ? "reverse" : ""}`}
                data-reveal
              >
                <div>
                  {block.badge ? <p className="chip">{block.badge}</p> : null}
                  <h2>{block.title}</h2>
                  <p>{block.subtitle}</p>
                  <ul>
                    {block.list.map((item) => (
                      <li key={item}>
                        <span className="featureCheck" aria-hidden="true">
                          ✓
                        </span>{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                  {block.cta ? (
                    block.cta.youtubeModalId ? (
                      <button
                        type="button"
                        className="btn btnOutlineOrange"
                        onClick={() => setVideoModalId(block.cta!.youtubeModalId!)}
                      >
                        {block.cta.label}
                      </button>
                    ) : block.cta.href ? (
                      <a className="btn btnOutlineOrange" href={block.cta.href}>
                        {block.cta.label}
                      </a>
                    ) : null
                  ) : null}
                </div>
                <div
                  className={`featureMockup ${index === 1 || index === 2 || index === 3 ? "featureMockupContain" : ""} ${
                    index === 2 ? "featureMockupContainDark" : ""
                  }`}
                >
                  {index === 0 ? (
                    <div className="phoneFrame">
                      <div className="phoneNotch" />
                      <iframe
                        title="Demonstracao Vyria no YouTube Shorts"
                        src="https://www.youtube.com/embed/3GGvRIkekQ0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  ) : index === 1 ? (
                    <div className="notebookFrame">
                      <div className="notebookLid">
                        <div className="notebookCamera" aria-hidden />
                        <div className="notebookScreen">
                          <iframe
                            title="Nunca perca um pedido — demonstracao em video"
                            src="https://www.youtube.com/embed/eChy1sCq8iI"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        </div>
                      </div>
                      <div className="notebookBase" aria-hidden />
                    </div>
                  ) : index === 2 ? (
                    <div className="featureMediaFrame">
                      <Image
                        src="/mockup-ia-trabalho-pesado.png"
                        alt="IA importando cardapio em papel para o app Vyria"
                        fill
                        sizes="(max-width: 1024px) 92vw, 520px"
                        className="featureMediaImage"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  ) : index === 3 ? (
                    <div className="featureMediaFrame">
                      <Image
                        src="/mockup-automacoes-whatsapp.png"
                        alt="Vyria Delivery: automacoes WhatsApp, painel de metricas e mensagens para o restaurante"
                        fill
                        sizes="(max-width: 1024px) 92vw, 520px"
                        className="featureMediaImage"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  ) : (
                    block.mockup
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="differentials">
          <div className="container">
            <h2>Por que escolher a Vyria?</h2>
            <div className="diffGrid">
              {differentialCards.map((card) => (
                <article key={card.title} className="diffCard">
                  <span className="diffIcon">
                    <Icon name={card.icon} />
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  {card.href && card.linkLabel ? (
                    <a className="diffCardLink" href={card.href} target="_blank" rel="noreferrer">
                      {card.linkLabel}
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="planos" className="plans">
          <div className="container">
            <h2>Planos que crescem com voce</h2>
            <p>Comece pequeno, escale sem trocar de sistema</p>
            <div className="planGrid">
              {plans.map((plan) => (
                <article key={plan.name} className={`planCard ${plan.highlighted ? "planHighlight" : ""}`}>
                  <span className="planBadge">{plan.badge}</span>
                  <h3>{plan.name}</h3>
                  <p className="price">R${plan.price}/mes</p>
                  <ul>{plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>
                  <Link href="/register" className="btn btnPrimary full">Comecar agora</Link>
                </article>
              ))}
            </div>
            <a className="plansHelp" href={whatsappLink} target="_blank" rel="noreferrer">Duvidas sobre qual plano escolher? Fale com a gente {"->"}</a>
          </div>
        </section>

        <section id="depoimentos" className="testimonials">
          <div className="container">
            <h2>Quem ja usa a Vyria</h2>
            <div className="reviewTrustBar">
              <div className="reviewTrustInfo">
                <span className="reviewGoogleBadge" aria-label="Google">
                  <span className="gBlue">G</span>
                  <span className="gRed">o</span>
                  <span className="gYellow">o</span>
                  <span className="gBlue">g</span>
                  <span className="gGreen">l</span>
                  <span className="gRed">e</span>
                </span>
                <strong>Excelente</strong>
                <span className="reviewStars">★★★★★</span>
                <small>5.0 | 433 avaliacoes</small>
              </div>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="reviewWriteBtn">Escreva sua avaliacao</a>
            </div>
            <div className="testGrid">
              {testimonials.map((item) => (
                <article
                  key={item.name}
                  className={`testCard ${activeReview === item.name ? "testCardActive" : ""}`}
                  onClick={() => setActiveReview(item.name)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveReview(item.name);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="testTop">
                    <div className="avatar">
                      <img src={item.selfie} alt={`Foto de ${item.name}`} loading="lazy" />
                    </div>
                    <span className="googleMini" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.24-.96 2.3-2.04 3.01l3.3 2.56c1.92-1.77 3.03-4.38 3.03-7.49 0-.73-.07-1.43-.19-2.11H12z" />
                        <path fill="#34A853" d="M12 22c2.76 0 5.08-.91 6.77-2.47l-3.3-2.56c-.91.61-2.08.97-3.47.97-2.67 0-4.94-1.8-5.75-4.22H2.84v2.65A9.99 9.99 0 0 0 12 22z" />
                        <path fill="#4A90E2" d="M6.25 13.72A5.98 5.98 0 0 1 6.25 10.28V7.63H2.84A10 10 0 0 0 2 12c0 1.57.37 3.05 1.03 4.37l3.22-2.65z" />
                        <path fill="#FBBC05" d="M12 6.06c1.5 0 2.85.52 3.91 1.53l2.93-2.93C17.07 2.97 14.76 2 12 2A9.99 9.99 0 0 0 2.84 7.63l3.41 2.65c.81-2.42 3.08-4.22 5.75-4.22z" />
                      </svg>
                    </span>
                  </div>
                  <h3>{item.name}</h3>
                  <small>{item.date}</small>
                  <p className="testBusiness">{item.business}</p>
                  <span className="testStars">★★★★★</span>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
 
        <section className="finalCta">
          <div className="container">
            <h2>Comece hoje mesmo</h2>
            <p>Seu cardapio no ar em menos de 10 minutos.</p>
            <a className="btn finalCtaButton" href={whatsappLink} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 4a8 8 0 0 0-7.8 9.8L3 20l6.3-1.2A8 8 0 1 0 12 4z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Falar no WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footerTopGrid">
          <div className="footerBrandCol">
            <div className="footerBrandBox">
              <Image src="/logo.png" alt="Vyria Delivery" width={58} height={58} className="footerBrandLogo" />
            </div>
            <p className="footerTagline">Engenharia de vendas para delivery</p>
            <p className="footerSmallText">
              Sistema de cardapio digital com IA para quem vende comida de verdade.
            </p>
            <div className="footerLocation">
              <p>📍 Senador Canedo - GO</p>
              <p>Atendimento presencial disponível</p>
            </div>
          </div>

          <div className="footerNavCol">
            <p className="footerLabel">PRODUTO</p>
            <div className="footerLinkList">
              <a href="#funcionalidades">Funcionalidades</a>
              <a href="#planos">Planos</a>
            </div>
            <p className="footerLabel">SUPORTE</p>
            <div className="footerLinkList">
              <a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a>
              <Link href="/privacidade">Politica de privacidade</Link>
            </div>
          </div>

          <div className="footerContactCol">
            <p className="footerLabel">FALE CONOSCO</p>
            <p className="footerSmallText">Prefere falar direto? Chama no WhatsApp ou Instagram.</p>
            <a className="footerContactBtn footerWhatsBtn" href={whatsappLink} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 4a8 8 0 0 0-7.8 9.8L3 20l6.3-1.2A8 8 0 1 0 12 4z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Chamar no WhatsApp
            </a>
            <a className="footerContactBtn footerInstagramBtn" href={instagramUrl} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="17.3" cy="6.8" r="1.1" fill="currentColor" />
              </svg>
              Ver no Instagram
            </a>
          </div>
        </div>
        <div className="container footerBottom">
          <p>© 2026 Vyria Delivery. Todos os direitos reservados.</p>
        </div>
      </footer>

      <style jsx>{`
        .page { font-family: var(--font-inter), sans-serif; color: #101010; background: #fff; }
        .container { width: min(1120px, 92vw); margin: 0 auto; }
        .navbar { position: fixed; top: 0; width: 100%; z-index: 50; transition: 0.25s ease; background: rgba(16,16,16,0.45); border-bottom: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(8px); }
        .navbarScrolled { background: rgba(12,12,12,0.72); border-bottom: 1px solid rgba(255,255,255,0.1); }
        .navContent { min-height: 74px; display:flex; align-items:center; justify-content:space-between; gap:24px; }
        .brandCircle {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.2);
          background: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        }
        .brandImage { width: 100%; height: 100%; object-fit: cover; }
        .logo { display:flex; align-items:center; gap:10px; }
        .logoMark { width:34px; height:34px; border-radius:10px; display:grid; place-items:center; color:#fff; background:${ORANGE}; font-weight:700; }
        .logo strong { display:block; font-size:16px; line-height:1; }
        .logo small { color:#cfcfcf; font-size:12px; }
        .navLinks { display:flex; gap:28px; font-size:14px; color:#f0f0f0; }
        .navActions { display:flex; align-items:center; gap:10px; }
        .menuButton { display:none; border:0; background:transparent; width:34px; height:34px; color:#f5f5f5; }
        .menuButton :global(svg) { width:20px; }
        .btn { border:1px solid transparent; border-radius:12px; padding:12px 16px; font-weight:600; transition:.2s ease; display:inline-flex; justify-content:center; align-items:center; cursor:pointer; }
        .btn:hover { filter:brightness(.95); transform: translateY(-1px); }
        .btn:active { transform: scale(.98); }
        .btnPrimary { background:${ORANGE}; color:#fff; }
        .btnOutlineDark { border-color:#e4e4e4; color:#f7f7f7; background:rgba(255,255,255,0.02); }
        .btnOutlineLight { border-color:#fff; color:#fff; background:transparent; }
        .btnOutlineOrange { border-color:${ORANGE}; color:${ORANGE}; background:transparent; }
        .btnWhite { background:#fff; color:${ORANGE}; }
        .full { width:100%; }
        .drawer { position:fixed; inset:0; pointer-events:none; z-index:60; }
        .drawerBackdrop { position:absolute; inset:0; border:0; background:rgba(0,0,0,.45); opacity:0; transition:.2s; }
        .drawerPanel { position:absolute; right:-280px; top:0; height:100%; width:280px; background:#fff; padding:22px; display:flex; flex-direction:column; gap:14px; transition:.2s; }
        .drawerOpen { pointer-events:auto; }
        .drawerOpen .drawerBackdrop { opacity:1; }
        .drawerOpen .drawerPanel { right:0; }
        .closeDrawer { width:30px; height:30px; margin-left:auto; border:0; background:#f0f0f0; border-radius:8px; }
        .videoModal {
          position: fixed;
          inset: 0;
          z-index: 70;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 14px;
        }
        .videoModalBackdrop {
          position: absolute;
          inset: 0;
          border: 0;
          background: rgba(0, 0, 0, 0.55);
          cursor: pointer;
        }
        .videoModalPanel {
          position: relative;
          z-index: 1;
          width: min(920px, 96vw);
          padding: 44px 10px 10px;
          background: #141414;
          border-radius: 14px;
          border: 1px solid #2a2a2a;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
        }
        .videoModalClose {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 36px;
          height: 36px;
          border: 0;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
          display: grid;
          place-items: center;
        }
        .videoModalClose:hover { background: rgba(255, 255, 255, 0.16); }
        .videoModalFrame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 10px;
          overflow: hidden;
          background: #000;
        }
        .videoModalFrame :global(iframe) {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .hero { background:${DARK}; color:#fff; padding:126px 0 80px; }
        .heroGrid { display:grid; grid-template-columns: 1.05fr 1fr; align-items:center; gap:40px; }
        .chip { display:inline-flex; background:${ORANGE}; color:#fff; padding:7px 12px; border-radius:999px; font-size:13px; font-weight:600; margin-bottom:14px; }
        .page :is(h1, h2, h3, h4) {
          font-family: inherit;
          font-weight: 700;
          letter-spacing: -0.01em;
          text-wrap: balance;
        }
        .heroTitle {
          font-size: clamp(36px, 4.6vw, 64px);
          line-height: 1.02;
          margin: 0;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .heroSubtitle { color:#d5d5d5; font-size:18px; margin:16px 0 20px; line-height:1.6; max-width: 620px; }
        .heroActions { display:flex; gap:12px; flex-wrap:wrap; }
        .heroCta { min-width: 180px; }
        .heroProof { margin-top:16px; color:#d9d9d9; display:flex; align-items:center; gap:8px; font-size:15px; }
        .googleDot {
          width:24px;
          height:24px;
          border-radius:50%;
          display:grid;
          place-items:center;
          background:#fff;
          box-shadow:0 0 0 2px rgba(255,255,255,.22), 0 6px 14px rgba(0,0,0,.35);
          margin-right:2px;
        }
        .googleDot :global(svg) { width:16px; height:16px; display:block; }
        .heroStars {
          letter-spacing: 0.06em;
          color: #ffca45;
          text-shadow: 0 0 12px rgba(255, 202, 69, 0.25);
          margin-right: 4px;
        }
        .heroMockup {
          position: relative;
          background:#111;
          border:1px solid #303030;
          border-radius:16px;
          overflow:hidden;
          aspect-ratio: 1024 / 654;
          min-height:0;
          line-height:0;
          align-self:start;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04), 0 16px 34px rgba(0,0,0,.32);
        }
        .heroMockupImage {
          width:100%;
          height:100%;
          display:block;
          object-fit:contain;
          object-position:center;
          margin:0;
        }
        .placeholder, .featureMockup { min-height:260px; display:grid; place-items:center; border-radius:14px; border:1px solid #ddd; color:#767676; background:linear-gradient(160deg,#f7f7f7,#ededed); font-weight:600; }
        .featureMockup {
          padding: 20px;
          overflow: hidden;
        }
        .featureMockupContain {
          min-height: auto;
          padding: 8px;
          overflow: visible;
          background: #f3f1ee;
          align-self: stretch;
          width: 100%;
        }
        .featureMockupContainDark {
          background: #121212;
          border-color: #2a2a2a;
        }
        .featureMediaFrame {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 2;
          max-height: min(520px, 58vh);
          margin: 0 auto;
          border-radius: 14px;
          background: radial-gradient(circle at 30% 20%, #ffffff 0%, #ece8e2 55%, #e3ded8 100%);
          border: 1px solid #e0dbd4;
        }
        .featureMockupContainDark .featureMediaFrame {
          background: radial-gradient(circle at 20% 30%, #1f1f1f 0%, #121212 60%, #0b0b0b 100%);
          border-color: #2a2a2a;
        }
        .phoneFrame {
          width: min(250px, 100%);
          aspect-ratio: 9 / 18.5;
          border-radius: 30px;
          background: #0f0f10;
          border: 2px solid #2b2b2d;
          padding: 10px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
          position: relative;
        }
        .phoneNotch {
          position: absolute;
          top: 7px;
          left: 50%;
          transform: translateX(-50%);
          width: 40%;
          height: 16px;
          border-radius: 999px;
          background: #070707;
          z-index: 2;
        }
        .phoneFrame :global(iframe) {
          width: 100%;
          height: 100%;
          border: 0;
          border-radius: 22px;
          background: #000;
        }
        .featureCheck {
          color: ${ORANGE};
          font-weight: 800;
          margin-right: 2px;
        }
        .notebookFrame {
          width: min(100%, 560px);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .notebookLid {
          width: 100%;
          background: linear-gradient(165deg, #3d3d40 0%, #252527 55%, #1c1c1e 100%);
          border-radius: 16px 16px 5px 5px;
          padding: 11px 12px 9px;
          box-shadow:
            0 22px 44px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.07);
          border: 1px solid #141415;
        }
        .notebookCamera {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #0d0d0e;
          margin: 0 auto 9px;
          box-shadow: inset 0 0 0 1px #2a2a2c;
        }
        .notebookScreen {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 8px;
          overflow: hidden;
          background: #000;
          border: 1px solid #080808;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
        }
        .notebookScreen :global(iframe) {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .notebookBase {
          width: min(108%, 620px);
          height: 12px;
          margin-top: -2px;
          background: linear-gradient(180deg, #d4d2cf 0%, #b0aea9 45%, #8f8d88 100%);
          border-radius: 0 0 12px 12px;
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.14);
          transform: perspective(520px) rotateX(14deg);
          transform-origin: top center;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-top: none;
        }
        .featureMediaImage {
          border-radius: 12px;
          box-shadow: 0 12px 26px rgba(0,0,0,0.16);
        }
        .proofBar { background:#f4f4f4; padding:18px 0; text-align:center; }
        .proofBar > .container > p {
          margin: 0;
          font-family: inherit;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #9a9a9a;
        }
        .proofGrid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-top:12px; }
        .proofItem {
          background:#fff;
          border:1px solid #eee;
          border-radius:10px;
          padding:10px 8px;
          display:grid;
          place-items:center;
          gap:5px;
          font-size: 13px;
          font-weight: 600;
          line-height: 1.2;
        }
        .proofItem span { width:26px; height:26px; color:${ORANGE}; }
        .proofItem span :global(svg) { width:100%; height:100%; }
        .featureSection { padding:70px 0; }
        .featureSection.light { background:${LIGHT}; }
        .featureSection.white { background:#fff; }
        .featureGrid { display:grid; grid-template-columns:1fr 1fr; gap:26px; align-items:center; opacity:0; transform:translateY(30px); transition:.5s ease; }
        .featureGrid.reverse { direction:rtl; }
        .featureGrid.reverse > * { direction:ltr; }
        .featureGrid.visible { opacity:1; transform:translateY(0); }
        h2 { font-size: clamp(30px, 3.4vw, 44px); line-height: 1.08; margin: 0 0 12px; color: #0f0f0f; }
        .differentials h2,
        .plans h2,
        .testimonials h2,
        .contact h2,
        .finalCta h2 { color: inherit; }
        h3 { font-size: clamp(20px, 2.2vw, 26px); line-height: 1.15; margin: 0 0 8px; color: #141414; }
        .diffCard h3 { color: #fff; }
        h4 { font-size: 14px; line-height: 1.2; margin: 0 0 10px; letter-spacing: 0.02em; text-transform: uppercase; color: #fff; }
        .footer h4 { color: #fff; }
        .featureGrid p { color:#4f4f4f; line-height:1.65; }
        .featureGrid ul { list-style:none; padding:0; margin:14px 0 18px; display:grid; gap:8px; color: #2a2a2a; }
        .differentials { background:${DARK}; color:#fff; padding:80px 0; }
        .differentials h2 { text-align:center; }
        .diffGrid { margin-top:26px; display:grid; grid-template-columns:repeat(2,1fr); gap:18px; }
        .diffCard { border:1px solid #333; border-radius:12px; background:#202020; padding:20px; }
        .diffCard p { color:#d1d1d1; }
        .diffCardLink {
          margin-top: 14px;
          display: inline-block;
          color: ${ORANGE};
          font-weight: 600;
          font-size: 14px;
        }
        .diffCardLink:hover { filter: brightness(1.06); }
        .diffIcon { width:34px; height:34px; color:${ORANGE}; display:block; }
        .diffIcon :global(svg) { width:100%; height:100%; }
        .plans { background:${LIGHT}; padding:80px 0; text-align:center; }
        .plans > .container > p { margin-top:8px; color:#575757; }
        .planGrid {
          margin-top: 28px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          text-align: left;
          justify-content: center;
        }
        .planCard { background:#fff; border:1px solid #ece5db; border-radius:12px; padding:20px; transition:.2s ease; }
        .planCard:hover { transform:translateY(-4px); box-shadow:0 14px 22px rgba(0,0,0,.08); }
        .planHighlight { border-color:${ORANGE}; box-shadow:0 0 0 1px ${ORANGE}; }
        .planBadge { display:inline-block; border-radius:999px; padding:6px 10px; background:#f2f2f2; font-size:12px; font-weight:700; }
        .planCard h3 { margin: 14px 0 6px; font-size: clamp(24px, 2.6vw, 30px); }
        .price { font-size:24px; font-weight:700; margin-bottom:14px; }
        .planCard ul { list-style:none; padding:0; margin:0 0 16px; display:grid; gap:8px; min-height:190px; }
        .plansHelp { margin-top:20px; display:inline-block; color:${ORANGE}; font-weight:600; }
        .testimonials { padding:80px 0; text-align:center; background:#fff; }
        .reviewTrustBar {
          margin-top: 18px;
          padding: 10px 12px;
          border: 1px solid #ececec;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          text-align: left;
        }
        .reviewTrustInfo { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .reviewGoogleBadge {
          display: inline-flex;
          align-items: center;
          gap: 0.5px;
          border-radius: 999px;
          padding: 4px 9px;
          background: #fff;
          border: 1px solid #e6e6e6;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1;
        }
        .gBlue { color: #4285f4; }
        .gRed { color: #ea4335; }
        .gYellow { color: #fbbc05; }
        .gGreen { color: #34a853; }
        .reviewTrustInfo strong { font-size: 15px; color:#1f1f1f; }
        .reviewTrustInfo .reviewStars { color:#ffb400; letter-spacing:.08em; font-weight:700; }
        .reviewTrustInfo small { color:#5f6368; font-size:13px; }
        .reviewWriteBtn {
          border: 1px solid #e1e1e1;
          background: #fff;
          color: #202124;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 13px;
          font-weight: 600;
        }
        .testGrid { margin-top:16px; display:grid; grid-template-columns:repeat(4,1fr); gap:14px; text-align:left; }
        .testCard {
          border:1px solid #ececec;
          border-radius:12px;
          padding:14px;
          cursor:pointer;
          transition:.2s ease;
          background:#fff;
          outline: none;
        }
        .testCard:hover,
        .testCard:focus-visible,
        .testCardActive {
          border-color: rgba(232, 82, 26, 0.45);
          box-shadow: 0 10px 20px rgba(0,0,0,.08);
          transform: translateY(-2px);
        }
        .testTop { display:flex; justify-content:space-between; align-items:center; }
        .avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid #ececec;
          background: #f3f3f3;
          flex-shrink: 0;
        }
        .avatar :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .googleMini {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #fff;
          border: 1px solid #e5e5e5;
          display: inline-grid;
          place-items: center;
          box-shadow: 0 2px 8px rgba(0,0,0,.05);
        }
        .googleMini :global(svg) {
          width: 16px;
          height: 16px;
          display: block;
        }
        .testCard h3 { margin: 10px 0 2px; font-size: 16px; font-weight: 700; }
        .testCard small { color:#7a7a7a; font-size:12px; }
        .testBusiness { margin: 6px 0 4px; font-size: 13px; color:#4b4b4b; }
        .testStars { display:inline-block; color:#ffb400; letter-spacing:.08em; font-size:13px; margin-bottom:6px; }
        .testCard p { color:#454545; line-height:1.6; }
        .contact { background:${DARK}; color:#fff; padding:80px 0; }
        .contactGrid { display:grid; grid-template-columns:1fr 1fr; gap:24px; align-items:start; }
        .contact p { color:#c9c9c9; line-height:1.6; }
        .contact ul { list-style:none; padding:0; margin:18px 0 0; display:grid; gap:10px; }
        .contactForm { background:#252525; border:1px solid #373737; border-radius:12px; padding:18px; display:grid; gap:12px; }
        .contactForm label { display:grid; gap:6px; font-size:14px; color:#ddd; }
        .contactForm input, .contactForm textarea { width:100%; border-radius:10px; border:1px solid #4a4a4a; background:#1b1b1b; color:#fff; padding:11px 12px; font:inherit; }
        .formMessage { color:#aef5bd; margin:0; font-size:14px; }
        .finalCta { background:${ORANGE}; color:#fff; text-align:center; padding:68px 0; }
        .finalCta h2 { margin-bottom:8px; }
        .finalCta .finalCtaButton,
        .finalCta .finalCtaButton:visited {
          background: linear-gradient(135deg, #25d366 0%, #1da851 100%) !important;
          color: #ffffff !important;
          border: 2px solid rgba(255, 255, 255, 0.42) !important;
          box-shadow: 0 16px 28px rgba(0, 0, 0, 0.28), 0 0 0 5px rgba(255, 255, 255, 0.2);
          font-weight: 800;
          padding: 13px 24px;
          border-radius: 14px;
          letter-spacing: 0.01em;
          min-width: 250px;
          gap: 10px;
        }
        .finalCta .finalCtaButton :global(svg) {
          width: 20px;
          height: 20px;
        }
        .finalCta .finalCtaButton:hover {
          transform: translateY(-3px);
          filter: brightness(1.05);
          box-shadow: 0 18px 32px rgba(0, 0, 0, 0.3), 0 0 0 6px rgba(255, 255, 255, 0.24);
        }
        .footer { background:#1a1a1a; color:#d7d7d7; padding:60px 0 0; }
        .footerTopGrid { display:grid; grid-template-columns:1.25fr 1fr 1fr; gap:48px; }
        .footerBrandBox {
          width: 58px;
          height: 58px;
          border-radius: 10px;
          border: 1px solid #3a3a3a;
          background: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .footerBrandLogo {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
          object-position: center;
        }
        .footerTagline {
          margin: 14px 0 6px;
          font-size: 15px;
          color: #ffffff;
          font-weight: 600;
        }
        .footerSmallText {
          margin: 0;
          font-size: 13px;
          line-height: 1.6;
          color: #adadad;
          max-width: 360px;
        }
        .footerLocation { margin-top: 16px; }
        .footerLocation p { margin: 0; color:#b9b9b9; font-size:13px; line-height:1.5; }
        .footerNavCol, .footerContactCol { display:flex; flex-direction:column; gap:8px; }
        .footerLabel {
          margin: 0 0 2px;
          font-size: 11px;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #888;
          font-weight: 700;
        }
        .footerLinkList { display:flex; flex-direction:column; gap:9px; margin-bottom:12px; }
        .footer a { color:#e5e5e5; font-size:14px; }
        .footer a:hover { color:${ORANGE}; }
        .footerContactBtn {
          margin-top: 4px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 8px;
          padding: 10px 16px;
          color: #fff !important;
          font-weight: 600;
          width: fit-content;
          transition: .2s ease;
        }
        .footerContactBtn :global(svg) { width: 18px; height: 18px; }
        .footerWhatsBtn { background: #25D366; }
        .footerInstagramBtn { background: linear-gradient(135deg, #E1306C 0%, #833AB4 100%); }
        .footerContactBtn:hover { filter: brightness(1.06); transform: translateY(-1px); }
        .footerBottom {
          margin-top: 30px;
          padding: 16px 0;
          border-top: 1px solid #333;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          color: #929292;
          font-size: 13px;
        }
        .footerBottom p { margin: 0; }
        .revealDelay1,.revealDelay2,.revealDelay3,.revealDelay4,.revealDelay5 { opacity:0; animation: fadeIn .6s ease forwards; }
        .revealDelay2 { animation-delay:.12s; }
        .revealDelay3 { animation-delay:.2s; }
        .revealDelay4 { animation-delay:.3s; }
        .revealDelay5 { animation-delay:.4s; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @media (max-width: 1024px) {
          .navLinks { display:none; }
          .menuButton { display:block; }
          .heroGrid, .featureGrid, .contactGrid { grid-template-columns:1fr; }
          .proofGrid, .diffGrid, .planGrid { grid-template-columns:repeat(2,1fr); }
          .testGrid { grid-template-columns:repeat(2,1fr); }
          .phoneFrame { width: min(280px, 100%); }
          .footerTopGrid { grid-template-columns:1fr 1fr; gap:28px; }
          .footerContactCol { grid-column: span 2; }
        }
        @media (max-width: 680px) {
          .proofBar { padding: 14px 0; }
          .proofGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
            margin-top: 10px;
          }
          .proofItem {
            padding: 8px 6px;
            gap: 4px;
            font-size: 12px;
            line-height: 1.2;
            align-content: center;
          }
          .proofItem span { width: 22px; height: 22px; }
          .diffGrid, .planGrid, .testGrid { grid-template-columns:1fr; }
          .hero { padding-top:120px; }
          .heroSubtitle { font-size:16px; }
          .footerTopGrid { grid-template-columns:1fr; gap:24px; }
          .footerContactCol { grid-column: auto; }
          .footerBottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
}
