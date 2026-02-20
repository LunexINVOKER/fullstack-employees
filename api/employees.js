import express from "express";
import db from "#db/client";

const router = express.Router();
export default router;

function isValidId(str) {
  return /^\d+$/.test(str);
}

router.get("/", async (req, res, next) => {
  try {
    const { rows } = await db.query("SELECT * FROM employees");
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }
    const { rows } = await db.query("SELECT * FROM employees WHERE id = $1", [Number(req.params.id)]);
    if (!rows.length) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, birthday, salary } = req.body || {};
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    const { rows } = await db.query(
      "INSERT INTO employees (name, birthday, salary) VALUES ($1, $2, $3) RETURNING *",
      [name, birthday, salary]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }
    const { name, birthday, salary } = req.body || {};
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    const { rows } = await db.query(
      "UPDATE employees SET name=$1, birthday=$2, salary=$3 WHERE id=$4 RETURNING *",
      [name, birthday, salary, Number(req.params.id)]
    );
    if (!rows.length) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }
    const { rows } = await db.query("DELETE FROM employees WHERE id=$1 RETURNING *", [Number(req.params.id)]);
    if (!rows.length) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});