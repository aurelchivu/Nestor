import express from 'express';
import Sequelize from 'sequelize';
import {
  createPerson,
  getPersons,
  getPerson,
  updatePerson,
  deletePerson,
} from '../controllers/persons.js';

const router = express.Router();

router.route('/').post(createPerson).get(getPersons);

router.route('/:id').get(getPerson).put(updatePerson).delete(deletePerson);

export default router;

/*


{
    "firstName":"Ion",
    "lastName":"Popescu",
    "jobTitle":"sofer",
    "groupId":2
  }
  */
