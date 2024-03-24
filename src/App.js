import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home/index'
import Jobs from './components/Jobs/index'
import NotFound from './components/NotFound'
import JobItemDetails from './components/JobItemDetails'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
