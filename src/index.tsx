import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditorsListView from './app/views/EditorsList.view';
import Home from './app/views/Home.view';
import NotFound404 from './app/views/NotFound404.view';
import PostCreateView from './app/views/PostCreate.view';
import GlobalStyles from './core/globalStyles';
import './core/imports.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editors" element={<EditorsListView />} />
        <Route path="/posts/create" element={<PostCreateView />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
    <GlobalStyles />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
