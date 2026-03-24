import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GetProductsComponent from "./components/GetProductsComponent";
import AddProductComponent from "./components/AddProductComponent";
import SignUpComponent from "./components/SignUpComponent";
import SignInComponent from "./components/SignInComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import MakePaymentComponent from "./components/MakePaymentComponent";

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="App">
          {/* <NavbarComponent/> */}
          <header className="App-header">
            <h1>Sokogarden - Buy & Sell Online</h1>
          </header>

          <Routes>
            <Route path="/" element={<GetProductsComponent />} />
            <Route path="/addproduct" element={<AddProductComponent />} />
            <Route path="/signup" element={<SignUpComponent />} />
            <Route path="/signin" element={<SignInComponent />} />
            <Route path="/makepayment" element={<MakePaymentComponent />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
