//eslint-disable-next-line
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as routes from "routes";
import Loader from "./component/Loader";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { ENV_VAR } from "util/Constant";
import { getEnvVariableValue } from "util/CommonUtil";
import { QueryClient, QueryClientProvider } from "react-query";

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Page404 = React.lazy(() => import("./view/Page404"));
const PageLogin = React.lazy(() => import("./view/PageLogin2"));

/* eslint-disable */

function App(props: any) {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {getEnvVariableValue(ENV_VAR.VITE_SHOULD_PERSIST) === "Y" ? (
          <RoutersWithPersist {...props} />
        ) : (
          <Routers {...props} />
        )}
      </QueryClientProvider>
    </Provider>
  );
}

function Routers() {
  return (
    <Router>
      <React.Suspense fallback={<Loader />}>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path={routes.linkPageBase} element={<PageLogin />} />
          <Route path={routes.linkPageLogin} element={<PageLogin />} />
          <Route path={`${routes.linkAuthRoute}/*`} element={<DefaultLayout />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

function RoutersWithPersist(props: any) {
  return (
    <PersistGate persistor={persistor}>
      <Routers {...props} />
    </PersistGate>
  );
}

export default App;
