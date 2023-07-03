import mongoose from "mongoose";

const Schema = mongoose.Schema;

const kpiSchema = new mongoose.Schema({
  dailyData: [{
    "SHIFT DATE\n(dd-mm-yyyy)": {
      type: String,
      required: true
    },
    "SHIFT ID": {
      type: String,
      required: true
    },
    "OPERATOR NAME": {
      type: String,
      required: true
    },
    "DUMPER NO": {
      type: String,
      required: true
    },
    "ASSIGNED TO SHOVEL": {
      type: String,
      required: true
    },
    "LOAD LOCATION\nNAME": {
      type: String,
      required: true
    },
    "MATERIAL": {
      type: String,
      required: true
    },
    "DUMP LOCATION\nNAME": {
      type: String,
      required: true
    },
    "LOAD TONS": {
      type: Number,
      required: true
    }
  }]
});

const KPI = mongoose.model('KPI', kpiSchema);

export default KPI;
