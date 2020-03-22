const mongoose = require("mongoose");

const Slide = mongoose.model("slide", { id: Number, title: String });

Slide.find({}, function getData(err, data) {
  return data;
});

module.exports = Slide;
