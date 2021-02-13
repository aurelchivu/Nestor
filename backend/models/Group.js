import  Sequelize from 'sequelize';
import db from '../config/database.js';

const Group = db.define('group', {
  name: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.NOW,
  },
});

Group.sync().then(() => {
  console.log('table created');
});

export default Group;
