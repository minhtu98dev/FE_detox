import { createBrowserRouter } from "react-router-dom";

import {
  ProductDetailPage,
  HomePage,
  ProductListPage,
  BrandPage,
  ContactPage,
  CartPage,
  MediaPage,
  ForgotPasswordPage,
  CheckoutPage,
} from "../Pages";

import { HomeTemplate } from "@/Templates";

import Login from "@/Pages/Login";
import Register from "@/Pages/Register";
import Search from "@/Pages/Search";

import { Terms } from "@/Components/Tems/Terms";
import { Shopping } from "@/Components/Shopping/Shopping";
import { PaymentsMethod } from "@/Components/Payments/Payments";
import { Shipping } from "@/Components/Shipping/Shipping";
import { Return } from "@/Components/Return/Return";
import { Privacy } from "@/Components/Privacy/Privacy";

// ! Admin Pages
import { AdminCustomer, AdminOrder, AdminProduct } from "@/Pages/Admin";

import Admin from "@/dashboard/admin";

import CreatePassword from "@/Pages/CreatePassword";

import NewPaginate from "@/Components/New/NewPage";

import OrderUser from "@/Pages/Order";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeTemplate,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "/products",
        element: <ProductListPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/brand",
        element: <BrandPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/media",
        element: <MediaPage />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/shopping",
        element: <Shopping />,
      },
      {
        path: "/payments-method",
        element: <PaymentsMethod />,
      },
      {
        path: "/shipping",
        element: <Shipping />,
      },
      {
        path: "/return",
        element: <Return />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/NewPaginate/:uuid",
        element: <NewPaginate />,
      },
      {
        path: "/orderUser/:email",
        element: <OrderUser />,
      },
    ],
  },
  {
    path: "/admin/",
    Component: Admin,
    children: [
      {
        path: "order",
        element: <AdminOrder />,
      },
      {
        path: "customer",
        element: <AdminCustomer />,
      },
      {
        path: "product",
        element: <AdminProduct />,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/search",
    Component: Search,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/createPassword/:mail",
    Component: CreatePassword,
  },
]);

export default router;
