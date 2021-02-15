import ErrorResponse from '../utils/ErrorResponse.js';
import asyncHandler from '../middleware/async.js';
import { Group } from '../models/Models.js';

// @desc      Create new group
// @route     POST /api/groups
export const createGroup = asyncHandler(async (req, res) => {
  const group = await Group.create(req.body);

  res.status(201).json({
    success: true,
    data: group,
  });
});

// @desc      Get all groups
// @route     GET /api/groups
export const getGroups = asyncHandler(async (req, res) => {
  const groups = await Group.findAll();

  res.status(200).json({
    succes: true,
    count: groups.length,
    data: groups,
  });
});

// @desc      Get group by ID
// @route     GET /api/groups/:id
export const getGroup = asyncHandler(async (req, res, next) => {
  const group = await Group.findByPk(req.params.id);

  if (!group) {
    return next(
      new ErrorResponse(`No group found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: group });
});

// @desc      Update group
// @route     PUT /api/v1/groups/:id
export const updateGroup = asyncHandler(async (req, res, next) => {
  let group = await Group.findByPk(req.params.id);

  if (!group) {
    return next(
      new ErrorResponse(`Group not found with id of ${req.params.id}`, 404)
    );
  }

  await group.update(req.body)

  res.status(200).json({ success: true, data: group });
});

// @desc      Delete group
// @route     DELETE /api/groups/:id
export const deleteGroup = asyncHandler(async (req, res, next) => {
  const group = await Group.findByPk(req.params.id);

  if (!group) {
    return next(
      new ErrorResponse(`Group not found with id of ${req.params.id}`, 404)
    );
  }

  await group.destroy();

  res.status(200).json({ success: true, data: {} });
});
