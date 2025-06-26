const express = require('express');
const fs = require('fs');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const tasksFile = './tasks.json';

// Configura el transportador con tu cuenta de Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ramiroec2@gmail.com',
    pass: 'aaru cwxn ofjy lbfc' // Tu contraseña de aplicación
  }
});

app.get('/tasks', (req, res) => {
    fs.readFile(tasksFile, (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.post('/tasks', (req, res) => {
    const { task } = req.body;
    fs.readFile(tasksFile, (err, data) => {
        if (err) throw err;
        const tasks = JSON.parse(data);
        tasks.push(task);
        fs.writeFile(tasksFile, JSON.stringify(tasks), err => {
            if (err) throw err;

            // Configura las opciones del correo
            const mailOptions = {
                from: 'ramiroec2@gmail.com',
                to: 'ant_-17@hotmail.com, aaroncristaldo39@gmail.com, enciso.luisgui@gmail.com, rgarciatotvs@gmail.com, fermin.gim93@gmail.com, josehermosillabenitez97@gmail.com, lucasdrl94@gmail.com, aleschwieckervera97@gmail.com',
                subject: 'Nueva tarea creada',
                text: `Se ha creado una nueva tarea: ${task}`
            };

            // Envía el correo
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Correo enviado: ' + info.response);
            });

            res.status(201).send();
        });
    });
});

app.delete('/tasks/:index', (req, res) => {
    const index = req.params.index;
    fs.readFile(tasksFile, (err, data) => {
        if (err) throw err;
        const tasks = JSON.parse(data);
        tasks.splice(index, 1);
        fs.writeFile(tasksFile, JSON.stringify(tasks), err => {
            if (err) throw err;
            res.status(204).send();
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
