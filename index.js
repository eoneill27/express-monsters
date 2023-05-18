import express from 'express';

import monsterData from './monsters.json' assert {type: 'json'};

const app = express();

const __dirname = new URL('.', import.meta.url).pathname;

app.set('view engine', 'ejs');

app.listen(1982, function() {
	console.log("Server started at http://localhost:1982");
});

app.use(express.static('public'));
app.use(express.static('css'));

// page routes

app.get('/', function(request, response) {
	console.log("home page");
	response.render('home');
});

app.get('/monsters', function(request, response) {
	response.render('monsters', {monsterArray: monsterData});
});

// app.get('/detail', function(request, response) {
// 	response.render('detail');
// });

app.get('/monsters/:slug', function(request, response) {
	const foundMonster = monsterData.find(function(monster) {
		return monster.slug == request.params.slug;
	})
	// when this condition returns true, it will return the one item in the array and end the function

	response.render('detail', {monster: foundMonster});
	// passing the monster into the detail area

	
	// there will be an object with all of the :parameters
});


// if no route matches

app.use(function(request, response) {
	response.status(404).render('404', {query: request.url});
});


