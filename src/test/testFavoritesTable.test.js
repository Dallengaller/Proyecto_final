// // testFavoritesTable.test.js
// const request = require('supertest');
// const app = require('../src/app'); // Importar tu aplicación Express
// const pool = require('../src/database/dbconfig');

// describe('Favorites table', () => {
//   beforeEach(async () => {
//     // Limpiar la base de datos antes de cada prueba
//     await pool.query('TRUNCATE TABLE favoritos, titulo, perfil, usuarios RESTART IDENTITY CASCADE');
//   });

//   it('should insert a favorite in the favoritos table', async () => {
//     const response = await request(app)
//       .post('/api/favorites')
//       .send({
//         imdbID: 'tt0111161',
//         Title: 'The Shawshank Redemption',
//         precio: 9.99,
//       })
//       .set('Authorization', 'Bearer your_token') // Asegúrate de reemplazar 'your_token' con el token de autenticación válido
//       .expect(201);

//     expect(response.body).to.deep.equal({ message: 'Favorite added successfully' });

//     // Verificar que el favorito se haya agregado correctamente en la base de datos
//     const favoritoResult = await pool.query('SELECT * FROM favoritos WHERE perfil_id = (SELECT perfil_id FROM perfil WHERE user_id = (SELECT id FROM usuarios WHERE email = $1))', ['test@example.com']);
//     expect(favoritoResult.rows.length).to.equal(1);
//   });
// });


////////////////////////////////////