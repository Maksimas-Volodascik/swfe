import { Route, Routes } from "react-router-dom";
import { PublicAccess, PrivateAccess } from "../lib/authProvider";
import Layout from "./Layout";
import Login from "./routes/login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import StudentList from "./routes/StudentList";

function App() {
  return (
    <Routes>
      <Route element={<PublicAccess />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<PrivateAccess />}>
        <Route element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<StudentList />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
