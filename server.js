const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

async function main() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'mydb',
    });

    const app = express();
    app.use(cors());
    app.use(express.json());

    //GET USERS
    app.get('/users', async function (res) {
        try {
            const [results] = await connection.query(
                'SELECT * FROM `users`'
            );
            res.json(results);
        } catch (err) {
            console.log(err);
        }
    });

    //GET PRODUCTS
    app.get('products', async function (req, res) {
        try {
            const [results] = await connection.query(
                'SELECT * FROM `products`'
            );
            res.json(results);
        } catch (err) {
            console.log(err);
        }
    })

    //GET PARAMS USERS
    app.get('/users/:id', async function (req, res) {
        try {
            const userId = req.params.id;

            const [results] = await connection.query(
                'SELECT * FROM `users` WHERE id = ?',
                [userId]
            );

            res.json(results);
        } catch (err) {
            console.log(err);
        }
    });

    //POST USER
    app.post('/users', async function (req, res) {
        try {
            const [results] = await connection.query(
                'INSERT INTO `users`(`fname`, `lname`, `email`, `avatar`) VALUES (?, ?, ?, ?)',
                [req.body.fname, req.body.lname, req.body.email, req.body.avatar]
            );
            res.json(results);
        } catch (err) {
            console.log(err);
        }
    });

    //UPDATE USER
    app.put('/users', async function (req, res) {
        try {
            const [results] = await connection.query(
                'UPDATE `users` SET `fname` = ?, `lname` = ?, `email` = ?, `avatar` =? WHERE id = ?',
                [req.body.fname, req.body.lname, req.body.email, req.body.avatar, req.body.id]
            );
            res.json(results);
        } catch (err) {
            console.log(err);
        }
    });

    //DELETE USERS
    app.delete('/users', async function (req, res) {
        try {

            const delId = req.body.id;
            const [results] = await connection.query(
                'DELETE FROM `users` WHERE id = ?'
                , [delId]
            );
            res.json(results);
        } catch (err) {
            console.log(err);
        }
    });

    app.listen(5000, function () {
        console.log('CORS-enabled web server listening on port 5000');
    });
}

main().catch(err => {
    console.error(err);
});
