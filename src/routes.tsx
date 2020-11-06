import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Products from './pages/Products'
import Product from './pages/Product'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Products}  exact />
        <Route path="/new" component={Product}  />
        <Route path="/edit/:id" component={Product}  />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
