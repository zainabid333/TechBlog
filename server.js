const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const exhbs = require('express-handlebars')

app.engine('handlebars', exhbs);
app.set('view engine', 'handlebars');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
