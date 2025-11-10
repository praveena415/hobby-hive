const Hobby = require('../models/Hobby');

exports.createHobby = async (req,res,next) => {
  try {
    const { title, description, skillLevel, tags } = req.body;
    const hobby = await Hobby.create({ title, description, skillLevel, tags, createdBy: req.user._id });
    res.status(201).json(hobby);
  } catch(err){ next(err); }
};

exports.getHobbies = async (req,res,next) => {
  try {
    const q = req.query.q;
    const filter = {};
    if(q) filter.$text = { $search: q };
    const hobbies = await Hobby.find(filter).limit(50);
    res.json(hobbies);
  } catch(err){ next(err); }
};

exports.getHobby = async (req,res,next) => {
  try {
    const hobby = await Hobby.findById(req.params.id);
    if(!hobby) return res.status(404).json({ message: 'Not found' });
    res.json(hobby);
  } catch(err){ next(err); }
};

exports.updateHobby = async (req,res,next) => {
  try {
    const hobby = await Hobby.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(hobby);
  } catch(err){ next(err); }
};

exports.deleteHobby = async (req,res,next) => {
  try {
    await Hobby.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch(err){ next(err); }
};
