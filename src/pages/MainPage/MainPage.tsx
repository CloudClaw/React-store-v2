import React from 'react';

import 'antd/dist/antd.css';

import { Layout } from 'antd';
import { Content } from '../../components/Content/Content';

export const MainPage: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content />
    </Layout>
  );
};
