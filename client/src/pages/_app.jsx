import Layout from '@/components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  Honeybadger.notify(error);
  return (

    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;