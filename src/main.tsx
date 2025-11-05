import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';

import Home from '@/pages/Home';
import FileFormPage from '@/pages/FileFormPage';
import PeselPage from '@/pages/PeselPage';
import UsersPage from '@/pages/UsersPage';

import '@/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/file" element={<FileFormPage />} />
          <Route path="/pesel" element={<PeselPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
