import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { db } from "../index.js"

async function register(req, res) {
    const {
        name,
        email,
        password,
    } = req.body;
    try {
        const query = `SELECT * FROM user WHERE email = ?`;
        db.query(query, [email], async (error, results, fields) => {
            if (error) {
                console.error('Error querying MySQL:', error);
                return res.status(500).json({ message: 'Error querying database' });
            }
            if (results.length > 0) {
                return res.status(400).json({ message: 'User already exists!' });
            }
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            const insertQuery = `INSERT INTO user (name, email, password) VALUES (?, ?, ?)`;
            db.query(insertQuery, [name, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error inserting into MySQL:', err);
                    return res.status(500).json({ message: 'Error inserting into MySQL' });
                }
                const userId = result.insertId;
                const token = jwt.sign({ id: userId }, process.env.USER_SECRET, { expiresIn: '24hr' });
                res.status(201).json({ token: token, user: { id: userId, name, email } });
            });
        });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


async function login(req, res) {
    const { email, password } = req.body;
    try {
        const query = `SELECT * FROM user WHERE email = ?`;
        db.query(query, [email], async (error, results, fields) => {
            if (error) {
                console.error('Error querying MySQL:', error);
                return res.status(500).json({ message: 'Error querying MySQL' });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "User doesn't exist!" });
            }

            const foundUser = results[0];
            const passwordMatched = await bcrypt.compare(password, foundUser.password);
            if (!passwordMatched) {
                return res.status(400).json({ message: "Invalid Password!" });
            }

            const token = jwt.sign({ id: foundUser.id }, process.env.USER_SECRET, { expiresIn: '24hr' });
            res.status(201).json({ token: token, user: { id: foundUser.id, name: foundUser.name, email: foundUser.email } });
        });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export { register, login };
