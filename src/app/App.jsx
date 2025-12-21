import { Route, Routes } from "react-router-dom";
import Login from "./routes/login";
import Register from "./routes/register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/*<Route path="/register" element={<Register />} />*/}
    </Routes>
  );
}
export default App;
