import { Route, Switch, Redirect  } from "react-router-dom";
import React, { useContext } from "react";
import AllProperties from "./pages/AllProperties";
import SinglePropertyPage from "./pages/SinglePropertyPage";
import Layout from "./components/Layout/Layout";
import NewProperty from "./pages/NewProperty";
import LoginPage from "./pages/LoginPage";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Layout>
      <Switch>
        <Route path="/properties" exact>
          <AllProperties />
        </Route>
        <Route path="/properties/:id" exact>
          <SinglePropertyPage />
        </Route>
        {isLoggedIn && (
          <Route path="/new" exact>
            <NewProperty />
          </Route>
        )}
        {!isLoggedIn && (
          <Route path="/login" exact>
            <LoginPage />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/properties" exact />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
