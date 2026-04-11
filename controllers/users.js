const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser,(err)=>{
        if(err){
          return next(err);
        }
        req.flash("success", "Welcome to Meridian!");
        res.redirect("/listings");
      });      
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success" , "Welcome back to Meridian!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl); 
};

const Listing = require("../models/listing");
const Review = require("../models/review");
const Reservation = require("../models/reservation");


module.exports.logout = (req,res)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success","you are logged out!");
    res.redirect("/listings");
  })
};

module.exports.showProfile = async (req, res) => {
    const userListings = await Listing.find({ owner: req.user._id });
    const currentUser = await User.findById(req.user._id).populate('savedListings');
    const userReservations = await Reservation.find({ user: req.user._id }).populate('listing');
    res.render("users/profile.ejs", { 
        listings: userListings, 
        savedListings: currentUser.savedListings || [],
        userReservations: userReservations || []
    });
};

module.exports.toggleSaved = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user._id);
        
        if (user.savedListings.includes(id)) {
            user.savedListings.pull(id);
            req.flash("success", "Listing removed from your wishlist.");
        } else {
            user.savedListings.push(id);
            req.flash("success", "Listing added to your wishlist!");
        }
        
        await user.save();
        const redirectUrl = req.get("Referrer") || `/listings/${id}`;
        res.redirect(redirectUrl);
    } catch(err) {
        req.flash("error", "Cannot save listing.");
        const fallbackUrl = req.get("Referrer") || "/listings";
        res.redirect(fallbackUrl);
    }
};