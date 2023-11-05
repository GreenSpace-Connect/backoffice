import { theme } from 'antd';
import { HTMLAttributes } from 'react';

type DefaultLayoutProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  withColorBg?: boolean;
};

export default function DefaultLayout(props: DefaultLayoutProps) {
  const { children, withColorBg = false, style, ...args } = props;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div
      style={{ backgroundColor: withColorBg ? colorBgContainer : '', ...style }}
      {...args}
    >
      {children}
    </div>
  );
}
