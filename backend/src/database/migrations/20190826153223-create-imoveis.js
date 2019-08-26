module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('imoveis', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      total_area: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      growerId: {
        type: Sequelize.INTEGER,
        references: { model: 'pessoas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('imoveis');
  },
};
