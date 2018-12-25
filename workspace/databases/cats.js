var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/cat_app");



        var catSchema = new mongoose.Schema({
            name:       String,
            age:        Number,
            breed:      String
        });

var Cat = mongoose.model("cat", catSchema);


//add a new cat to the database

var olivia = new Cat({
        name:       "Betty",
        age:        4,
        breed:      "Leopard"
});

// olivia.save(function(err, cat){
//     if(err) {
//         console.log("ERROR");
//     } else {
//         console.log("We Just added a cat to the database!!");
//         console.log(cat);
//     }
// });

Cat.create({
   name:        "Josie",
   age:         2,
   breed:       "Tiger"
}, function(err, cat){
    if(err) {
        console.log(err);
    } else {
        console.log(cat);
    }
});

//retrieve all cats from the database and console.log each one

Cat.find({}, function(err, cats){
    if(err) {
       console.log("Error");
       console.log(err);
    } else {
        console.log("All Cats")
        console.log(cats);
    }
});

