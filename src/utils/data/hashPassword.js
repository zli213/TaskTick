import bcrypt from 'bcrypt';

export default async function hashPassword (plainPassword) {
    const saltAround = 1;
    try {
        const hashedPassword = await bcrypt.hash(plainPassword, saltAround);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
};