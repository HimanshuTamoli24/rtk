import { Schema, model } from 'mongoose';
const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

}, {
    timestamps: true,
}
)
const Todo = model("Todo",todoSchema)
export default Todo;