// Import PostgreSQL client
const { Pool } = require('pg');
const pool = new Pool();

// Membuat film
async function createMovie({ title, genres, year, photo }) {
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO public.movies (title, genres, year, photo) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [title, genres, year, photo];
        const result = await client.query(query, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// Mendapatkan film berdasarkan ID
async function getMovieById(id) {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM public.movies WHERE id = $1';
        const result = await client.query(query, [id]);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// Mengupdate film
async function updateMovie(id, { title, genres, year }) {
    const client = await pool.connect();
    try {
        const query = 'UPDATE public.movies SET title = $1, genres = $2, year = $3 WHERE id = $4 RETURNING *';
        const values = [title, genres, year, id];
        const result = await client.query(query, values);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// Menghapus film
async function deleteMovie(id) {
    const client = await pool.connect();
    try {
        const query = 'DELETE FROM public.movies WHERE id = $1 RETURNING *';
        const result = await client.query(query, [id]);
        return result.rows[0];
    } finally {
        client.release();
    }
}

// Ekspos repository
module.exports = {
    createMovie,
    getMovieById,
    updateMovie,
    deleteMovie
};
