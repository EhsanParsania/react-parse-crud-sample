import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './routes/Home';
import Auth from './routes/Auth';
import SlProjectMock from './routes/mockSlProject';
import Parydise from './routes/parydise';

export default function App() {


  return (
    <Router>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/sl">
          <SlProjectMock />
        </Route>
        <Route path="/parydise">
          <Parydise />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}