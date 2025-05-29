import express from 'express';
import {
  register,
  login,
  logout,
  addEnding,
  getTrueEndings,
  getUser,
  addButterfly
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.put('/add-ending', addEnding);
router.get('/ending/:userId', getTrueEndings);
router.get('/user/:userId', getUser);
router.put('/add-butterfly', addButterfly);

export default router;
