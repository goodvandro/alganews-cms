import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const Contact = React.lazy(() => import('./views/Contact.view'));
const Home = React.lazy(() => import('./views/Home.view'));
const NotFound404 = React.lazy(() => import('./views/NotFound404.view'));
const NavBar = React.lazy(() => import('./components/NavBar'));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div>
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<div>
          carregando...
        </div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
