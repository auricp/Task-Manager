import mongoose from "mongoose";


const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
      },
      expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 } // TTL index: automatically remove expired documents
      }
})

const Blacklist = mongoose.model('Blacklist', blacklistSchema);

export default Blacklist;