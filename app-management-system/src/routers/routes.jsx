import { Route, Routes } from 'react-router-dom'
import { Categoria } from '../pages/categorias'
import { Productos } from '../pages/productos'
import { Proveedores } from '../pages/proveedores'
import { Usuarios } from '../pages/usuarios'
export function MyRoutes () {
  return (
    <Routes>
      <Route exact path='/' element={<Productos />} />
      <Route exact path='/products' element={<Productos />} />
      <Route path='/categories' element={<Categoria />} />
      <Route path='/vendors' element={<Proveedores />} />
      <Route path='/users' element={<Usuarios />} />
    </Routes>
  )
}
