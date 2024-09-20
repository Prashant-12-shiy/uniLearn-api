import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true,
    }, // Name of the university
    location: {
        type: String,
        required: true,
    }, // City or region of the university
    logo: {
        type: String,
    }, // URL of the university's logo
    description: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return /^(https?:\/\/)?([\da-z.-]+\.)+[a-z]{2,}$/.test(v);
            },
            message: "Please enter a valid URL.",
        },
    }, // URL of the university's official website
    coursesOffered: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        }
    ], // Array of Course IDs related to this university
  },
  {
    timestamps: true,
  }
);

const University = mongoose.model("University", universitySchema);

export default University;