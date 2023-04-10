import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPage from "./components/pages/adminPage";
import CartPage from "./components/pages/cartPage";
import MainPage from "./components/pages/mainPage";
import NotFoundPage from "./components/pages/notFoundPage";
import CatalogRouter from "./components/routers/catalogRouter";
import Breadcrumbs from "./components/ui/breadcrumbs";
import Footer from "./components/ui/footer";
import Header from "./components/ui/header";
import { HOMEPAGE } from "./constats";
import ClickCatcherProvider from "./hooks/useClickCatcher";
import WindowDimensionsProvider from "./hooks/useWindowDimensions";
import AppLoader from "./store/appLoader";

/** Основной компонент приложения. */
function App(): React.ReactElement {
    return (
        <>
            <AppLoader>
                <WindowDimensionsProvider>
                    <ClickCatcherProvider>
                        <div className="wrapper">
                            <Header />
                            <main>
                                <Breadcrumbs />
                                <Switch>
                                    <Route
                                        path={HOMEPAGE + "catalog/:barcode?"}
                                        component={CatalogRouter}
                                    />
                                    <Route
                                        path={HOMEPAGE + "cart/"}
                                        component={CartPage}
                                    />
                                    <Route
                                        path={HOMEPAGE + "admin/"}
                                        component={AdminPage}
                                    />
                                    <Route
                                        path={HOMEPAGE + "404/"}
                                        component={NotFoundPage}
                                    />
                                    <Route
                                        path={HOMEPAGE}
                                        exact
                                        component={MainPage}
                                    />
                                    <Redirect to={HOMEPAGE + "404/"} />
                                </Switch>
                            </main>
                            <Footer />
                        </div>
                    </ClickCatcherProvider>
                </WindowDimensionsProvider>
            </AppLoader>
            <ToastContainer />
        </>
    );
}

export default App;
