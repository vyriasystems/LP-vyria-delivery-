import Image from "next/image";
import Link from "next/link";
import { Syne } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap"
});

export default function PrivacidadePage() {
  const adminWhatsapp = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "";
  const adminEmail = process.env.ADMIN_EMAIL || "vyriasystems@gmail.com";
  const whatsappHref = adminWhatsapp ? `https://wa.me/${adminWhatsapp}` : "#";

  return (
    <div className="privacyPage">
      <header className="privacyNav">
        <Link href="/" aria-label="Voltar para a pagina inicial">
          <Image src="/logo.png" alt="Vyria Delivery" width={48} height={48} className="privacyLogo" />
        </Link>
        <Link href="/" className="backLink">← Voltar</Link>
      </header>

      <main className="privacyContent">
        <h1 className={syne.className}>Politica de Privacidade</h1>
        <p className="updatedAt">Ultima atualizacao: Abril de 2026</p>

        <section>
          <h2>1. Quem somos</h2>
          <p>
            A Vyria Delivery e uma plataforma de cardapio digital e gestao de pedidos para estabelecimentos de alimentacao,
            desenvolvida e operada pela Vyria Systems, com sede em Senador Canedo - GO, Brasil.
          </p>
        </section>

        <section>
          <h2>2. Quais dados coletamos</h2>
          <p>Dados fornecidos pelo lojista no cadastro:</p>
          <ul>
            <li>Nome do estabelecimento</li>
            <li>Email e senha (autenticacao via Supabase Auth)</li>
            <li>Telefone (WhatsApp)</li>
            <li>Endereco do estabelecimento</li>
          </ul>
          <p>Dados gerados pelo uso da plataforma:</p>
          <ul>
            <li>Pedidos realizados pelos clientes finais (nome, telefone, endereco de entrega)</li>
            <li>Produtos e categorias cadastrados</li>
            <li>Configuracoes da loja (horarios, taxas, aparencia)</li>
            <li>Logs de uso das funcionalidades de IA</li>
          </ul>
          <p>Dados tecnicos coletados automaticamente:</p>
          <ul>
            <li>Endereco IP</li>
            <li>Tipo de dispositivo e navegador</li>
            <li>Paginas acessadas e tempo de sessao</li>
          </ul>
        </section>

        <section>
          <h2>3. Como usamos os dados</h2>
          <ul>
            <li>Operar e melhorar a plataforma Vyria Delivery</li>
            <li>Processar e exibir pedidos para o lojista</li>
            <li>Enviar notificacoes sobre a conta e a assinatura</li>
            <li>Gerar relatorios e metricas para o lojista</li>
            <li>Garantir a seguranca e prevenir fraudes</li>
            <li>Cumprir obrigacoes legais</li>
          </ul>
          <p>
            Nao vendemos, alugamos nem compartilhamos seus dados com terceiros para fins publicitarios.
          </p>
        </section>

        <section>
          <h2>4. Compartilhamento de dados</h2>
          <p>Seus dados podem ser compartilhados apenas com:</p>
          <ul>
            <li><strong>Supabase</strong> — infraestrutura de banco de dados e autenticacao</li>
            <li><strong>Vercel</strong> — hospedagem da aplicacao</li>
            <li><strong>OpenAI</strong> — processamento das funcionalidades de IA (descricoes e imagens de produtos)</li>
            <li><strong>Evolution API / WhatsApp</strong> — automacoes de mensagens (quando ativadas pelo lojista)</li>
            <li>Autoridades legais, quando exigido por lei</li>
          </ul>
        </section>

        <section>
          <h2>5. Armazenamento e seguranca</h2>
          <p>
            Os dados sao armazenados em servidores seguros da Supabase (infraestrutura AWS). Utilizamos criptografia em
            transito (HTTPS/TLS) e em repouso. O acesso aos dados e restrito por autenticacao e politicas de seguranca
            em nivel de linha (RLS).
          </p>
        </section>

        <section>
          <h2>6. Dados dos clientes finais</h2>
          <p>
            Os dados dos clientes que realizam pedidos (nome, telefone, endereco) sao coletados pelo lojista atraves da
            plataforma. O lojista e o responsavel pelo tratamento adequado desses dados conforme a LGPD.
          </p>
        </section>

        <section>
          <h2>7. Seus direitos (LGPD)</h2>
          <p>
            Em conformidade com a Lei Geral de Protecao de Dados (Lei 13.709/2018), voce tem direito a:
          </p>
          <ul>
            <li>Confirmar a existencia de tratamento dos seus dados</li>
            <li>Acessar seus dados</li>
            <li>Corrigir dados incompletos ou desatualizados</li>
            <li>Solicitar a exclusao dos seus dados</li>
            <li>Revogar o consentimento</li>
          </ul>
          <p>
            Para exercer esses direitos, entre em contato pelo WhatsApp ou email informados abaixo.
          </p>
        </section>

        <section>
          <h2>8. Cookies</h2>
          <p>
            Utilizamos cookies essenciais para manter sua sessao autenticada na plataforma. Nao utilizamos cookies de
            rastreamento ou publicidade.
          </p>
        </section>

        <section>
          <h2>9. Retencao de dados</h2>
          <p>
            Os dados sao mantidos enquanto a conta estiver ativa. Apos o cancelamento, os dados sao removidos em ate 90 dias,
            salvo obrigacao legal de retencao.
          </p>
        </section>

        <section>
          <h2>10. Contato</h2>
          <p>Em caso de duvidas sobre esta politica ou sobre o tratamento dos seus dados:</p>
          <p className="contactLine">WhatsApp: <a href={whatsappHref} target="_blank" rel="noreferrer">{adminWhatsapp || "Nao informado"}</a></p>
          <p className="contactLine">Email: <a href={`mailto:${adminEmail}`}>{adminEmail}</a></p>
          <p className="contactLine">Endereco: Senador Canedo - GO, Brasil</p>
        </section>
      </main>

      <footer className="privacyFooter">
        <p>
          © 2026 Vyria Delivery · <Link href="/">Voltar para o inicio</Link>
        </p>
      </footer>

      <style>{`
        .privacyPage {
          min-height: 100vh;
          background: #fff;
          color: #1a1a1a;
          font-family: var(--font-inter), sans-serif;
        }
        .privacyNav {
          max-width: 1040px;
          margin: 0 auto;
          padding: 20px 24px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .privacyLogo {
          width: 48px;
          height: 48px;
          object-fit: contain;
        }
        .backLink {
          color: #1a1a1a;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
        }
        .backLink:hover { color: #E8521A; }
        .privacyContent {
          max-width: 720px;
          margin: 0 auto;
          padding: 16px 24px 56px;
        }
        .privacyContent h1 {
          margin: 8px 0 6px;
          font-size: 36px;
          line-height: 1.1;
          color: #1a1a1a;
        }
        .updatedAt {
          margin: 0 0 24px;
          font-size: 14px;
          color: #888;
        }
        .privacyContent section { margin-top: 40px; }
        .privacyContent h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
        }
        .privacyContent p, .privacyContent li {
          font-size: 15px;
          line-height: 1.8;
          color: #444;
        }
        .privacyContent p { margin: 12px 0 0; }
        .privacyContent ul {
          margin: 8px 0 0;
          padding-left: 20px;
        }
        .contactLine { margin-top: 6px; }
        .privacyPage a {
          color: #E8521A;
          text-decoration: none;
        }
        .privacyPage a:hover { text-decoration: underline; }
        .privacyFooter {
          border-top: 1px solid #e9e9e9;
          padding: 18px 24px 28px;
          text-align: center;
        }
        .privacyFooter p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }
        @media (max-width: 680px) {
          .privacyNav { padding: 16px 16px 10px; }
          .privacyContent { padding: 12px 16px 42px; }
          .privacyContent h1 { font-size: 30px; }
        }
        @media print {
          .privacyPage {
            background: #fff !important;
            color: #000 !important;
          }
          .privacyNav, .privacyFooter {
            border: 0;
            padding-left: 0;
            padding-right: 0;
          }
          .privacyPage a {
            color: #000 !important;
            text-decoration: underline;
          }
        }
      `}</style>
    </div>
  );
}
