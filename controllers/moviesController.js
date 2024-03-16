// Import model dan repository
const moviesRepository = require('../repositories/moviesRepository');

// Controller untuk membuat film beserta mengunggah foto
async function createMovie(req, res) {
    try {
        const { title, genres, year } = req.body;
        const photo = req.file.filename; // Nama foto yang diunggah
        const movie = await moviesRepository.createMovie({ title, genres, year, photo });
        res.json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal membuat film' });
    }
}

// Controller untuk mendapatkan film berdasarkan ID
async function getMovieById(req, res) {
    try {
        const id = req.params.id;
        const movie = await moviesRepository.getMovieById(id);
        if (!movie) {
            return res.status(404).json({ error: 'Film tidak ditemukan' });
        }
        res.json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mendapatkan film' });
    }
}

// Controller untuk mengupdate film
async function updateMovie(req, res) {
    try {
        const id = req.params.id;
        const { title, genres, year } = req.body;
        const movie = await moviesRepository.updateMovie(id, { title, genres, year });
        if (!movie) {
            return res.status(404).json({ error: 'Film tidak ditemukan' });
        }
        res.json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengupdate film' });
    }
}

// Controller untuk menghapus film
async function deleteMovie(req, res) {
    try {
        const id = req.params.id;
        const deletedMovie = await moviesRepository.deleteMovie(id);
        if (!deletedMovie) {
            return res.status(404).json({ error: 'Film tidak ditemukan' });
        }
        res.json({ message: 'Film berhasil dihapus' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal menghapus film' });
    }
}

// Ekspos controller
module.exports = {
    createMovie,
    getMovieById,
    updateMovie,
    deleteMovie
};
