const Celebrant = require('../model/Celebrant')
var path = require('path');

//homepage
module.exports.home_get = async(req, res) => {
    res.sendFile(path.resolve("./views/home.html"))
}

module.exports.celebrantpage_get = async (req, res) => {
    const id = req.query.id;
    const celebrant = await Celebrant.findOne({ _id: id })
    if(celebrant) {
        res.status(201).json({data: celebrant})
    }
    res.send("not found")
}

module.exports.createpage_get = (req, res) => {
    res.sendFile(path.resolve("./views/createpage.html"))
}

module.exports.createpage_post = async (req, res) => {
    const { name, message } = req.body
    try{
        const celebrant = await Celebrant.create({ name, message})
        res.status(201).json({data: `http://127.0.0.1:3500/celebrantpage?id=${celebrant._id}`})
    }
    catch (err) {
        res.status(400).json(err)
    }
}
