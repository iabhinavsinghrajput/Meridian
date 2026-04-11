const Listing = require("../models/listing");  //
const Reservation = require("../models/reservation");


module.exports.index = async (req, res) => {
    let { category, q } = req.query;
    let filter = {};
    if (category) {
        filter.category = category;
    }
    if (q) {
        filter.$or = [
            { title: { $regex: q, $options: "i" } },
            { location: { $regex: q, $options: "i" } },
            { country: { $regex: q, $options: "i" } }
        ];
    }
    const allListings = await Listing.find(filter);
    res.render("listings/index.ejs", { allListings, currentCategory: category });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({path: "reviews",
        populate: {
            path: "author",
        },
      })
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let url=req.file.path;
  let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}; 

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", { listing,originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file!== "undefined"){
    let url=req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!req.user || !listing.owner._id.equals(req.user._id)) {
      req.flash("error", "you don't have permission to delete");
      return res.redirect(`/listings/${id}`);
    }
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};

module.exports.renderPaymentPage = async (req, res) => {
    let { id } = req.params;
    let { checkin, checkout } = req.query;
    
    if(!checkin || !checkout) {
        req.flash("error", "Please select valid check-in and check-out dates.");
        return res.redirect(`/listings/${id}`);
    }

    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }

    const inDate = new Date(checkin);
    const outDate = new Date(checkout);
    
    if(outDate <= inDate) {
        req.flash("error", "Check-out date must be after check-in date.");
        return res.redirect(`/listings/${id}`);
    }

    const diffTime = Math.abs(outDate - inDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalPrice = diffDays * listing.price;
    const downpayment = totalPrice * 0.30;

    res.render("listings/payment.ejs", { listing, checkin, checkout, diffDays, totalPrice, downpayment });
};

module.exports.createReservation = async (req, res) => {
    let { id } = req.params;
    let { checkin, checkout, totalPrice, downpayment } = req.body;

    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing does not exist!");
      return res.redirect("/listings");
    }

    const newReservation = new Reservation({
        user: req.user._id,
        listing: listing._id,
        checkIn: new Date(checkin),
        checkOut: new Date(checkout),
        totalPrice: Number(totalPrice),
        downpayment: Number(downpayment),
        status: "Reserved"
    });

    await newReservation.save();

    req.flash("success", "Your seat is reserve!");
    res.redirect(`/profile`);
};
