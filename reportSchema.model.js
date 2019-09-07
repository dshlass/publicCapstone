const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  _id: Schema.Types.ObjectId,
  reportNumber: Number,
  weather: String,
  date: String,
  time:String,
  deficienciesNoted: [ String ],
  miscellaneousNotes: [ String ],
  purposeOfReview: [ String ],
  photos:[{ type: Schema.Types.ObjectId, ref: 'Photos' }],
  workCompleted: [{ 
    notes: [String], 
    title: String 
  }],
});

module.exports = Report = mongoose.model('Report', ReportSchema)