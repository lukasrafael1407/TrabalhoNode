import { Model } from 'sequelize';
import Bcrypt from 'bcryptjs';

console.log("Models");
export default (sequelize, dataTypes) => {
  class Cliente extends Model {}

  Cliente.init({
    nome: dataTypes.STRING,
    documento: dataTypes.STRING,    
    email: dataTypes.STRING,
    password: dataTypes.STRING    
  }, { sequelize, modelName: 'cliente', tableName: 'clientes' });

  Cliente.addHook('beforeCreate', async (cliente) => {
    const hash = await Bcrypt.hash(cliente.password, 10);

    cliente.password = hash;
  });

  return Cliente;  
}
