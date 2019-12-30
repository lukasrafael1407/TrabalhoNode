import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class PedidoProduto extends Model {}

  PedidoProduto.init({
    valor: dataTypes.NUMBER
  }, { sequelize, modelName: 'pedidoproduto', tableName: 'pedidoprodutos' });

 

  return PedidoProduto;
};

