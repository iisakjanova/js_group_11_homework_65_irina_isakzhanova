import {BrowserRouter, Switch, Route} from "react-router-dom";

import Pages from "./containers/Pages/Pages";
import Admin from "./containers/Admin/Admin";
import Layout from "./components/UI/Layout/Layout";

const App = () => (
    <div className="App">
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/" exact component={Pages}/>
                    <Route path="/pages/admin" exact component={Admin}/>
                    <Route path="/pages/:id" component={Pages}/>
                    <Route render={() => <h1>Not found</h1>}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    </div>
);

export default App;
