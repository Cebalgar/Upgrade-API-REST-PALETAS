const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColorSchema = new Schema(
    {
        hex:{type:String, require:true},
        name:{type:String, require:true},
        rgb:{type:String, require:true},
    },
    {timestamps:true}
);

const Color = mongoose.model("colors",ColorSchema);

module.exports = Color;