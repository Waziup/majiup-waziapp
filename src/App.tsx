import LoginPage from "./pages/LoginPage";
import BillingsPage from "./pages/BillingsPage";
import CommunityPage from "./pages/CommunityPage";
import SettingsPage from "./pages/SettingsPage";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LayoutComponent from "./components/Layout/Layout.component";

import SignUpPage from "./pages/SignupPage";
import DevicesPage from "./pages/DevicesPage";
import ProfilePage from "./pages/ProfilePage";
// import { ConfirmationNumberTwoTone } from "@mui/icons-material";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<LayoutComponent />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/analytics" element={<BillingsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route
          path="/devices/:id"
          loader={async ({}) => {
            return [{ id: 2 }];
          }}
          action={() => {
            return 1;
          }}
          element={<DevicesPage />}
        />
      </Route>
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
