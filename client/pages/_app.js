import { Provider } from "react-redux";
import store from "../redux/store/store";
import DashboardLayout from "../components/layout/DashboardLayout";
import Layout from "../components/layout/Layout";
import "../styles/custom.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  if (Component.DashboardLayout) {
    return (
      <Provider store={store}>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </Provider>
    );
  } else if (Component.noLayout) {
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  } else {
    return (
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
}

export default MyApp;
