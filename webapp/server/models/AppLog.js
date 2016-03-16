import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AppSchema = new Schema({
    title: String,
    descrip: String,
    company: String,
    comments: [{
        comment: String,
        timestamp: Date
    }],
    url: String,
    resume: String
});

export default mongoose.model('AppLog', AppSchema);