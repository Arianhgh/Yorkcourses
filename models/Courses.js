import mongoose, {model, Schema, models} from "mongoose";

const CourseSchema = new Schema({
    Name: {
        type: String,
    },
    Description: {
        type: String,
    },
    Prerequisites: {
        type: String,

    },
    ReversePrerequisites: {
        type: String,
    },
});

export const Courses = models.Courses || model("Courses", CourseSchema);