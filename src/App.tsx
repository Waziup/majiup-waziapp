import LoginPage from "./pages/LoginPage";
import BillingsPage from "./pages/BillingsPage";
import CommunityPage from "./pages/CommunityPage";
import SettingsPage from "./pages/SettingsPage";
import {  Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import { DevicesProvider } from "./context/devices.context";
import LayoutComponent from "./components/Layout/Layout.component";

import SignUpPage from "./pages/SignupPage";
import DevicesPage from "./pages/DevicesPage";
// import { ConfirmationNumberTwoTone } from "@mui/icons-material";
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
                    <Route
                        path="/devices/:id"
                        loader={async ({params})=>{
                            console.log('Parameters passed to',params.id);
                            return [{id:2}]
                        }}
                        action={(data)=>{
                            console.log('Data received in action',data)
                            return 1;
                        }}
                        element={<DevicesPage/>}
                    />
                </Route>
                <Route path="/signup" element={<SignUpPage/>} />
            </Routes>
        </DevicesProvider>
    );
}

export default App;
