import jwt from 'jsonwebtoken';

const GenerateToken = async (payload) => {
    return await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
}
export default GenerateToken