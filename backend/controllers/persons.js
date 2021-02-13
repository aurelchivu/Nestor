import ErrorResponse from '../utils/ErrorResponse.js';
import asyncHandler from '../middleware/async.js';
import Person from '../models/Person.js';

// @desc      Get all persons
// @route     GET /api/v1/persons
const getPersons = asyncHandler(async (req, res) => {
  const persons = await Person.findAll();

  res.status(200).json({
    succes: true,
    count: persons.length,
    data: persons,
  });
});

export default getPersons;
