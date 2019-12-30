import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Produto extends Model {}

  Produto.init({
    descricao: dataTypes.STRING,
    quantidade: dataTypes.INTEGER,
    valor: dataTypes.INTEGER
  }, { sequelize, modelName: 'produto', tableName: 'produtos' });

  Produto.associate = models => {
    models.produto.belongsTo(models.categoria);
    models.produto.hasMany(models.pedidoproduto, { as: 'produtopedidos' });
    
  };
  return Produto;
};
