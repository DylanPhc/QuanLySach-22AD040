require("dotenv").config();
const express = require("express");
const { engine } = require("express-handlebars");
const config = require("./config");
const { ReadBook, WriteBook } = require("./db");

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const books = await ReadBook.find().lean();
  res.render("books", { books, error: req.query.error, ...config });
});

app.post("/add", async (req, res) => {
  const { maSP, ten, gia } = req.body;
  const giaGoc = Number(gia);

  if (!maSP || !maSP.startsWith(config.PREFIX)) {
    return res.redirect(
      "/?error=" +
        encodeURIComponent(`Mã sản phẩm phải bắt đầu bằng "${config.PREFIX}"`),
    );
  }
  if (!ten || isNaN(giaGoc) || giaGoc < 0) {
    return res.redirect(
      "/?error=" + encodeURIComponent("Dữ liệu không hợp lệ"),
    );
  }

  const giaSauThue = Math.round(giaGoc * (1 + config.VAT / 100));
  await WriteBook.create({ maSP, ten, giaGoc, vat: config.VAT, giaSauThue });
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy ở cổng ${PORT}`));
