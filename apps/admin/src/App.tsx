import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminLayout } from './pages/Layout';
import { Dashboard } from './pages/Dashboard';
import { MenuManager } from './pages/MenuManager';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="menu" element={<MenuManager />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;