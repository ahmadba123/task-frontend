import './App.css';
import { BrowserRouter, Route, Routes, Navigate, } from 'react-router-dom';
import Layout from './page/layout/Layout';
import Login from "./page/logIn/Login";
import Home from "./page/Home/Home";
import '@progress/kendo-theme-default/dist/all.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />
          {
            localStorage.getItem("token") !== null ?
              <Route element={(
                <>
                  <Layout />
                </>
              )}>


                <Route path="/home" element={<Home />} />




              </Route>

              :
              <Route path="*" element={<Login />} />
          }

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
