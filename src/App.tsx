import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/Layout";

import AllCategories from "./pages/AllCategories";
import Auth from "./pages/Auth";

function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Auth />
          </Route>
          <Route path="/login" exact>
            <Auth />
          </Route>
          <Route path="/categories" exact>
            <AllCategories />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
