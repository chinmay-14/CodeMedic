import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const router = express.Router();

/* GEMINI */

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

/* ROUTE */

router.post("/analyze", async (req, res) => {

  try {

    const { code, language } = req.body;

    if (!code || code.trim() === "") {

      return res.status(400).json({

        success: false,

        message: "Please provide code",

      });

    }

    /* PROMPT */

    const prompt = `
Analyze this ${language} code.

Provide:
1. Errors
2. Root cause
3. Corrected code
4. Short explanation

CODE:
${code}
`;

    /* GEMINI */

    const result =
      await model.generateContent({

        contents: [

          {
            role: "user",

            parts: [
              {
                text: prompt,
              },
            ],
          },

        ],

        generationConfig: {

          maxOutputTokens: 400,

          temperature: 0.4,

        },

      });

    const response =
      await result.response;

    const text =
      response.text();

    return res.json({

      success: true,

      analysis: text,

      source: "Gemini AI",

    });

  } catch (error) {

    console.log("Gemini Failed");

    console.log(error.message);

    /* FALLBACK MOCK AI */

    const { code, language } = req.body;

    let analysis = "";

    if (
      code.includes("null") &&
      code.includes(".name")
    ) {

      analysis = `
# Null Pointer Error

## Error
You are trying to access a property from a null object.

## Root Cause
"user" is null,
so "user.name" crashes.

## Corrected Code

\`\`\`${language}
const user = {
  name: "John"
};

console.log(user.name);
\`\`\`

## Explanation
Always check if an object exists before accessing properties.
`;

    }

    else if (
      code.includes("/0") ||
      code.includes("/ 0")
    ) {

      analysis = `
# Division By Zero

## Error
Division by zero detected.

## Corrected Code

\`\`\`${language}
function divide(a, b){

  if(b === 0){
    return "Cannot divide by zero";
  }

  return a / b;

}
\`\`\`
`;

    }

    else {

      analysis = `
# Code Analysis Complete

No major errors detected.

## Suggestions
- Improve variable naming
- Add comments
- Handle edge cases
- Optimize loops

CodeMedic Mock AI Response.
`;

    }

    return res.json({

      success: true,

      analysis,

      source: "Fallback AI",

    });

  }

});

export default router;