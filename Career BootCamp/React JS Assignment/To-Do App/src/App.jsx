import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import TodoApp from './pages/TodoApp';
// import ProfilePage from './pages/ProfilePage';
// import StatisticsPage from './pages/StatisticsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/todo" element={<TodoApp />} />
        {/* <Route path="/profile" element={<ProfilePage />} />
        <Route path="/stats" element={<StatisticsPage />} /> */}
      </Routes>
    </Router>
  );
}
export default App;