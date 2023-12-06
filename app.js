'use strict'

const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 4202;

const admin_route = require('./routes/admin');
const empresa_route = require('./routes/empresa');
const variedad_route = require('./routes/variedad');
const floracion_route = require('./routes/floracion');
const cuaje_route = require('./routes/cuaje');
const aurora_route = require('./routes/aurora');
const produccion_route = require('./routes/produccion');

mongoose.connect(
    "mongodb+srv://aurora:aurora2022@cluster0.0fiw4g9.mongodb.net/aurora_australis",
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        app.listen(port, () => {
          console.log(`Servidor corriendo en el puerto ${port}`);
        });
      }
    }
);

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
    next();
});

//Añadir prefijos a rutas o cargar rutas
app.use('/', express.static('client', { redirect: false }));
app.use("/api", admin_route);
app.use("/api", variedad_route);
app.use("/api", empresa_route);
app.use("/api", cuaje_route);
app.use("/api", floracion_route);
app.use("/api", aurora_route);
app.use("/api", produccion_route);

app.get('*', function (req, res, next) {
  res.sendFile(path.resolve('client/index.html'));
});

module.exports = app;