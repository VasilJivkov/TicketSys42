const express = require('express');
const app = express();

app.get('/' , function (req, res) {
    res.send('Helloooo Ticketsys');
});

app.listen(1337, () => {
    console.log('Server started on port 1337!');
});


