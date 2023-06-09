// npm run start

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

///* Undo: Aula 138
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
//*/

const multipartMiddleware = multipart({ uploadDir: './upload' });

app.post('/upload', multipartMiddleware, (req, res) => {
    const files = req.files;
    console.log(files);
    res.json({ message: files });
});

app.get('/downloadExcel', (req, res) => {
    res.download('./upload/1.xlsx');
});

app.get('/downloadPdf', (req, res) => {
    res.download('./upload/1.pdf');
});

app.use((err, req, res, next) => res.json({ error: err.message }));

app.listen(8000, () => {
    console.log('Servidor porta 8000');
})
