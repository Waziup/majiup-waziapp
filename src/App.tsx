import LoginPage from "./pages/LoginPage";
import BillingsPage from "./pages/BillingsPage";
import CommunityPage from "./pages/CommunityPage";
import SettingsPage from "./pages/SettingsPage";
import {  Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import { DevicesProvider } from "./context/devices.context";
import LayoutComponent from "./components/Layout/Layout.component";

function App() {
    return (
        <DevicesProvider>
            <Routes>
                <Route path="/" element={ <LoginPage/> }/>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route element={<LayoutComponent />} >
                    <Route path="/analytics" element={<BillingsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/community" element={<CommunityPage/>} />
                </Route>
            </Routes>
        </DevicesProvider>
    );
}

export default App;
