const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    maSP: { type: String, required: true },
    ten: { type: String, required: true },
    giaGoc: { type: Number, required: true },
    vat: { type: Number, required: true },
    giaSauThue: { type: Number, required: true },
  },
  { collection: "books" },
);

// Kết nối 1: user ĐỌC
const readConn = mongoose.createConnection(process.env.MONGO_READ_URI);
const ReadBook = readConn.model("Book", bookSchema);

// Kết nối 2: user GHI
const writeConn = mongoose.createConnection(process.env.MONGO_WRITE_URI);
const WriteBook = writeConn.model("Book", bookSchema);

module.exports = { ReadBook, WriteBook };
