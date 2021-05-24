var Userdb = require('../models/User');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        phone : req.body.phone
    })
    // save user in the database
    user
    .save(user)
    .then(data => {
        //res.send(data)
        res.redirect('/');
    })
    .catch(err =>{
        res.status(500).send({
            message : err.message || "Some error occurred while creating a create operation"
        });
    });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{
        Userdb.find()
        .then(user => {
            res.render('home', { users : user });
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
        })
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.redirect('/');
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

exports.delete = (req,res) => {
    Userdb.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
          console.log("DELETION ERROR");
          console.error(err);
          return res.status(400).end();
        }
        res.redirect("/");
      });
}

exports.getUserData = (req,res) => {
    if(req.params.id){
        const id = req.params.id;

        Userdb.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({ message : "Not found user with id "+ id})
            }else{
                res.render('edit',{ id : req.params.id , user:data});
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "Erro retrieving user with id " + id})
        })

    }
}