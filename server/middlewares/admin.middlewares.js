const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

// JWT tokenini tekshirish (LocalStorage dan keladigan token uchun)
const verifyToken = (req, res, next) => {
    // Tokenni so'rovdan olamiz, frontenddan localStorage orqali yuboriladi
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        // Token haqiqiy bo'lsa, decoded ma'lumotlarini req objectiga qo'shamiz
        req.userId = decoded.userId;
        next();
    });
};

// Adminligini tekshirish
const isAdmin = async (req, res, next) => {
    // Foydalanuvchi ID sini olamiz
    const userId = req.userId;

    // Ma'lumotlar bazasidan foydalanuvchini tekshirish (Supabase orqali)
    const { data: user, error } = await supabase
        .from('admins')
        .select('*')
        .eq('id', userId)
        .single();

    if (error || !user) {
        return res.status(403).json({ message: 'Access denied. You are not an admin.' });
    }

    next();
};

module.exports = {
    verifyToken,
    isAdmin
};