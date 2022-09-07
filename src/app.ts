/**
 *
 * !!!!!!!!!!!!!  IMPORTANT  !!!!!!!!!!!!!!!!!
 *
 * Please do not modify this file
 *
 */

import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import computeFormula from "./main";

const app: Express = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/compute", (req: Request, res: Response) => {
  try {
    const { formula, inputData } = req.body;

    if (!formula) {
      return res.status(400).json({ message: "'formula' is required" });
    }
    return res
      .status(200)
      .json({ result: computeFormula(formula, inputData || {}) });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default app;
