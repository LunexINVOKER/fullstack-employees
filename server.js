import app from "#app";
import db from "#db/client";

await db.connect();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});