import Layout from '@/components/Layout';
import { Honeybadger, HoneybadgerErrorBoundary } from '@honeybadger-io/react'
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  Honeybadger.notify(error);
  return (
    <HoneybadgerErrorBoundary honeybadger={Honeybadger}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </HoneybadgerErrorBoundary>
  );
}

export default MyApp;