import ErrorResponse from '../utils/ErrorResponse.js';
import asyncHandler from '../middleware/async.js';
import { Person } from '../models/Models.js';

// @desc      Create new person
// @route     POST /api/persons
export const createPerson = asyncHandler(async (req, res) => {
  const person = await Person.create(req.body);

  res.status(201).json({
    success: true,
    data: person,
  });
});

// @desc      Get all persons
// @route     GET /api/v1/persons
export const getPersons = asyncHandler(async (req, res) => {
  const persons = await Person.findAll();

  res.status(200).json({
    succes: true,
    count: persons.length,
    data: persons,
  });
});

// @desc      Get person by ID
// @route     GET /api/persons/:id
export const getPerson = asyncHandler(async (req, res, next) => {
  const person = await Person.findByPk(req.params.id);

  if (!person) {
    return next(
      new ErrorResponse(`No person found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: person });
});

// @desc      Update person
// @route     PUT /api/v1/persons/:id
export const updatePerson = asyncHandler(async (req, res, next) => {
  let person = await Person.findByPk(req.params.id);

  if (!person) {
    return next(
      new ErrorResponse(`Person not found with id of ${req.params.id}`, 404)
    );
  }

  await person.update(req.body);

  res.status(200).json({ success: true, data: person });
});

// @desc      Delete person
// @route     DELETE /api/persons/:id
export const deletePerson = asyncHandler(async (req, res, next) => {
  const person = await Person.findByPk(req.params.id);

  if (!person) {
    return next(
      new ErrorResponse(`Person not found with id of ${req.params.id}`, 404)
    );
  }

  await person.destroy();

  res.status(200).json({ success: true, data: {} });
});