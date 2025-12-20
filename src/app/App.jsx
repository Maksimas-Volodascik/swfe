import { Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
export default App;
