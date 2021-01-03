require('dotenv').config()
module.exports ={
  "development": {
    "username": process.env.BDD_USER,
    "password": process.env.BDD_PASSWORD,
    "database": process.env.BDD_NAME,
    "host": process.env.BDD_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.BDD_USER,
    "password": process.env.BDD_PASSWORD,
    "database": process.env.BDD_NAME,
    "host": process.env.BDD_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.BDD_USER,
    "password": process.env.BDD_PASSWORD,
    "database": process.env.BDD_NAME,
    "host": process.env.BDD_HOST,
    "dialect": "mysql"
  }
}
