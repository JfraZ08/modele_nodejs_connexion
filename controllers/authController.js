const User = require('../model/user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { user, password } = req.body;
    console.log('Registering user:', user);

    const newUser = await User.create({ user, password });
    console.log('New user created:', newUser);

    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { user, password } = req.body;
    console.log('User login attempt:', user);

    const existingUser = await User.findOne({ where: { user } });
    console.log('User found:', existingUser);

    if (!existingUser || !(await existingUser.comparePassword(password))) {
      console.log('Invalid user or password');
      return res.status(401).send({ message: 'Invalid user or password' });
    }

    const token = jwt.sign({ id: existingUser.id_user }, 'your_jwt_secret', { expiresIn: '1h' });
    console.log('Generated token:', token);

    res.send({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(400).send(error);
  }
};
