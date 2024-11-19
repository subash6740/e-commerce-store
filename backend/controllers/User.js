const { User, Cart } = require("../models")
const bcrypt = require('bcrypt')
const sendToken = require("../utils/jwt");

exports.userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findOne({ where: { email: email } });
        if (user) {
            return res.status(409).json({ message: 'Email already registered' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword, // Store hashed password
        });

        await Cart.create({ user_id: newUser.id });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(500).json({ message: "Error registering user" });
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        sendToken(user, res)
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
}