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
  dateCreated: {
    type: Sequelize.DATE,
  },
  dateUpdated: {
    type: Sequelize.DATE,
  },
});

Person.sync().then(() => {
  console.log('table created');
});

export default Person;
