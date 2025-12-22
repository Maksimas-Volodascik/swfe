import { Route, Routes } from "react-router-dom";
import Login from "./routes/login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import { PublicAccess, PrivateAccess } from "../lib/authProvider";

function App() {
  return (
    <Routes>
      <Route element={<PublicAccess />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route element={<PrivateAccess />}>
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}
export default App;
