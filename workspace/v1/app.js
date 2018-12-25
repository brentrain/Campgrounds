var express         = require("express"),
     app            = express(),
     bodyParser     = require("body-parser"),
     passport       = require("passport"),
     LocalStrategy  = require("passport-local"),
     mongoose       = require("mongoose"),
     Campground     = require("./models/campground"),
     Comment        = require("./models/comments"),
     User           = require("./models/user"),
     seedDB         = require("./seeds");
     
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");


mongoose.connect("mongodb://localhost:27017/yelp_camp");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();


//Passport Configuration
app.use(require("express-session")({
    secret: "all your base are ours",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});
        
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("./models/campground");
var Comment = require("./models/comments");

//Comments New
router.get("/new", isLoggedIn, function(req, res){
    // find campground by id
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

//Comments Create
router.post("/",isLoggedIn,function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(process.env.PORT, process.env.IP,function(){
    console.log("port initialized....");
});