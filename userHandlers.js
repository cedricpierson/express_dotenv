const database = require("./database");
  
  const getUsers = (req,res) => {
  
    database
      .query("select * from users")
      .then(([users]) => {
        res.json(users);
        res.status(200);
      })
      .catch(err=>{
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      })
  }
  
  const getUserById = (req, res) => {
    const id = parseInt(req.params.id)
  
    database
      .query("select * from users where id= ?", [id])
      .then(([users]) => {
        if(users[0] != null) {
          res.status(200);
          res.json(users[0]);
        } else {
          res.status(404).send("Not Found")
        }
      })
  }

  const postUser = (req, res) => {
    const { firstname, lastname, email, city, language} = req.body;

    database
      .query("INSERT INTO users (firstname, lastname, email, city, language) VALUES (?,?,?,?,?)", 
      [firstname, lastname, email, city, language]
      )
      .then(([result]) => {
        console.log(result);
        res.location(`/api/users/${result.insertId}`).sendStatus(201);
      })
      .catch((err)=>{
        console.error(err);
        res.status(500).send("Error saving user");
      });
    }
  
  module.exports = {
    getUsers,
    getUserById,
    postUser,
  };
