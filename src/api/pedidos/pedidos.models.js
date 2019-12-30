import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Pedido extends Model {}

  Pedido.init({
    valor: dataTypes.NUMBER
  }, { sequelize, modelName: 'pedido', tableName: 'pedidos' });

  Pedido.associate = models => {
    models.pedido.belongsTo(models.cliente);
    models.pedido.hasMany(models.pedidoproduto, { as: 'pedidoprodutos' });
  };

  return Pedido;
};
