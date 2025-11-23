const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
    {
        title: String,
        completion: {
            type: Date,
            default: Date.now,
            immutable: true
        },
        description: string
    },
    {
        collection: "projects"
    }
);

module.exports = mongoose.model("Project", ProjectSchema);