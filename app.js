//jshint esversion:6
var _ = require('lodash');
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const alert=require("alert");
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let posts=[];
const app = express();
app.get('/',function(rq,rs){

  rs.render("home",{homeStartingContent,posts,phl});
  console.log(rq.body);
});

app.get('/about',function(rq,rs){
  rs.render("about",{aboutContent});
});
app.get('/contact',function(rq,rs){
  rs.render("contact",{contactContent});
});
app.get('/compose',function(rq,rs){
  rs.render("compose");
});
let ul;
let phl;
app.get('/posts/:topic',function(rq,rs){
  posts.forEach(function(item){
    ul=_.lowerCase(rq.params.topic);
    phl=_.lowerCase(item.title);
   if(ul===phl){
     console.log("Match Found");
     let tit=item.title;
     let con=item.content;
     rs.render("post",{tit,con});
   }
   else{
     console.log("Match not found");
   }
 });
 // for(let i=0;i<posts.length;i++){
 //   if(posts[i].title===rq.params.topic){
 //     console.log("Match Found");
 //   }
 //   else if(i===posts.length-1 && posts[i].title!==rq.params.topic){
 //     console.log("Match Not Found");
 //   }
 // }

});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.post('/compose',function(rq,rs){

  var post={
    title:rq.body.postTitle,
    content:rq.body.postBody
  };
  posts.push(post);
  if(rq.body.sbmt && rq.body.postTitle && rq.body.postBody){
    rs.redirect('/');
  }
  else{
    alert("Please fill all the details before submitting");
  }
});
app.set('view engine', 'ejs');











app.listen(1409, function() {
  console.log("Server started on port 1409");
});
