/*
    Template engine helps us to create an HTML template with minimal code.
    Also, it can inject data into HTML template at client side and produce
    the final HTML. There are three such engines named as : pug , mustache,
    and EJS.
*/

const express = require('express');
const app = express();

// using pug engine. It will directly call it, no need to require.
app.set('view engine','pug');
app.set('views','./views'); // this is an default setting. We dont have to set that.

app.get('/', (req, res) => {
    res.render('index', { title: 'My Express App',message: 'Hello'});
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}.....`));