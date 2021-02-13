import  Sequelize from 'sequelize';
import db from '../config/database.js';

const Group = db.define('group', {
  name: {
    type: Sequelize.STRING,
  },
  dateCreated: {
    type: Sequelize.DATE,
  },
  dateUpdated: {
    type: Sequelize.DATE,
  },
});

Group.sync().then(() => {
  console.log('table created');
});

export default Group;
