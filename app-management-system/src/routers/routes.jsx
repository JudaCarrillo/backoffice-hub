import { Route, Routes } from "react-router-dom";
import { Categories } from "../pages/categories";
import { Customers } from "../pages/customers";
import { Products } from "../pages/products";
import { Suppliers } from "../pages/suppliers";
import { Users } from "../pages/users";
import { Orders } from "../pages/Orders";
import { OrderDetail } from "../pages/OrderDetail";
export function MyRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Products />} />
      <Route exact path="/products" element={<Products />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="/users" element={<Users />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/order-details" element={<OrderDetail />} />
    </Routes>
  );
}
