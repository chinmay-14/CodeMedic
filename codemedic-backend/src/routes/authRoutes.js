import express from "express";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();

/* SIGNUP */

router.post("/signup", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    /* VALIDATION */

    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({

        success: false,

        message: "All fields are required",

      });

    }

    /* CHECK EXISTING USER */

    const existingUser =
      await User.findOne({
        where: { email },
      });

    if (existingUser) {

      return res.status(400).json({

        success: false,

        message: "User already exists",

      });

    }

    /* HASH PASSWORD */

    const hashedPassword =
      await bcrypt.hash(password, 10);

    /* CREATE USER */

    const user =
      await User.create({

        name,

        email,

        password: hashedPassword,

      });

    /* TOKEN */

    const token = jwt.sign(

      {
        id: user.id,
      },

      "codemedic_secret_key",

      {
        expiresIn: "7d",
      }

    );

    /* RESPONSE */

    res.status(201).json({

      success: true,

      message: "Signup successful",

      token,

      user: {

        id: user.id,

        name: user.name,

        email: user.email,

      },

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Signup failed",

    });

  }

});

/* LOGIN */

router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    /* VALIDATION */

    if (
      !email ||
      !password
    ) {

      return res.status(400).json({

        success: false,

        message: "All fields are required",

      });

    }

    /* FIND USER */

    const user =
      await User.findOne({
        where: { email },
      });

    if (!user) {

      return res.status(400).json({

        success: false,

        message: "User not found",

      });

    }

    /* CHECK PASSWORD */

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({

        success: false,

        message: "Invalid password",

      });

    }

    /* TOKEN */

    const token = jwt.sign(

      {
        id: user.id,
      },

      "codemedic_secret_key",

      {
        expiresIn: "7d",
      }

    );

    /* RESPONSE */

    res.status(200).json({

      success: true,

      message: "Login successful",

      token,

      user: {

        id: user.id,

        name: user.name,

        email: user.email,

      },

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Login failed",

    });

  }

});

export default router;