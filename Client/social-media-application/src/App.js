import Login from './components/Login';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/profile/:uid" element={<UserProfile/>} />
      </Routes>
    </Router>
  );
}

export default App;

