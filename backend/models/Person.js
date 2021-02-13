import Sequelize from 'sequelize';
import db from '../config/database.js';

const Person = db.define('person', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  jobTitle: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.NOW,
  },
});

Person.sync().then(() => {
  console.log('table created');
});

export default Person;
