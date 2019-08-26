import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Pessoas from './pages/Pessoas';
import Imoveis from './pages/Imoveis';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Pessoas} />
      <Route path="/:id" exact component={Imoveis} />
    </Switch>
  );
}

export default Routes;
