import { CREATED, NO_CONTENT } from 'http-status';
import { authenticate, getToken } from '../utils/auth.utils';
import CategoriaDAO from './categorias.dao';

const CategoriaDAO = new CategoriaDAO();

console.log("Controller");

export default class CategoriasController {
    
}
