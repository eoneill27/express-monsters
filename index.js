import * as dotenv from 'dotenv';
dotenv.config();

// prismic setup
import path from 'path';

import * as prismic from '@prismicio/client';

import express from 'express';
import sass from 'sass';

const app = express();

// prismic setup
import { fileURLToPath } from 'url';
import { client } from './config/prismicConfig.js';
console.log({client});

// set EJS as templating engine
app.set('view engine', 'ejs');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'views')));

const port = process.env.PORT || 1985;

app.listen(port, function() {
	console.log(`Server started at http://localhost:${port}`);
});

// Add a middleware function that runs on every route. It will inject 
// the prismic context to the locals so that we can access these in 
// our templates.
app.use((req, res, next) => {
  res.locals.ctx = {
    prismic,
  }
  next()
})

// Query for the root path.
// app.get('/', async (req, res) => {
//   // Here we are retrieving the first document from your API endpoint
//   const document = await client.getFirst()
//   res.render('page', { document })
// })

app.get('/', async (req, res) => {
	// const uid = req.params.uid
	const document = await client.getByUID('page', 'home');
	// getByUID(type, uid, params)
	// type refers to the API ID of the custom type
	// uid refers to the document's UID
	res.render('home', {document});
	console.log(req.params.uid);
})

app.use(express.static('public'));
app.use(express.static('css'));


import monsterData from './monsters.json' assert {type: 'json'};

// page routes

app.get('/test', function(request, response) {
	console.log("home page");
	response.render('home');
});

// app.get('/home', function(request, response) {
// 	const document = client.getSingle('page');
// 	response.render('page', {document});
// })

app.get('/home', async (req, res) => {
  const document = await client.getSingle('page')
  res.render('page', { document })
})

// Page route
app.get('/monsters/:uid', async (req, res) => {
  const uid = req.params.uid
  const document = await client.getByUID('monster_data', uid)
  res.render('monster_data', { document })
  console.log(document);
})

app.get('/monsters', async (request, response) => {
	const monsterArray = await client.getAllByType('monster_data');
	console.log(monsterArray);
	response.render('monsters', {monsterArray});
})

// Express - no prismic
// app.get('/monsters', function(request, response) {
// 	response.render('monsters', {monsterArray: monsterData});
// });

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


