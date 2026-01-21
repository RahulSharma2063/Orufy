const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    quantity: { type: String, required: true },
    mrp: { type: String, required: true },
    price: { type: String, required: true },
    brand: { type: String, required: true },
    exchange: { type: String, default: "Yes" },
    images: [{ type: String }],
    published: { type: Boolean, default: false },
    status: { type: String, default: "unpublished" },
}, { timestamps: true });

productSchema.pre('save', function (next) {
    if (this.published) {
        this.status = 'published';
    } else {
        this.status = 'unpublished';
    }
    next();
});

module.exports = mongoose.model('Product', productSchema);
