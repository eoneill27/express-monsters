import express from 'express';

import monsterData from './monsters.json' assert {type: 'json'};

const app = express();

const __dirname = new URL('.', import.meta.url).pathname;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('css'));

app.get('/', function(request, response) {
	console.log("home page");
	response.render('home');
})

app.get('/monsters', function(request, response) {
	response.render('monsters', {monsterArray: monsterData});
})

app.get('/detail', function(request, response) {
	response.render('detail');
})

app.use(function(request, response) {
	response.status(404).render('404', {query: request.url});
});

// app.listen(1982);

app.listen(1982, function() {
	console.log("Server started at http://localhost:1982");
});