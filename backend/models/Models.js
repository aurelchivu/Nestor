import Sequelize from 'sequelize';
import db from '../config/database.js';

export const Group = db.define(
  'groupTable',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    reportsTo: {
      type: Sequelize.INTEGER,
    },
  },
  { timestamp: true }
);

Group.sync();

export const Person = db.define(
  'personTable',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jobTitle: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    groupName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      references: {
        model: Group,
        key: 'name',
      },
    },
  },
  { timestamp: true }
);

Person.sync();

Group.hasMany(Person, {
  foreignKey: 'groupName',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Group.hasMany(Group, {
  foreignKey: 'reportsTo',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Group.belongsTo(Group, {
  foreignKey: 'reportsTo',
});

Person.belongsTo(Group, {
  foreignKey: 'groupName',
});
