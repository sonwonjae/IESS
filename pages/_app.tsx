import type { AppProps } from 'next/app';
import { GlobalStyles } from '../pages_styles/Global.styles';
import { wrapper } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
