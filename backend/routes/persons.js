import express from 'express';
import Sequelize from 'sequelize';
import getPersons from '../controllers/persons.js';

const router = express.Router();

router.route('/').get(getPersons);

export default router;
