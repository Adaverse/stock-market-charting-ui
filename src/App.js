import logo from './logo.svg';

import { ManageCompanies } from './Admin/pages/ManageCompanies/ManageCompanies';
import { ImportData } from './Admin/pages/ImportData/ImportData';
import { ManageExchange } from './Admin/pages/ManageExchange/ManageExchange';
import { ManageSectors } from './Admin/pages/ManageSectors/ManageSectors';
import { Navbar } from './Admin/components/Navbar/Navbar';

import { NavbarUser } from './User/components/Navbar/NavbarUser';
import { CompareCompanies } from './User/pages/CompareCompanies/CompareCompanies';
import { CompareSecors } from "./User/pages/CompareSectors/CompareSectors";
import { IpoDetails } from './User/pages/IpoDetails/IpoDetails';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
import { useState } from 'react';

function App() {
    const [isAdmin, setIsAdmin] = useState(true);
  return (
    <Router>
        <button onClick={() => setIsAdmin(!isAdmin)}>
            Switch!
        </button>
      <div>
        {isAdmin ? <div>
          <Navbar />

          <Switch>
            <Route exact path="/">
              <Redirect to="/ImportData"></Redirect>
            </Route>
            <Route path="/ImportData" exact component={ImportData}></Route>
            <Route
              path="/ManageCompanies"
              exact
              component={ManageCompanies}
            ></Route>
            <Route
              path="/ManageExchange"
              exact
              component={ManageExchange}
            ></Route>
            <Route
              path="/ManageSectors"
              exact
              component={ManageSectors}
            ></Route>
          </Switch>
        </div>
        :
        <div>
          <NavbarUser />
          <Switch>
            <Route exact path="/">
              <Redirect to="/IpoDetails"></Redirect>
            </Route>
            <Route path="/IpoDetails" exact component={IpoDetails}></Route>
            <Route
              path="/CompareCompanies"
              exact
              component={CompareCompanies}
            ></Route>
            <Route
              path="/CompareSecors"
              exact
              component={CompareSecors}
            ></Route>
          </Switch>
        </div>}
      </div>
    </Router>
  );
}

export default App;
    