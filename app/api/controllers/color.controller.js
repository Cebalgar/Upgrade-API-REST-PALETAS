
const Color = require("../models/Color");//importamos el módelo

const HTTPSTATUSCODE = require("../../utils/httpStatusCode");//importo fichero fallos.


//MÉTODOS

const getAllColors = async (req, res, next) => {
  try {
    
    // if (req.query.page) { //Se le añade paginación
    //     const page = parseInt(req.query.page);
    //     const skip = (page - 1) * 20;
    //     const colors = await Color.find().skip(skip).limit(20);
    //     return res.json({
    //       status: 200,
    //       message: HTTPSTATUSCODE[200],
    //       data: { colors: colors },
    //     });
    //   } else {
        const colors = await Color.find();
        return res.json({
          status: 200,
          message: HTTPSTATUSCODE[200],
          data: { colors: colors },
        });
  //}
     
  } catch (err) {
    return next(err);
  }
};

const getColorById = async (req, res, next) => {
  try {
    const { colorId } = req.params;
    const colorById = await Color.findById(colorId);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: { colors: colorById }
    });
  } catch (err) {
    return next(err);
  }
};

//MÉTODOS POST, PUT, DELETE
const createColor = async(req, res, next)=>{
  try {
    const newColor = new Color();
    newColor.name = req.body.name;
    newColor.hex = req.body.hex;
    newColor.rgb = req.body.rgb;

    const colorDB = await newColor.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: colorDB,
    });
    
  } catch (error) {
    return next(error)
    
  }
};

const modifyColor = async(req , res, next)=>{
  try {
      const {colorId} = req. params;
      const colorModify = new Color(req.body);
      colorModify._id = colorId;
      const colorUpdated = await Color.findByIdAndUpdate(colorId , colorModify,{new: true});
      return res.json({
          status:200,
          message: HTTPSTATUSCODE[200],
          data: colorUpdated,
      });

      
  } catch (error) {
      return next(error);
      
  }
}

const deleteColor = async(req, res, next)=>{
  try {
    const { colorId } = req.params;
    const colorDeleted = await Color.findByIdAndDelete(colorId);
    return res.json({
      status:200,
      message: HTTPSTATUSCODE[200],
      data: colorDeleted
    });
    
  } catch (error) {
    return next(error)
    
  }
};



//Exportamos las funciones
module.exports = {
  getAllColors,
  getColorById,
  createColor,
  modifyColor,
  deleteColor

}