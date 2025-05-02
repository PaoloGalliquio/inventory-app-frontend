import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import React, { Suspense, useContext } from "react";
import { appRoutes } from "./routes";
import { AuthContext, AuthProvider } from "./hooks/context/authContext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const { state } = useContext(AuthContext);

  return (
    <Suspense fallback={<h1>Cargando...</h1>}>
      <Routes location={location}>
        {appRoutes.map((route) => {
          if (route.requiresAuth && !state.isLoggedIn) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<Navigate replace to="/login" />}
              />
            );
          }
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <>
                  <route.component />
                </>
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
}

export default App;
