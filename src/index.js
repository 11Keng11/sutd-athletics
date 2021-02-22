import ReactDom from 'react-dom';
import HomePage from './containers/Homepage.js';
import ResultsPage from './containers/Resultspage.js';
import SignupPage from './containers/Signuppage.js';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";


var hist = createBrowserHistory();
ReactDom.render(
<Router history={hist}>
  <Switch>
    <Route path="/results-page" component={ResultsPage} />
    <Route path="/signup-page" component={SignupPage} />
    <Route path="/" component={HomePage} />
  </Switch>
</Router>, document.getElementById('root'));


