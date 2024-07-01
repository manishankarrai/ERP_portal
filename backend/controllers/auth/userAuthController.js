const { User } =  require('../../models/User');
const { generateUserToken }  =  require('../../services/jsonWebToken');
const { hashPassword ,  verifyPassword  }  =  require('../../services/argon2Hash');

const register = async (req, res) => {
  const { name, email, role , password  } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, role , password: hashedPassword });
    const token = generateUserToken(user);
    const data  =  {
       name : user.name  , 
       email: user.email , 
       role : user.role ,
       token: token 
      }
    res.status(201).send({ error: 0, data: data, message: 'Register successful' });
  } catch (error) {
    res.status(200).send({ message: error.message, error: 1, data: null });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).send({ message: 'User not found', error: 1, data: null });
    }
    const userWithPassword = await User.findById(user.id);


    const isPasswordValid = await verifyPassword(password, userWithPassword.password);
    if (!isPasswordValid) {
      return res.status(200).send({ message: 'Invalid password', error: 1, data: null });
    }
    const token = generateUserToken(user);
    const data  =  {
      name : user.name  , 
      email: user.email , 
      role : user.role ,
      token: token 
     }
    res.status(200).send({ error: 0, data: data, message: 'Login successful' });
  } catch (error) {
    res.status(200).send({ message: error.message, error: 1, data: null });
  }
};


module.exports =  { login , register };