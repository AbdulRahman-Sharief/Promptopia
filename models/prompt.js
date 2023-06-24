import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required.'],
    },
    tag: {
        type: String,
        require: [true, 'Tag is Required']
    }
})

const Prompt = mongoose.models.Prompt || mongoose.model('Prompt', promptSchema);

export default Prompt;