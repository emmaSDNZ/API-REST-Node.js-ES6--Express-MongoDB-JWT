import mongoose  from 'mongoose';

const linkSchema = new mongoose.Schema({
    longLink:{
        type: String,
        required: true,
        trim: true,
    },
    nanoLink:{
        type: String,
        required: true,
        trim: true,
    },
    uid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

const Link= mongoose.model("Link",linkSchema )
export default Link
