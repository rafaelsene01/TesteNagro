import Sequelize, { Model } from 'sequelize';

class Imovel extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        city: Sequelize.STRING,
        total_area: Sequelize.NUMBER,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Pessoa, { foreignKey: 'growerId', as: 'pessoa' });
  }
}

export default Imovel;
