import React, { Fragment } from 'react';

import Header from './components/Header';
import Container from './components/Container';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <Fragment>
      <Header />
      <Container>
      <Outlet/>
      </Container>
    </Fragment>
  );
};

export default App;
