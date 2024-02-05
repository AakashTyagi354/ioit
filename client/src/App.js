import "./App.css";
import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Navbar } from "./components/Navbar";
function App() {
  return (
    <>
      <Routers>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Routers>
    </>
  );
}

export default App;
