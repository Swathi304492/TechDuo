import { Routes, Route } from "react-router-dom";
import UserProfile from "../pages/UserProfile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
}
