/**
 *
 * !!!!!!!!!!!!!  IMPORTANT  !!!!!!!!!!!!!!!!!
 *
 * Please do not modify this file
 *
 */

import { PORT } from "../env";
import app from "./app";
import watch from "../watchfile";


app.listen(PORT, () => {
  console.log(`Listening: http://localhost:${PORT}`);
});

watch();
