import { Navigate, Route, Routes } from "react-router-dom";
import { GuardRoute } from "../../guards/GuardRoute";
import { useStore } from "../../store/StoreProvider";
import { HomePage } from "../pages/HomePage";

export const AppRoutes = () => {
  const { auth } = useStore();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuardRoute auth={auth}>
            <Navigate to={"/app/home"} />
          </GuardRoute>
        }
      />
      <Route
        path="/home"
        element={
          <GuardRoute auth={auth}>
            <HomePage />
          </GuardRoute>
        }
      />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
