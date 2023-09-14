import express from 'express';
import bodyParser from 'body-parser';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Date section
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
let day = d.getDay();
let date = d.getDate();
let month = d.getMonth()+1;
if (month < 10) month = "0" + month;
let year = d.getFullYear();
let fullDate= `${weekday[day]},${date}/${month}/${year}`;

// list items section
const listItems = [];

app.get('/', (req, res) =>
{
    res.render('index.ejs', 
    {
    date: fullDate, 
    listItems: listItems
    });
});

app.post('/', (req, res) =>
{
    const item = req.body.newTodo;
    listItems.push(item);
    res.redirect('/');
    
});

app.listen(port, () => 
{
    console.log(`Server running on port ${port}`);
});