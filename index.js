require("dotenv").config();
const errorHandler = require('./middlewares/errorMiddleware')
const connectToDB = require('./config/db')
const express = require("express");

connectToDB()

const app = express();

const goalsRoutes = require("./routes/goalsRoutes");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalsRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App running at ${PORT}`);
});
