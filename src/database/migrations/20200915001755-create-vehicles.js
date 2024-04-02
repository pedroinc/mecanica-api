'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vehicles',
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
     },
     name: {
      type: Sequelize.STRING,
      allowNull: false
     },
     licensePlate: {
      type: Sequelize.STRING,
      allowNull: true
     },
     vin: {
      type: Sequelize.STRING,
      allowNull: true
     },
     year: {
      type: Sequelize.STRING,
      allowNull: true
     },
     created_at: {
        type: Sequelize.DATE,
        allowNull: false
     },
     updated_at: {
        type: Sequelize.DATE,
        allowNull: false
     },
     customer_id: {
      type: Sequelize.STRING,
      references: {
        model: {
          tableName: 'customers',
          // schema: 'schema'
        },
        key: 'id',        
      },
      allowNull: false
   },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vehicles');
  }
};
