const express = require("express");
const sequelize = require("./config/database");
const Joke = require("./models/joke");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Carambar Jokes API",
      version: "1.0.0",
      description: "API for managing Carambar jokes",
    },
    servers: [{ url: "https://exo-carambar-2.onrender.com" }],
  },
  apis: ["./index.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/**
 * @swagger
 * /jokes:
 *   get:
 *     summary: Retrieve a list of jokes
 *     responses:
 *       200:
 *         description: A list of jokes
 */
app.get("/jokes", async (req, res) => {
  const jokes = await Joke.findAll({
    attributes: {
      include: ["text"],
    },
  });
  const jokesText = jokes.map((item) => item.text);
  res.json(jokesText); // Renvoie un Array de tout les text
});

/**
 * @swagger
 * /jokes/random:
 *   get:
 *     summary: Retrieve a random joke
 *     responses:
 *       200:
 *         description: A random joke
 */
app.get("/jokes/random", async (req, res) => {
  const joke = await Joke.findOne({ order: sequelize.random() });
  res.json(joke);
});

/**
 * @swagger
 * /jokes/{id}:
 *   get:
 *     summary: Retrieve a single joke
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single joke
 */
app.get("/jokes/:id", async (req, res) => {
  const joke = await Joke.findByPk(req.params.id);
  if (joke) {
    res.json(joke);
  } else {
    res.status(404).send("Joke not found");
  }
});

/**
 * @swagger
 * /jokes:
 *   post:
 *     summary: Add a new joke
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Joke created
 */
app.post("/jokes", async (req, res) => {
  const joke = await Joke.create({ text: req.body.text });
  res.status(201).json(joke);
});

// Sync database and start server
sequelize.sync().then(() => {
  const server = app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
  module.exports = server;
});
