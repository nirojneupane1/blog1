import express from 'express';
import { userSignUp,userLogin } from '../controller/UserController.js';
import { validationForm } from '../middleware/FormValidation.js';
const router=express.Router();
//Route 1 SignUP
router.post('/signUp',validationForm,userSignUp);

//Route 2 LogIn
router.post('/logIn',userLogin);

export default router;