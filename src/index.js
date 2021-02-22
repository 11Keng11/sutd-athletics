import { unstable_createRoot } from 'react-dom';
import HomePage from './containers/Homepage.js';
import ResultsPage from './containers/Resultspage.js';
import SignupPage from './containers/Signuppage.js';
import UploadsPage from './containers/Uploadpage.js';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";


var hist = createBrowserHistory();
unstable_createRoot(document.getElementById('root')).render(
<Router history={hist}>
  <Switch>
    <Route path="/results-page" component={ResultsPage} />
    <Route path="/signup-page" component={SignupPage} />
    <Route path="/upload-page" component={UploadsPage} />
    <Route path="/" component={HomePage} />
  </Switch>
</Router>);


