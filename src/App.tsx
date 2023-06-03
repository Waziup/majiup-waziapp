import LoginPage from "./pages/LoginPage";
import BillingsPage from "./pages/BillingsPage";
import CommunityPage from "./pages/CommunityPage";
import SettingsPage from "./pages/SettingsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import { DevicesProvider } from "./context/devices.context";
import SignUpPage from "./pages/SignupPage";
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
        path: "/analytics",
        element: <BillingsPage />,
    },
    {
        path: "/settings",
        element: <SettingsPage />,
    },
    {
        path: "/community",
        element: <CommunityPage />,
    },
        path: '/sign-up',
        element: <SignUpPage/>
    }
]);
function App() {
    return (
        <DevicesProvider>
            <RouterProvider router={router} />
        </DevicesProvider>
    );
}

export default App;
