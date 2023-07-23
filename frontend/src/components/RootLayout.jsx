import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../redux/store/store";

const RootLayout = () => {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <main>
                        <Outlet />
                    </main>
                </PersistGate>
            </Provider>
        </>
    );
};

export default RootLayout;
