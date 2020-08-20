import React, { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';

import { Root, Header } from './container/styledComponent';
// import { fetchMovieData } from './modules/movieData';
import MovieList from './container/MovieList';
import MovieFilter from './container/MovieFilter';

import 'antd/dist/antd.css';

function App() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Root>
      <Header>Movie Review App</Header>
      <MenuOutlined
        style={{
          position: 'absolute',
          right: '8px',
          top: '8px',
          fontSize: '32px',
          color: '#fff',
          cursor: 'pointer',
        }}
        onClick={() => setShowMenu(true)}
      />
      <MovieList />
      <Drawer
        title="Movie Filter"
        placement="right"
        closable={true}
        onClose={() => setShowMenu(false)}
        visible={showMenu}
        key="right"
        width={320}
      >
        <MovieFilter />
      </Drawer>
    </Root>
  );
}

export default App;
