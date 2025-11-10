const Group = require('../models/Group');

exports.createGroup = async (req,res,next) => {
  try {
    const { name, hobby, description } = req.body;
    const group = await Group.create({ name, hobby, description, admins: [req.user._id], members: [req.user._id] });
    res.status(201).json(group);
  } catch(err){ next(err); }
};

exports.getGroup = async (req,res,next) => {
  try {
    const g = await Group.findById(req.params.id).populate('members admins');
    if(!g) return res.status(404).json({ message: 'Not found' });
    res.json(g);
  } catch(err){ next(err); }
};

exports.joinGroup = async (req,res,next) => {
  try {
    const g = await Group.findById(req.params.id);
    if(!g) return res.status(404).json({ message: 'Group not found' });
    if(!g.members.includes(req.user._id)) {
      g.members.push(req.user._id);
      await g.save();
    }
    res.json(g);
  } catch(err){ next(err); }
};

exports.leaveGroup = async (req,res,next) => {
  try {
    const g = await Group.findById(req.params.id);
    g.members = g.members.filter(m => m.toString() !== req.user._id.toString());
    await g.save();
    res.json({ message: 'Left group' });
  } catch(err){ next(err); }
};
