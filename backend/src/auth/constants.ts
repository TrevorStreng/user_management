const dotenv = require('dotenv');

dotenv.config({ path: 'src/config.env' });

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
