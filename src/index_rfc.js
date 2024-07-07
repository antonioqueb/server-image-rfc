const express = require('express');
const cors = require('cors');
const uploadRFCRouter = require('./routes/upload_rfc');

const app = express();
const port = 3010;

// Configurar CORS para aceptar solicitudes solo de https://historiallaboral.com/
const corsOptions = {
  origin: 'https://historiallaboral.com',
  optionsSuccessStatus: 200 // Para compatibilidad con navegadores más antiguos
};

app.use(cors(corsOptions));

// Configurar body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
app.use('/upload_rfc', uploadRFCRouter);

// Iniciar servidor
app.listen(port, () => {
  console.log(`RFC Server is running at http://149.50.128.198:${port}`);
});
