const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaletteSchema = new Schema(
    {
        name:{type:String, require:true},
        descripcion:{type:String, require:true},
        colors: [{ type: Schema.Types.ObjectId, ref: "colors", required: true }],
        author: { type: Schema.Types.ObjectId, ref: "users", required: true }
    },
    {timestamps:true}
);

const Palette = mongoose.model("palettes",PaletteSchema);

module.exports = Palette;