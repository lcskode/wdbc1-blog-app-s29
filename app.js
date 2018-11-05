/******************************************************************************
GLOBAL DECLARATIONS
******************************************************************************/
var express       = require("express"),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    app           = express();



/******************************************************************************
APP CONFIG
******************************************************************************/
// use restul_blog_app db if exists, if not, it will create restul_blog_app.
mongoose.connect("mongodb://localhost/restful_blog_app");
// tell Express to drop .ejs on all ejs templates
app.set("view engine", "ejs");
// tell express to use/serve the contents of public folder
app.use(express.static("public"));
// use body-parser to extract data from a form
app.use(bodyParser.urlencoded({extended: true}));



/******************************************************************************
MONGOOSE/MODEL CONFIG 
******************************************************************************/
// Schema setup
var blogSchema = new mongoose.Schema({
  title: String,
  image: String, 
  body: String,
  // this will get the date/time stamp once added to db.
  created: {type: Date, default: Date.now}
});

// use blogschema
var Blog = mongoose.model("Campground", blogSchema);

// create dummy data to save on db
// Blog.create(
//   {
//     title: "Test Blog",
//     image: "https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=61a38f22baeb6a00be6663ab28dc5274&auto=format&fit=crop&w=1049&q=80",
//     body: "HELLO, THIS IS A BLOG POST!"
//     // created: should be blank as it will auto stamp date"
//   }, function(err, blog){
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Newly created blog: ");
//       console.log(blog);
//     }
// });

/******************************************************************************
RESTFUL ROUTES 
******************************************************************************/
// ROOT route - redirect to /blogs
app.get("/", function(req, res){
  res.redirect("/blogs");
});

// INDEX route
app.get("/blogs", function(req, res){
  // list all blogs from db
  Blog.find({}, function(err, blogs){
    if (err) {
      console.log(err);
    } else {
      res.render("index", {blogs: blogs});    
    }
  });
});



/******************************************************************************
SERVER 
******************************************************************************/
app.listen(3000, function(){
  console.log("restful blog app server has started...");
});