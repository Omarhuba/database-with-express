const express = require("express");
const app = express();
const { PromisedDatabase } = require("promised-sqlite3");

const db = new PromisedDatabase();

const PORT = 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  await db.open("./database/messages.db");
  const departments = await db.all("SELECT * FROM departments");
  console.log(departments);
  await db.close();
  res.render("home", { departments });
});



app.get("/showMessage", async (req, res) => {
    await db.open("./database/messages.db");
    const messages = await db.all("SELECT * FROM messages");
    console.log(messages);
    await db.close();
    res.render('showMessage', {messages});
  });



app.post("/message", async (req, res) => {
  const { to_department, email, title, question } = req.body;
//   console.log(req.body);
  await db.open("./database/messages.db");
  const query = `INSERT INTO messages(email,title,content,department_id,answered) VALUES (?,?,?,?,0)`;
  await db.run(query, [email, title, question, to_department]);
  await db.close();
  res.redirect("/thanks");
});

app.get("/thanks", (req, res) => {
  res.render("thanks");
});



app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT : ${PORT}`));
