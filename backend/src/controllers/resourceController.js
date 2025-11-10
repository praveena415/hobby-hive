const Resource = require('../models/Resource');

exports.createResource = async (req,res,next) => {
  try {
    const { title, url, description, hobby } = req.body;
    const r = await Resource.create({ title, url, description, hobby, uploadedBy: req.user._id });
    res.status(201).json(r);
  } catch(err){ next(err); }
};

exports.getResourcesByHobby = async (req,res,next) => {
  try {
    const resList = await Resource.find({ hobby: req.params.hobbyId }).limit(50);
    res.json(resList);
  } catch(err){ next(err); }
};

exports.rateResource = async (req,res,next) => {
  try {
    const { score, comment } = req.body;
    const resource = await Resource.findById(req.params.id);
    resource.ratings.push({ user: req.user._id, score, comment });
    await resource.save();
    res.json(resource);
  } catch(err){ next(err); }
};
