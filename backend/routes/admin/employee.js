const express =  require('express');
const router  =  express.Router();
const { authenticateUserToken  ,  checkRole } = require('../../middlewares/authenticateToken');
const { get  , getById  , store , update , destroy } = require('../../controllers/admin/employeeController');

router.use(authenticateUserToken);
router.use(checkRole('admin'));

router.get('/get'  , get );
router.post('/getbyid'  , getById );
router.post('/store' , store ); 
router.post('/update' , update);
router.post('/delete' , destroy);







module.exports =  router ;