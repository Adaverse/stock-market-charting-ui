import logo from './logo.svg';

import { ManageCompanies } from './Admin/pages/ManageCompanies/ManageCompanies';
import { ImportData } from './Admin/pages/ImportData/ImportData';
import { ManageExchange } from './Admin/pages/ManageExchange/ManageExchange';
import { Navbar } from './Admin/components/Navbar/Navbar';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";

function App() {
  return (
    <Router>
        <div>
            <Navbar/>
            
            <Switch>
                <Route exact path="/">
                    <Redirect to="/ImportData"></Redirect>
                </Route>
                <Route path="/ImportData" exact component={ImportData}></Route>
                <Route path="/ManageCompanies" exact component={ManageCompanies}></Route>
                <Route path="/ManageExchange" exact component={ManageExchange}></Route>
            </Switch>
            
        </div>
    </Router>
  );
}

export default App;
    