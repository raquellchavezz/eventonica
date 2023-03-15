//configure how we are goig to conenct to our DB

const { Pool } = require("pg"); //pg is a library
const db = new Pool({
  //make an instance of this pool by doing const db = new pool
  connectionString: process.env.DATABASE_URL, //configuration snside
  ssl: process.env.DATABASE_SSL != "false" && {
    rejectUnauthorized: false,
  },
});

module.exports = db;
