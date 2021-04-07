import React, { useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Dashboard, Login, Register, Detail, Search, ShoppingCart, PlaceOrder } from './views'
import { Redirect } from 'react-router-dom'
import { useSelector } from './state/hooks'
import { useDispatch } from 'react-redux'
import { getShoppingCart } from './state/shoppingCart/slice'

const PrivateRoute = ({ compoment, isAuthenticated, ...rest }) => {
  const routeComponent = (props) => {
    return isAuthenticated ? (
      React.createElement(compoment, props)
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    )
  }
  return <Route render={routeComponent} {...rest} />
}


function App() {
  const jwt = useSelector(state => state.user.token)
  const dispatch = useDispatch()

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt))
    }
  }, [jwt])

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/detail/:touristRouteId" component={Detail} />
          <Route path="/Search/:keywords?" component={Search} />
          <PrivateRoute isAuthenticated={jwt !== null} path="/shoppingCart" compoment={ShoppingCart} />
          <PrivateRoute isAuthenticated={jwt !== null} path="/placeorder" compoment={PlaceOrder} />
          <Route render={() => <h1>404 not found 页面去火星了！</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
