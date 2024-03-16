// Import paket
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const moviesController = require('./controllers/moviesController');

// Konfigurasi multer untuk mengunggah foto
const upload = multer({ dest: 'uploads/' });

// Inisialisasi aplikasi Express
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/movies', upload.single('photo'), moviesController.createMovie);
app.get('/movies/:id', moviesController.getMovieById);
app.put('/movies/:id', moviesController.updateMovie);
app.delete('/movies/:id', moviesController.deleteMovie);

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
