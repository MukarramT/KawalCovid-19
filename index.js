const express = require('express');
const request = require('request');
const engine = require('ejs-locals');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render('index', {active: 0});
});
app.get("/data", (req, res) => {
    res.render('data', {active: 1})
});
app.get("/kontak", (req, res) => {
    res.render('kontak', {active: 2})
});
app.get("/faq", (req, res) => {
    res.render('faq', {active: 3})
});


app.get('/api/:req', (req, res) => {
    const q = req.query;
    const chooseAPI = req.params;
    var pick;

    if (Object.keys(q).length === 0) {
        pick = chooseAPI.req;
    }
    else
        pick = chooseAPI.req + "/" + q.id;    
    
    const reqAPI = request({
        url: "http://128.199.143.66:3000/" + pick,
        json: true
    }, (err, reponse, body) => {
        // res.setHeader("content-type", "application/json")
        // res.send(JSON.stringify(body))
        res.send(body);
            // const api_temp = JSON.stringify(body, undefined, 4);
    });
});

app.get('/api/:req/:recent', (req, res) => {
    const chooseAPI = req.params;
    var pick = chooseAPI.req + "/" + chooseAPI.recent;    
    
    const reqAPI = request({
        url: "http://128.199.143.66:3000/" + pick,
        json: true
    }, (err, reponse, body) => {
        res.send(body);
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Started on port ${port}`));