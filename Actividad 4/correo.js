const nodemailer = require('nodemailer');

// Configura el transportador con tu cuenta de Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ramiroec2@gmail.com',
    pass: 'aaru cwxn ofjy lbfc' // Tu contraseña de aplicación
  }
});

// Configura las opciones del correo
const mailOptions = {
  from: 'ramiroec2@gmail.com',
  to: 'ant_-17@hotmail.com, aaroncristaldo39@gmail.com, enciso.luisgui@gmail.com, rgarciatotvs@gmail.com, fermin.gim93@gmail.com, josehermosillabenitez97@gmail.com, lucasdrl94@gmail.com, aleschwieckervera97@gmail.com',
  subject: 'Asunto del correo',
  text: 'Contenido del correo'
};

// Envía el correo
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Correo enviado: ' + info.response);
});
