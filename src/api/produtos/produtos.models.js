import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Produtos extends Model {}

  Produtos.init({
    descricao: dataTypes.STRING,
    quantidade: dataTypes.INTEGER,
    valor: dataTypes.INTEGER
  }, { sequelize, modelName: 'produtos', tableName: 'produtos' });

  Produtos.associate = models => {
    models.produtos.belongsTo(models.categorias);
  };
  return Produtos;
};
