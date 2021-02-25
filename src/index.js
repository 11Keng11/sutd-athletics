import { unstable_createRoot } from 'react-dom';
import HomePage from './containers/Homepage.js';
import ResultsPage from './containers/Resultspage.js';
import SignupPage from './containers/Signuppage.js';
import FaqPage from './containers/Faqpage.js';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";


var hist = createBrowserHistory();
unstable_createRoot(document.getElementById('root')).render(
<Router history={hist}>
  <Switch>
    <Route path="/results-page" component={ResultsPage} />
    <Route path="/signup-page" component={SignupPage} />
    <Route path="/faq-page" component={FaqPage} />
    <Route path="/scoreboard-page" component={ResultsPage} />
    <Route path="/sutd-athletics" component={HomePage} />
  </Switch>
</Router>);


