import { Route, Routes } from "react-router-dom";

import { ShowBurger, Header } from "@/components";
import { Cart, Home, NotFound } from "@/pages";
import "@/scss/app.scss";

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/burger/:id" element={<ShowBurger />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
