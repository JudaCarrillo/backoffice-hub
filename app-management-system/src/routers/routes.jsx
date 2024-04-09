import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Productos } from '../pages/productos';
import { Categoria } from '../pages/categorias';
import { Login } from '../pages/login';
import { Proveedores } from '../pages/proveedores';
import { Usuarios } from '../pages/usuarios';
import { Sidebar } from '../components/sidebar';
export function MyRoutes() {
    return (
            <Routes>
                <Route path='/'  element ={<Productos/>} />
                <Route path='/categoria'  element ={<Categoria/>} />
                <Route path='/login'  element ={<Login/>} />
                <Route path='/proveedores'  element ={<Proveedores/>} />
                <Route path='/usuarios'  element ={<Usuarios/>} />
            </Routes>
    );
}