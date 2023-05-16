import express from 'express';

const app = express();

const __dirname = new URL('.', import.meta.url).pathname;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(request, response) {
	console.log("home page");
	response.send('hello');
})

app.use(function(request, response) {
	response.status(404).send("Sorry, that page doesn't exist.");
});

// app.listen(1982);

app.listen(1982, function() {
	console.log("Server started at http://localhost:1982");
});