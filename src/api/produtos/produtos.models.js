import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Produto extends Model {}

  Produto.init({
    descricao: dataTypes.STRING,
    quantidade: dataTypes.INTEGER,
    valor: dataTypes.INTEGER
  }, { sequelize, modelName: 'produto', tableName: 'produtos' });

  Produto.associate = models => {
    models.produto.belongsTo(models.categoria, {as: 'categoria'});
    models.produto.belongsToMany(models.pedido, {
      through: 'pedidoproduto',
      as: 'pedidos',
      foreignKey: 'produtoId',
      otherKey: 'pedidoId'
    });
    
  };
  return Produto;
};
