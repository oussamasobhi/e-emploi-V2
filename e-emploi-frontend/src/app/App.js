import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../common/Home";
import Signup from "../user/Signup"
import Login from "../user/Login"
import Layout from "../common/Layout";
import NotFound from "../common/NotFound";
import ProSignup from "../user/ProSignup";
import ResetPassword from "../user/ResetPassword";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pro/signup" element={<ProSignup />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="forgotten" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
