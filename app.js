const mongoose = require("mongoose");
const dotenv = require("dotenv");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");

var indexRouter = require("./routes/index");
//var usersRouter = require('./routes/users');

var creditosRouter = require("./routes/creditos");
var historiaRouter = require("./routes/historia");
var mapaRouter = require("./routes/mapa");
var personagensRouter = require("./routes/personagens");
const app = express();

//Carregar variáveis de ambiente do arquivo .env
dotenv.config();

app.use(express.json());

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso! 🎉"); // Mensagem de sucesso
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err); // Caso dê erro
  });

// Importar as rotas
const postRoutes = require("./routes/postRoutes");
const getRoutes = require("./routes/getRoutes");

// Usar as rotas
app.use("/api", postRoutes);
app.use("/api", getRoutes);
app.use("/personagens", personagensRouter); // Para rotas específicas de personagens

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use("/", indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use("/mapa", mapaRouter);
app.use("/historia", historiaRouter);
app.use("/personagens", personagensRouter);
app.use("/creditos", creditosRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
