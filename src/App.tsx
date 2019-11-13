import "./scss/styles.scss";
import React, { Suspense } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import configureStore from "./store/store";

//components
import MainLayout from "./components/layout/MainLayout";
import Loader from "./components/layout/Loader";
const Homepage: React.FunctionComponent = React.lazy(
  (): Promise<any> => import("./components/pages/Homepage")
);
const AuthorPage: React.FunctionComponent = React.lazy(
  (): Promise<any> => import("./components/pages/AuthorPage")
);
const SingleArticlePage: React.FunctionComponent = React.lazy(
  (): Promise<any> => import("./components/pages/SingleArticlePage")
);
const AllArticlesPage: React.FunctionComponent = React.lazy(
  (): Promise<any> => import("./components/pages/AllArticlesPage")
);
const ErrorPage: React.FunctionComponent = React.lazy(
  (): Promise<any> => import("./components/pages/ErrorPage")
);

//redux store
//@ts-ignore
const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

const App = () => {
  console.log(123);
  return (
    <div className="app">
      <ReduxProvider store={reduxStore}>
        <Router>
          <MainLayout>
            <Suspense fallback={<Loader />}>
              <Switch>
                <Route path="/" component={Homepage} exact />
                <Route path="/author/:uid" component={AuthorPage} exact />
                <Route
                  path="/articles/:uid"
                  component={SingleArticlePage}
                  exact
                />
                <Route path="/articles" component={AllArticlesPage} exact />

                <Route component={ErrorPage} />
              </Switch>
            </Suspense>
          </MainLayout>
        </Router>
      </ReduxProvider>
    </div>
  );
};

export default App;
