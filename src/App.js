import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { withState } from './state'

import Map from './pages/Map'
import Table from './pages/Table'
import Content from './components/Content';
import Loader from './components/Loader';
import Header from './components/Header';

function App({ loading }) {
  if (loading) return <Loader />;

  return (
    <>
      <Router basename="/">
        <>
          <Header />
          <Content fluid>
            <Switch>
              <Route exact path="/">
                <Map />
              </Route>
              <Route path="/tableau">
                <Table />
              </Route>
            </Switch>
          </Content>
        </>
      </Router>
    </>
  );
}

export default withState(App);
