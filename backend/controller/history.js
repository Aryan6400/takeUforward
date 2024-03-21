import { db } from '../index.js'
import getResult from '../utils/index.js'

const addData = async (req, res) => {
    const {
        email,
        language,
        stdin,
        code
    } = req.body
    try {
        const response = await getResult(stdin, code, language)
        const insertQuery = `INSERT INTO history (email, language, stdin, code, stdout) VALUES (?, ?, ?, ?, ?)`
        const values = [email, language, stdin, code, response.stdout]
        db.query(insertQuery, values, (err, result) => {
            if (err) {
                res.status(500).json({ message: 'Error inserting into MySQL', error: err });
                return;
            }
            const fetchQuery = `SELECT * FROM history WHERE email = ?`;
            db.query(fetchQuery, [email], (err, histories) => {
                if (err) {
                    res.status(500).json({ message: 'Error fetching histories from MySQL' });
                    return;
                }
                // RedisClient.set('userHistory', JSON.stringify(histories))
                res.status(201).json({message: "Success!"})
            });
        });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getData = async (req, res) => {
    // const { limit = 20, skip = 0 } = req.query
    try {
        // RedisClient.get('userHistory', (error, data) => {
        //     if (error) console.error(error)
        //     if (data) return res.status(201).json(JSON.parse(history))
        //     else {
        //         const fetchQuery = `SELECT history.*, user.name FROM history INNER JOIN user ON history.email = user.email WHERE history.email = ?`
        //         db.query(fetchQuery, [req.params.email], (err, histories) => {
        //             if (err) {
        //                 res.status(500).json({ message: 'Error fetching histories from MySQL' });
        //                 return;
        //             }
        //             RedisClient.set('userHistory', JSON.stringify(histories))
        //             res.status(201).json(histories);
        //         });
        //     }
        // })
        const fetchQuery = `SELECT history.*, user.name FROM history INNER JOIN user ON history.email = user.email WHERE history.email = ? ORDER BY history.timestamp DESC`
        db.query(fetchQuery, [req.params.email], (err, histories) => {
            if (err) {
                res.status(500).json({ message: 'Error fetching histories from MySQL' });
                return;
            }
            res.status(201).json(histories);
        });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getAllData = async (req, res) => {
    const { limit = 20, skip = 0 } = req.query
    try {
        const fetchQuery = `SELECT history.*, user.name FROM history INNER JOIN user ON history.email = user.email ORDER BY history.timestamp DESC LIMIT ? OFFSET ?`
        db.query(fetchQuery, [parseInt(limit), parseInt(skip)], (err, histories) => {
            if (err) {
                res.status(500).json({ message: 'Error fetching histories from MySQL' })
                return
            }
            res.status(200).json(histories)
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export { addData, getData, getAllData }
