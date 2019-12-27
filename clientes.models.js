import { Model } from 'sequelize';
import Bcrypt from 'bcryptjs';

console.log("Models");
export default (sequelize, dataTypes) => {
  class Clientes extends Model {}

  Clientes.init({
    nome: dataTypes.STRING,
    documento: dataTypes.STRING,    
    email: dataTypes.STRING,
    password: dataTypes.STRING    
  }, { sequelize, modelName: 'cliente', tableName: 'clientes' });

  //Clientes.associate = models => {
  //  models.clientes.hasMany(models.post, { as: 'posts' });
  //};

  Clientes.addHook('beforeCreate', async (clientes) => {
    const hash = await Bcrypt.hash(clientes.password, 10);

    clientes.password = hash;
  });

  return Clientes;
}
