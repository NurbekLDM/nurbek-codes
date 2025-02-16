import { Suspense } from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./App.css";
import HomePage from  "./pages/Home"
import AboutPage from "./pages/About";



const routes = [
    {
      path: "/",
      element: <HomePage />,
      children: [
        {path: "about", element: <AboutPage />},
      ]
    },
]

const router = createBrowserRouter(routes, {
  future: {
      v7_normalizeFormMethod: true,
  },
});

function App() {
  return (
    <Suspense fallback={<div style={{color: 'white', textAlign: 'center', marginTop: '20%'}}>Loading...</div>}>
        <RouterProvider router={router}/>
    </Suspense>
);
}

export default App;
