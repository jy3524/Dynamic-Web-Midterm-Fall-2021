import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Home from "./containers/Home";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
