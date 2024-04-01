// import 'antd/dist/antd.css';
// import { Button} from 'antd';
import {BrowserRouter ,Route,Routes} from 'react-router-dom';
import {Navigate} from 'react-router-dom'
import Items from './pages/Items';
import HomePage from './pages/HomePage';

import CartPages from './pages/CartPages';
import Register from './pages/Register';
import Login from './pages/Login';
import Bills from './pages/Bills';
import Customer from './pages/Customer';
// import Defaultlayout from './components/Defaultlayout';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
            <Routes>
            <Route path='/home' element=<ProtectedRoute>{<HomePage/>}</ProtectedRoute>/>
            <Route path='/items' element=<ProtectedRoute>{<Items/>}</ProtectedRoute>/>
            <Route path='/cart' element=<ProtectedRoute>{ <CartPages/>}</ProtectedRoute>/>
            <Route path='/bills' element=<ProtectedRoute>{<Bills/>}</ProtectedRoute>/>
            <Route path='/customers' element=<ProtectedRoute>{<Customer/>}</ProtectedRoute>/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<Login/>}/>   
            </Routes>
                    

    </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({children}){
  if(localStorage.getItem('pos users')){
    return children;
  }
  else{
    return <Navigate to='/login'/>
  }
}