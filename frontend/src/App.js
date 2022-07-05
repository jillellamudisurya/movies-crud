import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddMovie from './components/AddMovie';
import Edit from './components/Edit';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/addmovies' element={<AddMovie/>}/>
      <Route exact path='/editmovie/:id' element={<Edit/>}/>
    </Routes>
    </>
  );
}

export default App;
