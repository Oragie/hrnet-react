import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateEmployee from "./pages/createEmployee/createEmployee";
import EmployeeList from "./pages/employeeList/employeeList";
import NotFound from "./pages/notFound/404";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<CreateEmployee />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
