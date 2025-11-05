import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './Home';
import FileFormPage from './file-form/FileFormPage';
import PeselPage from './pesel/PeselPage';
import UsersPage from './users/UsersPage';
import './index.css'

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
  </StrictMode>,
)
