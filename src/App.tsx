import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Expiry from "./components/Expiry";
import AcceptQuote from "./components/AcceptQuote";
import PayQuote from "./components/PayQuote";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/payin/:uuid" element={<AcceptQuote />} />
      <Route path="/payin/:uuid/pay" element={<PayQuote />} />
      <Route path="/payin/:uuid/expired" element={<Expiry />} />
    </Routes>
  );
}

export default App;
