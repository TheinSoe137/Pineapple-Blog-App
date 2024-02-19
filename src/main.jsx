import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import {
  Login,
  Signup,
  AddPost,
  AllPosts,
  EditPost,
  Home,
  Post,
} from "./assets/components/pages/pages.js";
import "./index.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { Protected, CTAs } from "./assets/index.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path=""
        element={
          <Protected authentication={false}>
            <Home />
          </Protected>
        }
      >
        <Route
          path=""
          element={
            <Protected authentication={false}>
              <CTAs />
            </Protected>
          }
        />
        <Route
          path="login"
          element={
            <Protected authentication={false}>
              <Login />
            </Protected>
          }
        />
        <Route
          path="signup"
          element={
            <Protected authentication={false}>
              <Signup />
            </Protected>
          }
        />
      </Route>

      <Route
        path="all-posts"
        element={
          <Protected authentication={true}>
            <AllPosts />
          </Protected>
        }
      />
      <Route
        path="add-post"
        element={
          <Protected authentication={true}>
            <AddPost />
          </Protected>
        }
      />
      <Route path="edit-post/:slug" element={<EditPost />} />
      <Route path="posts/:slug" element={<Post />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
