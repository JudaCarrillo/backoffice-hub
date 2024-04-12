import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Productos } from '../pages/productos';
import { Categoria } from '../pages/categorias';
import {Login} from '../pages/login' ;
import { Proveedores } from '../pages/proveedores';
import { Usuarios } from '../pages/usuarios';
export function MyRoutes() {
    return (
        <Routes>
                <Route exact path='/'  element ={<Productos/>}/>
                <Route exact path='/product'  element ={<Productos/>}/>
                <Route path='/categories'  element ={<Categoria/>} />
                <Route path='/vendors'  element ={<Proveedores/>} />
                <Route path='/users'  element ={<Usuarios/>} />           
        </Routes>
    );
}
