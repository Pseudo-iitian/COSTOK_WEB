import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";
import Dashboard from "./components/Dashboard"; // Updated path

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Signup />} />

          {/* Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
