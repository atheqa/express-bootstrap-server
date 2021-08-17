const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./members');

const app = express();

//init middleware
/* app.use(logger); */

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body Parser Middleware
app.use(express.json()); //allows the use of raw json data
app.use(express.urlencoded({ extended:false })); //allows handling of encoded data

//Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));


//rendering text on page
/* app.get('/', (req, res) => { 
    res.send('<h1>Hello World </h1>')
}); */

//rendering a file from public folder
/* app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html' ));
});
 */

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//members API Routes
app.use('/api/members', require('./routes/api/members'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

