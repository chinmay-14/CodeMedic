import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import sequelize from "./config/db.js";
import User from "./models/User.js";

/* CONFIG */

dotenv.config();

/* APP */

const app = express();

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

/* ROUTES */

app.use("/api/ai", aiRoutes);

app.use("/api/auth", authRoutes);

/* HOME */

app.get("/", (req, res) => {

  res.send("CodeMedic Backend Running");

});

/* PORT */

const PORT = process.env.PORT || 5000;

/* DATABASE */

sequelize.sync()

  .then(() => {

    console.log("MySQL Connected");

    app.listen(PORT, () => {

      console.log(
        `Server running on port ${PORT}`
      );

    });

  })

  .catch((error) => {

    console.log(error);

  });