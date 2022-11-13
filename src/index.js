import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BooksList from "./components/Book/BooksList";
import BookInfo from "./components/Book/BookInfo";
import Addform from "./components/AddForm";
import BookEdit from "./components/Book/BookEdit";
import Login from "./components/Login";
import { Provider } from "react-redux";
import { configstore } from "./AthunkSore/ConfigStore";
import ErrorPage from "./components/ErrorPage";
import Signin from "./components/Signin";

const Routes = createBrowserRouter([
  {
    path: "ToDo-React/",
    element: <Login />,
  },
  {
    path: "home",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <BooksList />,
      },
      {
        path: "book/read",
        element: <BookInfo />,
      },
      {
        path: "book/addbooks",
        element: <Addform />,
      },
      {
        path: "book/:id/bookinfo",
        element: <BookInfo />,
      },
      {
        path: "book/:id/bookedit",
        element: <BookEdit />,
        loader: (error) => {
          if (!isNaN(error.params)) {
            throw new Response(
              "Sorry Page Not Found",
              { statusText: "Sorry Page Have Some Proplem " },
              { status: 404 }
            );
          }
        },
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signin",
    element: <Signin />,
  },
]);

ReactDOM.render(
  <Provider store={configstore}>
    {" "}
    <RouterProvider router={Routes} />
  </Provider>,

  document.getElementById("root")
);
