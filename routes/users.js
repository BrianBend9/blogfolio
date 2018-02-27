const {
  getUsers,
  createUser,
  newUser,
  showUser,
  updateUser,
  deleteUser,
  editUser,
} = require('../controllers/usersController');
const express = require('express');

const router = express.Router();

/* GET index of all users */
/* POST create a new user */
router.route('/')
  .get(getUsers)
  .post(createUser);

/* GET page to add a new user */
router.route('/new')
  .get(newUser);

/* GET page to show one user */
/* PUT update one user  */
/* DELETE destroy one user  */
router.route('/:titleSlug/:month/:year')
  .get(showUser)
  .put(updateUser)
  .delete(deleteUser);

/* GET page to edit one user */
router.route('/:titleSlug/:month/:year/edit')
  .get(editUser);

module.exports = router;
