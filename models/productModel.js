import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, unique: true, lowercase: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: mongoose.ObjectId, ref: "Category", required: true },
        image: { data: Buffer, contentType: String },
        quantity: { type: Number, required: true },
        shipping: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Pre-save hook to generate slug from name
productSchema.pre("save", function () {
    if (this.isModified("name")) {
        this.slug = slugify(this.name, { lower: true });
    }
});

export default mongoose.model("Product", productSchema);
