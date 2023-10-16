import '@/styles/globals.css';
import { ConfigProvider, ThemeConfig } from 'antd';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

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
      Menu: {},
    },
    token: {
      fontFamily: `'Poppins', sans-serif`,
      colorPrimary: '#00b96b',
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
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ConfigProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
