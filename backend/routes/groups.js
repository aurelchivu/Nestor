import express from 'express';
import {
  createGroup,
  getGroups,
  getGroup,
  updateGroup,
  deleteGroup,
} from '../controllers/groups.js';

const router = express.Router();

router.route('/').post(createGroup).get(getGroups);

router.route('/:id').get(getGroup).put(updateGroup).delete(deleteGroup);

export default router;
