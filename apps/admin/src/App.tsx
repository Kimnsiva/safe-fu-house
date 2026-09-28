import { HashRouter, Routes, Route } from 'react-router-dom';
import { AdminLayout } from './pages/Layout';
import { Dashboard } from './pages/Dashboard';
import { MenuManager } from './pages/MenuManager';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="menu" element={<MenuManager />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;