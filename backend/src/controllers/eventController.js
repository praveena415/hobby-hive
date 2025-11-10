const Event = require('../models/Event');

exports.createEvent = async (req,res,next) => {
  try {
    const ev = await Event.create({ ...req.body, organizer: req.user._id });
    res.status(201).json(ev);
  } catch(err){ next(err); }
};

exports.getEvents = async (req,res,next) => {
  try {
    const { hobby, near } = req.query;
    const filter = {};
    if(hobby) filter.hobby = hobby;
    const events = await Event.find(filter).limit(50);
    res.json(events);
  } catch(err){ next(err); }
};

exports.getEvent = async (req,res,next) => {
  try {
    const ev = await Event.findById(req.params.id).populate('organizer');
    if(!ev) return res.status(404).json({ message: 'Not found' });
    res.json(ev);
  } catch(err){ next(err); }
};

exports.rsvp = async (req,res,next) => {
  try {
    const ev = await Event.findById(req.params.id);
    if(!ev) return res.status(404).json({ message: 'Not found' });
    const exists = ev.rsvps.find(r => r.user.toString() === req.user._id.toString());
    if(!exists) {
      ev.rsvps.push({ user: req.user._id, status: 'going', respondedAt: new Date() });
      await ev.save();
    }
    res.json(ev);
  } catch(err){ next(err); }
};
