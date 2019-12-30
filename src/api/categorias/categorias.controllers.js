import { CREATED, NO_CONTENT } from 'http-status';
import { authenticate, getToken } from '../utils/auth.utils';
import CategoriaDAO from './categorias.dao';

const categoriaDAO = new CategoriaDAO();

export default class CategoriasController {
    
    async list(request, h) {    
        return await categoriaDAO.findAll();
    }
    
    async detail({ params }, h) {
        const { id } = params;
        return await categoriaDAO.findByID(id);
    }
    
      async create({ payload }, h) {    
        const categorias = await categoriaDAO.create(payload);
        return h.response(categorias).code(CREATED);
      }
    
      async update({ payload, params }, h) {
        const { id } = params;
        return await categoriaDAO.update(id, payload);
      }
    
      async destroy({ params }, h) {
        const { id } = params;
        await categoriaDAO.destroy(id);
        return h.response().code(NO_CONTENT);
      }
}
