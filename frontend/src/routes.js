import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Pessoas from './pages/Pessoas';

function Routes() {
  return (
    <Switch>
      <Route path="/pessoas" exact component={Pessoas} />
    </Switch>
  );
}

export default Routes;
