import React from 'react';
import styles from './App.module.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Dashboard, Login, Register, Detail, Search } from './views'


function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/detail/:touristRouteId" component={Detail} />
          <Route path="/Search/:keywords?" component={Search} />
          <Route render={() => <h1>404 not found 页面去火星了！</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
