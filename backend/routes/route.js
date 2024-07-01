const express  = require('express');
const router  =  express.Router();
const authRoute  =  require('./common/authRoute');
const adminRoute =  require('./admin/common');
const employeeRoute =  require('./admin/employee');
const supplierRoute =  require('./admin/supplier');
const warehouseRoute =  require('./admin/warehouse');
const productRoute =  require('./admin/product');




router.use('/' , authRoute );
router.use('/admin' , adminRoute);
router.use('/admin/employee' , employeeRoute);
router.use('/admin/supplier' , supplierRoute);
router.use('/admin/warehouse' , warehouseRoute);
router.use('/admin/product' , productRoute);







module.exports =  router ;