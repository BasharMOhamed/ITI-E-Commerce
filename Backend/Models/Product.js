const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema([
    {
      id:  { type: mongoose.Schema.Types.Number, required: true },
      title:  { type: mongoose.Schema.Types.String, required: true },
      description: { type: mongoose.Schema.Types.String, required: true },
      category: { type: mongoose.Schema.Types.String, required: true },
      price: { type: mongoose.Schema.Types.Number, required: true },
      discountPercentage:{ type: mongoose.Schema.Types.Number, required: true },
      rating: { type: mongoose.Schema.Types.Number, required: true },
      stock: { type: mongoose.Schema.Types.Number, required: true },
      tags: [{ type: mongoose.Schema.Types.String, required: true }],
      brand: { type: mongoose.Schema.Types.String, required: false },
      sku: { type: mongoose.Schema.Types.String, required: true },
      weight: { type: mongoose.Schema.Types.Number, required: true },
      dimensions: {
        width: { type: mongoose.Schema.Types.Number, required: true },
        height: { type: mongoose.Schema.Types.Number, required: true },
        depth:{ type: mongoose.Schema.Types.Number, required: true }
      },
      warrantyInformation: { type: mongoose.Schema.Types.String, required: true },
      shippingInformation: { type: mongoose.Schema.Types.String, required: true },
      availabilityStatus:{ type: mongoose.Schema.Types.String, required: true },
      reviews: [{
        rating: { type: mongoose.Schema.Types.Number, required: true },
        comment: { type: mongoose.Schema.Types.String, required: true },
        date: { type: mongoose.Schema.Types.String, required: true },
        reviewerName: { type: mongoose.Schema.Types.String, required: true },
        reviewerEmail: { type: mongoose.Schema.Types.String, required: true }
      }],
      returnPolicy: { type: mongoose.Schema.Types.String, required: true },
      minimumOrderQuantity: { type: mongoose.Schema.Types.Number, required: true },
      meta: {
        createdAt: { type: mongoose.Schema.Types.String, required: true },
        updatedAt: { type: mongoose.Schema.Types.String, required: true },
        barcode:{ type: mongoose.Schema.Types.String, required: true },
        qrCode:{ type: mongoose.Schema.Types.String, required: true }
      },
      images: [{ type: mongoose.Schema.Types.String, required: true }],
      thumbnail: { type: mongoose.Schema.Types.String, required: true }
    },]);

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;