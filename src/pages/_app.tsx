import store from '@/services/redux/store';
import '@/styles/globals.css';
import { ConfigProvider, ThemeConfig } from 'antd';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  /**
   * Ant Design Theme COnfiguration
   */
  const theme: ThemeConfig = {
    components: {
      Collapse: {
        headerPadding: '1rem 0 0',
        contentPadding: 0,
      },
    },
    token: {
      fontFamily: `'Poppins', sans-serif`,
      colorPrimary: '#03AB0E',
      fontSize: 12,
      borderRadius: 4,
    },
  };

  /**
   * React Query Configuration
   */
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
    },
  });

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={theme}>
            {getLayout(<Component {...pageProps} />)}
          </ConfigProvider>
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
}
