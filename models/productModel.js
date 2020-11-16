/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
    },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    countInStock: { type: String, required: true, default: 0 },
    rating: { type: Number, required: true },
    description: { type: String, trim: true },
    numReviews: { type: Number, default: 0, required: true },
    price: { type: Number, required: "A product must have a price" },
    createdAt: { type: Date, default: Date.now(), select: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.index({ slug: 1 });

// DOCUMENT MIDDLEWARE
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

productSchema.post(/^find/, function (docs, next) {
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
