
import db from "#db/client";

await db.connect();
await seedEmployees();
await db.end();
console.log("Database seeded.");

async function seedEmployees() {
  await db.query(`
    INSERT INTO employees (name, birthday, salary) VALUES
    ('Alice Johnson', '1990-03-15', 75000),
    ('Bob Smith', '1985-07-22', 82000),
    ('Charlie Brown', '1992-11-08', 68000),
    ('Diana Prince', '1988-01-30', 95000),
    ('Edward Norton', '1995-05-14', 60000),
    ('Fiona Apple', '1991-09-03', 71000),
    ('George Miller', '1987-12-25', 88000),
    ('Hannah Lee', '1993-06-17', 73000),
    ('Ivan Petrov', '1989-04-02', 79000),
    ('Julia Roberts', '1994-08-19', 65000)
  `);
}