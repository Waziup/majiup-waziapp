import LoginPage from "./pages/LoginPage";
import BillingsPage from "./pages/BillingsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import DashboardPage from "./pages/DashboardPage";
const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/dashboard",
        element: <DashboardPage />,
    },
    {
        path: "/billings",
        element: <BillingsPage />,
    },
    {
        path: "/products",
        element: <ProductsPage />,
    },
    {
        path: "/invoices",
        element: <ProductsPage />,
    },
    {
        path: "/reports",
        element: <ReportsPage />,
    },
    {
        path: "/settings",
        element: <SettingsPage />,
    },
]);
function App() {
    return (
        <>
            <RouterProvider router={router} />
            {/* <GridComponent /> */}
            {/* <BillingsPage /> */}
            {/* <ReportsPage /> */}
            {/* <SettingsPage /> */}
            {/* <LoginPage /> */}
        </>
    );
}

export default App;
