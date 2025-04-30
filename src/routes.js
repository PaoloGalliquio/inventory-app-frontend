import { lazy } from "react";

const Login = lazy(() => import("./pages/Login"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Users = lazy(() => import("./pages/Users"));
const Reports = lazy(() => import("./pages/Reports"));
const NotFound = lazy(() => import("./pages/NotFound"));

export const appRoutes = [
  {
    path: "/",
    component: Inventory,
    requiresAuth: true,
  },
  {
    path: "/login",
    component: Login,
    requiresAuth: false,
  },
  {
    path: "/inventory",
    component: Inventory,
    requiresAuth: true,
  },
  {
    path: "/users",
    component: Users,
    requiresAuth: true,
  },
  {
    path: "/reports",
    component: Reports,
    requiresAuth: true,
  },
  {
    path: "*",
    component: NotFound,
    requiresAuth: true,
  },
];