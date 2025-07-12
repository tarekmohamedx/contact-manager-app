const userRepository = require('../repositories/user.repository');
const tokenManager = require('../utils/tokenManager');

const login = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'No data sent in body' });
      }
    console.log('Login request received: in auth controller', req.body)
    
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

    const userExists = await userRepository.checkUserExists(username);
    if (!userExists) {
        return res.status(404).json({ message: 'User does not exist' });
    }

    const isPasswordCorrect = await userRepository.checkPasswordCorrect(username, password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Incorrect password' });
    }
    const user = await userRepository.GetUserByUserName(username);
    const token = await tokenManager.generateToken(user);
    console.log('Token generated: in login controller', token);
    
    res.status(200).json({
        message: 'Login success',
        token: token,
        user: {
            username: user.username,
            email: user.email,
            id: user._id
        }
    });
}

module.exports = {login};