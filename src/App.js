"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./App.css");
var Home_1 = require("./pages/Home");
var About_1 = require("./pages/About");
var routes = [
    {
        path: "/",
        element: <Home_1.default />,
        children: [
            { path: "about", element: <About_1.default /> },
        ]
    },
];
var router = (0, react_router_dom_1.createBrowserRouter)(routes, {
    future: {
        v7_normalizeFormMethod: true,
    },
});
function App() {
    return (<react_1.Suspense fallback={<div style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>Loading...</div>}>
        <react_router_dom_1.RouterProvider router={router}/>
    </react_1.Suspense>);
}
exports.default = App;
