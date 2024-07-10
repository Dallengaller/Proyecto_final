// index.js

// CONFIGURACION SERVIDOR LOCAL
// import express from 'express';

// const app = express();
// app.listen(3000, () => console.log("¡Servidor encendido!"));
// app.get("/home", (req, res) => {
//   res.send("Hello World Express Js");
// });


// CONFIGURACION RENDER
// En caso de no indicar el PORT, se inicia con el servidor por defecto.
import express from 'express';

const app = express();

app.get("/home", (req, res) => {
  res.send("Hello World Express Js");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`¡Servidor encendido en puerto ${port}!`));