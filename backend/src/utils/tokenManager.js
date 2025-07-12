import jwt from 'jsonwebtoken';

export const generateToken = async (user) => {
  const token = await jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
  console.log('Token generated:', token);
  return token;
};

export const verifyToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Not authorized, token failed');
  }
};
