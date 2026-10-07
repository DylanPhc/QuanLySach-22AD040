require("dotenv").config();

const MSSV = process.env.MSSV; // 22AD040
const PREFIX = MSSV.slice(-3); // "040"
const lastDigit = parseInt(MSSV.slice(-1), 10); // 0
const VAT = lastDigit + 6; // 6 (%)

module.exports = {
  MSSV,
  HO_TEN: process.env.HO_TEN,
  PREFIX,
  VAT,
};
