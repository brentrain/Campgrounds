var mongoose        = require("mongoose"),
    Campground      = require("./models/campground");
    Comment         = require("./models/comments");
var data = [
    {
        name:  "Fishing Creek", 
        image: "https://images.pexels.com/photos/1260325/pexels-photo-1260325.jpeg?cs=srgb&dl=creek-forest-nature-1260325.jpg&fm=jpg",
        description:  "Spicy jalapeno bacon ipsum dolor amet beef chicken velit cupim. Shank chuck pork belly aliquip brisket pork loin shankle ball tip drumstick landjaeger tenderloin. Reprehenderit ham hock minim elit rump kevin. Landjaeger exercitation ex, pancetta est pariatur shankle irure et ad turducken jowl. Boudin hamburger dolore, tenderloin elit sunt chuck ut commodo pig andouille eiusmod. Ut prosciutto tail short loin."
    },
    {
        name:  "Omega Park", 
        image: "https://images.pexels.com/photos/884186/pexels-photo-884186.jpeg?cs=srgb&dl=creek-daytime-environment-884186.jpg&fm=jpg",
        description:  "Spicy jalapeno bacon ipsum dolor amet salami pork loin porchetta shankle sed, swine occaecat turkey in. Laboris doner ad cillum flank, tri-tip kevin andouille. Qui jowl proident nostrud drumstick laborum ham hock venison excepteur adipisicing pancetta ham pork belly. Bacon short ribs spare ribs tail, enim id landjaeger pig. Dolore aliqua exercitation kielbasa fatback, nostrud eu nulla pork belly."
    },
    {
        name:  "Pulaski Park", 
        image: "https://images.pexels.com/photos/2336/trees-grass-lawn-park.jpg?cs=srgb&dl=autumn-fall-golf-2336.jpg&fm=jpg",
        description:  "Spicy jalapeno bacon ipsum dolor amet salami pork loin porchetta shankle sed, swine occaecat turkey in. Laboris doner ad cillum flank, tri-tip kevin andouille. Qui jowl proident nostrud drumstick laborum ham hock venison excepteur adipisicing pancetta ham pork belly. Bacon short ribs spare ribs tail, enim id landjaeger pig. Dolore aliqua exercitation kielbasa fatback, nostrud eu nulla pork belly."
    }
    
    ]
    
function seedDB() {
    //Remove all Campgrounds
            Campground.remove({}, function(err){
            if(err) {
                console.log(err);
            } else {
                console.log("Campground Removed");
                                  //Add Campgrounds
                         data.forEach(function(seed){
                         Campground.create(seed, function(err, campground){
                             if(err) {
                                 console.log(err);
                             } else {
                                 console.log("added a campground");
                                 //Create a comment
                                 Comment.create(
                                     {
                                         text:  "The Beaches are really really nice!",
                                         author: "Brent"
                                     }, function(err, comment){
                                         if(err) {
                                             console.log(err)
                                         } else {
                                         campground.comments.push(comment);
                                         campground.save();
                                         console.log("Comment Added");
                                         }
                                     });
                             }
                         });
        });
            }
        });
  
       
        //Add a few comments
}

module.exports = seedDB;
    

