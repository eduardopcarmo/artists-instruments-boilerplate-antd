import React from 'react';

import Artists from '../lists/Artists';
import AddArtist from '../forms/AddArtist';
import AddInstrument from '../forms/AddInstrument';
import Title from '../layout/Title';

import { Layout } from 'antd';

const { Content } = Layout;

const Home = () => {
  return (
    <Content className="App">
      <Title />
      <AddArtist />
      <AddInstrument />
      <Artists />
    </Content>
  );
};

export default Home;
