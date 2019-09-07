const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  _id: Schema.Types.ObjectId,
  projectNumber: Number,
  projectName: String,
  year: Number,
  location: String,
  contractors: [String],
  recipients: [String],
  reports:[{ type: Schema.Types.ObjectId, ref: 'Report' }]
})

module.exports = Project = mongoose.model('Project', ProjectSchema)