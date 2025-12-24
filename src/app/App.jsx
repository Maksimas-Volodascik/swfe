import { Route, Routes } from "react-router-dom";
import { PublicAccess, PrivateAccess } from "../lib/authProvider";
import Layout from "./Layout";
import Login from "./routes/login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";

function App() {
  return (
    <Routes>
      <Route element={<PublicAccess />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route element={<PrivateAccess />}>
        <Route element={<Layout />}>
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
