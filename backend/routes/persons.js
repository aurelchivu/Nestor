import express from 'express';
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
