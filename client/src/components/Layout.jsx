import Navbar from './Navbar';
import Head from 'next/head';
import { RetroGrid } from '../components/RetroGrids';
import Script from 'next/script'; // Script modulini import qilamiz

const Layout = ({ children }) => {
  return (
    <div className="relative">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Nurbek Aliqo'ziyev — tajribali Full-stack dasturchi. React, Node.js, TypeScript va zamonaviy web texnologiyalar bo‘yicha ekspert." />
        <meta name="keywords" content="Nurbek Aliqo'ziyev, Nurbek Aliqoziyev, Nurbek ldm, Nurbek 2005, Nurbek 2255, Nurbek L1GHTDreaM, Web sayt yasash, Sayt yasash, Sayt yasash hizmati, Front-end, Nurbek ,Nurbek Full-stack Developer, React, Node.js, TypeScript, Web Developer, JavaScript, Frontend Developer, Backend Developer, Software Engineer, Web Development, Programming, UI/UX, API Development, SEO, Next.js, Express.js, PostgreSQL" />
        <meta name="author" content="Nurbek Aliqo'ziyev" />
        <meta name="generator" content="Nurbek Aliqo'ziyev" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="nurbek-logo.svg" />
        <meta name="application-name" content="Nurbek Aliqo'ziyev" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Nurbek Aliqo'ziyev" />
        <link rel="apple-touch-icon" href="nurbek-logo.svg" />
        <link rel="icon" type="image/svg+xml" href="nurbek-logo.svg" />
        <link rel="mask-icon" href="nurbek-logo.svg" color="#000000" />
        <link rel="shortcut icon" href="nurbek-logo.svg" />
        <meta itemprop='image' content='nurbek-logo.svg' />
        <link rel='icon' type='image/png' sizes='32x32' href='nurbek-logo.svg' />
        <link rel="apple-touch-icon" sizes="57x57" href="nurbek-logo.svg" />
        <link rel="apple-touch-icon" sizes="72x72" href="nurbek-logo.svg" />
        <link rel="apple-touch-icon" sizes="76x76" href="nurbek-logo.svg" />
        <link rel="apple-touch-icon" sizes="114x114" href="nurbek-logo.svg" />
        <link rel="apple-touch-icon" sizes="120x120" href="nurbek-logo.svg" />
        <link rel="apple-touch-icon" sizes="144x144" href="nurbek-logo.svg" />
        <link rel="apple-touch-icon" sizes="152x152" href="nurbek-logo.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="nurbek-logo.svg" />
        <link rel="canonical" href="https://nurbek.codes" />
        <link rel="manifest" href="manifest.json" />
        <meta property="og:title" content="Nurbek Aliqo'ziyev | Full-stack Developer" />
        <meta property="og:description" content="Professional Full-stack developer specializing in React, Next, Node.js, and TypeScript." />
        <meta property="og:image" content="https://nurbek.codes/nurbek-logo.svg" />
        <meta property="og:url" content="https://nurbek.codes/" />
        <meta property="og:site_name" content="Nurbek Aliqo'ziyev" />
        <meta property="og:locale" content="uz_UZ" />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nurbek Aliqo'ziyev | Full-stack Developer" />
        <meta name="twitter:description" content="Professional Full-stack developer specializing in React, Node.js, and TypeScript." />
        <meta name="twitter:image" content="https://nurbek.codes/nurbek-logo.svg" />
        <link rel="icon" href="assets/nurbek-logo.svg" />
      </Head>
      
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-KFR95C2EHJ"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KFR95C2EHJ');
        `}
      </Script>

      <Navbar />
      <main className="relative h-screen">
        <RetroGrid />
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
