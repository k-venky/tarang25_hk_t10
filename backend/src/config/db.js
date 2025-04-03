
const { Client } = require("pg");

const client = new Client({
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  connectionLimit: 500,
  insecureAuth: true,
})
client.connect(function (err) {
  if (err) throw err;
  console.log("DB Connected!");
});


module.exports = {
    pool: client
  }

