const express =  require('express');
require('dotenv').config();
require('./config/connetion');
const routes =  require('./routes/route');
const cors  =  require('cors');
const rateLimit = require('express-rate-limit');
const { newRequest } = require('./middlewares/logsMiddleware');

const app   =  express();
const limiter = rateLimit({
      windowMs:  60 * 1000, 
      max: 100, 
      message: 'Too many requests from this IP, please try again after 1 minutes'
  });

// development mode is on right now 
app.use(cors('*'));
app.use(express.json());
app.use(newRequest);
app.use(limiter)
app.use('/' , routes );





app.get('/' , (req , res)=> {
      console.log('working fine');
      res.status(200).send({message: "working fine" , errro : 0  , data : null });
})


app.listen(process.env.PORT || 3000 , ()=> console.log('server is running in development mode '));