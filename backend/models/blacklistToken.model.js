import mongoose from "mongoose";


const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1d' // Token will automatically be removed after 1 days
    }
});

export const BlacklistToken=mongoose.model('BlacklistToken',blacklistTokenSchema);