import Sequelize from 'sequelize';
import db from '../config/database.js';

export const Group = db.define(
  'groupTable',
  {
    name: {
      type: Sequelize.STRING,
    },
    reportsTo: {
      type: Sequelize.INTEGER,
    },
  },
  { timestamp: true }
);

// Group.sync();

export const Person = db.define(
  'personTable',
  {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    jobTitle: {
      type: Sequelize.STRING,
    },
    groupTableId: {
      type: Sequelize.INTEGER,
      references: {
        model: Group,
        key: 'id',
      },
    },
  },
  { timestamp: true }
);

// Person.sync();

Group.hasMany(Person, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// Group.hasMany(Group);
Person.belongsTo(Group);

// To prevent cyclic dependencies in Node.js,
// all the models are in the same file