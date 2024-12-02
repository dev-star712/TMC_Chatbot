import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const current = new Date().getTime();
  const dispatch = useDispatch();
  if (!userInfo || !userInfo.timestamp) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  } else if (current - userInfo.timestamp > 7 * 24 * 60 * 60 * 1000) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  } else {
    return <Outlet />;
  }
};
export default PrivateRoute;
