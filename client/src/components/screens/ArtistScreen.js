import React from 'react';

import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';

import { Link } from 'react-router-dom';

import { GET_ARTIST_BY_ID } from '../../queries';

import { Layout } from 'antd';

import Artist from '../listItems/Artist';
import AddArtist from '../forms/AddArtist';
import AddInstrument from '../forms/AddInstrument';
import Title from '../layout/Title';

const { Content } = Layout;

const ArtistScreen = () => {
  const { artistId } = useParams();
  const { loading, error, data } = useQuery(GET_ARTIST_BY_ID, {
    variables: { id: artistId },
  });

  if (loading) return 'Loading...';
  if (error) return `Errror! ${error.message}`;

  return (
    <Content className="App">
      <Title />
      <AddArtist />
      <AddInstrument />
      <Artist />
      <div>{artistId}</div>
      <Link to={`/`}>go back home</Link>
    </Content>
  );
};

export default ArtistScreen;
