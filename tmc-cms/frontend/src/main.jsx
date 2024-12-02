import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import HomeHeroContentDetailScreen from "./screens/HomeHeroContentDetailScreen.jsx";
import AboutUsHomeBannersDetailScreen from "./screens/AboutUsHomeBannersDetailScreen.jsx";
import NewsDetailScreen from "./screens/NewsDetailScreen.jsx";
import ReviewDetailScreen from "./screens/ReviewDetailScreen.jsx";
import VideoDetailScreen from "./screens/VideoDetailScreen.jsx";
import TeamDetailScreen from "./screens/TeamDetailScreen.jsx";
import KnowledgeBaseScreen from "./screens/KnowledgeBaseScreen.jsx";
import UserManagementScreen from "./screens/UserManagementScreen.jsx";
import NewsIndexScreen from "./screens/NewsIndexScreen.jsx";
import ReviewIndexScreen from "./screens/ReviewIndexScreen.jsx";
import VideoIndexScreen from "./screens/VideoIndexScreen.jsx";
import ContentScreen from "./screens/ContentScreen.jsx";

import { useLoadAllMutation } from "./slices/contentApiSlice";

function Main() {
  const { userInfo } = useSelector((state) => state.auth);
  const [loadAll] = useLoadAllMutation();
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result_contents = await loadAll();
      setContents(result_contents.data.contents);
    };
    fetchData();
  }, []);

  return (
    <React.StrictMode>
      <RouterProvider router={getContentRouter(contents, userInfo)} />
    </React.StrictMode>
  );
}

function getContentRouter(contents, userInfo) {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>
        <Route path="/content" element={<PrivateRoute />}>
          <Route
            path="/content/0-0-0"
            element={<HomeHeroContentDetailScreen pageId="0-0-0" />}
          />
          <Route
            path="/content/0-0-1"
            element={<AboutUsHomeBannersDetailScreen pageId="0-0-1" />}
          />
          {contents.map((content) => (
            <Route
              key={content._id}
              path={`/content/0-${content.page}-0`}
              element={
                <ContentScreen
                  pageId={`0-${content.page}-0`}
                  name={content.title}
                />
              }
            />
          ))}
          <Route path="/content/1-0" element={<NewsIndexScreen />} />
          <Route path="/content/news/:pageId" element={<NewsDetailScreen />} />
          <Route path="/content/1-1" element={<ReviewIndexScreen />} />
          <Route
            path="/content/review/:pageId"
            element={<ReviewDetailScreen />}
          />
          <Route path="/content/1-2" element={<VideoIndexScreen />} />
          <Route
            path="/content/video/:pageId"
            element={<VideoDetailScreen />}
          />
          <Route path="/content/2" element={<TeamDetailScreen pageId="2" />} />
          <Route path="/content/3" element={<KnowledgeBaseScreen />} />
          {
            userInfo && userInfo.super == true && <Route path="/content/4" element={<UserManagementScreen />} />
          }
          <Route path="/content/*" element={<Navigate to="/content" />} />
        </Route>
      </Route>
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Main />
  </Provider>
);
