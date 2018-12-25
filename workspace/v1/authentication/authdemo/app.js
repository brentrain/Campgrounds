var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    PassportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user.js");



var app = express();
mongoose.connect('mongodb://localhost:27017/yourdb', { useNewUrlParser: true });
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
    secret: "all you base are ours",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===============================
//          ROUTES
//===============================


//Root Route

app.get("/", function(req, res){
    res.render("home.ejs");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render('secret');
});

//Auth routes
//Show signup form
app.get("/register", function(req, res){
    res.render("register");
});

//handle User Signup
app.post("/register", function(req,res){
    req.body.username;
    req.body.password;
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("/register");
        } 
            passport.authenticate("local")(req,res, function(){
                res.redirect("/secret");
            });
    });
});

//Login Routes
//render login form
app.get("/login", function(req, res){
    res.render("login");
});
//Login post route
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) , function(req, res){
});

//Logout Route
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

//middleware

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
        res.redirect("/login");
}



//Start the server

app.listen(process.env.PORT, process.env.IP, function(req, res){
   console.log("Port initialized....");
});
