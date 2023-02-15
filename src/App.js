import React, { Suspense } from 'react';
import './App.css';
import { useRoutes } from "react-router-dom";

const ProcessZero = React.lazy(() => import('./Component/Process/ProcessZero'));
const ProcessOne = React.lazy(() => import('./Component/Process/ProcessOne'));
// const ProcessTwo = React.lazy(() => import('./Component/Process/ProcessTwo'));
const ProcessRoute = React.lazy(() => import('./Component/Process/Process'));


function App() {
  let routes = [
    {
      path: "/",
      element: <ProcessRoute />,
    }, {
      path: "/processzero",
      element: <ProcessZero />,
    }, {
      path: "/processone",
      element: <ProcessOne />,
    }, 
    // {
    //   path: "/processtwo",
    //   element: <ProcessTwo />,
    // }
  ];
  let element = useRoutes(routes);


  return (
    <div className="App">
      <Suspense fallback={"...Loading"}>
        {element}
      </Suspense>
    </div>
  );
}
export default App;
