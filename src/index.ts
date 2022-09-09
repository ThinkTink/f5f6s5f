/**
 *
 * !!!!!!!!!!!!!  IMPORTANT  !!!!!!!!!!!!!!!!!
 *
 * Please do not modify this file
 *
 */

import app from "./app";

const port = process.env.PORT ?? 8080;

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
