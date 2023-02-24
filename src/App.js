import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SwipePage from './Pages/SwipePage/SwipePage';
import MyUserPage from './Pages/MyUserPage/MyUserPage';
import ChatListPage from './Pages/ChatListPage/ChatListPage';
import WelcomePage from './Pages/WelcomePage/WelcomePage';
import LogInPage from './Pages/LogInPage/LogInPage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import LikesPage from './Pages/LikesPage/LikesPage';
import EditUserPage from './Pages/EditUsePage/EditUserPage';
import PRUEBAPAGE from './Pages/PRUEBAPAGE';
import ChatPage from './Pages/ChatPage/ChatPage';

function App() {
  return (
 <Router>
  <Routes>
    <Route path='/' element={<WelcomePage></WelcomePage>} />
    <Route path='/signup' element={<SignUpPage></SignUpPage>} />
    <Route path='/login' element={<LogInPage></LogInPage>} />
    <Route path='/swipe' element={<SwipePage></SwipePage>} />
    <Route path='/likes' element={<LikesPage></LikesPage>} />
    <Route path='/chat' element={<ChatListPage></ChatListPage>} />
    <Route path='/myprofile' element={<MyUserPage></MyUserPage>} />
    <Route path='/edituser' element={<EditUserPage></EditUserPage>} />
    <Route path='/chat/:id' element={<ChatPage/>} />
    <Route path='/prueba/:id' element={<PRUEBAPAGE/>} />
  </Routes>
 </Router>
  );
}

export default App;
