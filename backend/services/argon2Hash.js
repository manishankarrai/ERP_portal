const argon2 = require('argon2');

const hashPassword = async (password) => {
  try {
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16, // 64MB
      timeCost: 3,         // Number of iterations
      parallelism: 1       // Number of threads
    });
    return hash;
  } catch (err) {
    console.error('Error hashing password:', err);
    throw err;
  }
};

// Verifying a password
const verifyPassword = async (password, hash) => {
  try {
    console.log("pas " , password , hash);
    const match = await argon2.verify(hash, password);
    return match;
  } catch (err) {
    console.error('Error verifying password: ', err);
    throw err;
  }
};

module.exports =  {
    hashPassword ,
    verifyPassword
}
