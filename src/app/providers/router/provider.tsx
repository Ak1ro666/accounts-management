import { Route, Routes } from "react-router-dom";

import { routeConfig } from "./route-config";

export function Provider() {
  return (
    <Routes>
      {Object.values(routeConfig).map((route) => (
        <Route key={route.path} {...route} />
      ))}
    </Routes>
  );
}
