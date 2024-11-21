import express from 'express';
const router = express.Router();
import cookie from "cookie"

// Admin credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Set cookie
        res.setHeader(
            'Set-Cookie',
            cookie.serialize('admin', 'true', {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60 * 24, // 1 day
            })
        );
        return res.status(200).json({ message: 'Login successful' });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Logout route
router.post('/logout', (req, res) => {
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('admin', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            expires: new Date(0), // Expire immediately
        })
    );
    res.status(200).json({ message: 'Logged out successfully' });
});

export default router;
