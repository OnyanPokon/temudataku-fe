import { useStyle } from '@/hooks';
import { ConfigProvider as StyleProvider } from 'antd';
import PropTypes from 'prop-types';

export default function AntdConfigProviders({ children }) {
  const { styles } = useStyle();
  return (
    <StyleProvider
      theme={{
        token: {
          fontFamily: 'Plus Jakarta Sans',
          colorPrimary: '#08b06d',
          colorInfo: '#08b06d',
          colorSuccess: '#1677ff'
        }
      }}
      button={{
        className: styles.customButton
      }}
      drawer={{
        padding: 0
      }}
    >
      {children}
    </StyleProvider>
  );
}
AntdConfigProviders.propTypes = {
  children: PropTypes.node.isRequired
};
