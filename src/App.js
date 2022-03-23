import "./styles/tailwind.output.css";
import {Routes, Route} from 'react-router-dom';

// Importing Components
import BaseLayout from './BaseLayout';
import Landing from './pages/Landing';
import Login from './components/Authentication/Login'
import Logout from './components/Authentication/Logout'
import Search from "./pages/Search";


function App() {
  return (
    <div>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BaseLayout>
    </div>
  );
}

export default App;