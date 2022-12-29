const Celebrant = require('../model/Celebrant')
var path = require('path');
var fs = require('fs');
const { promisify } = require("util")
const unlinkAsync = promisify(fs.unlink)




//homepage
module.exports.home_get = async (req, res) => {
    res.sendFile(path.resolve("./views/home.html"))
}

module.exports.celebrantpage_get = async (req, res) => {
    const id = req.query.id;
    const celebrant = await Celebrant.findOne({ _id: id })
    if (celebrant) {
        res.status(201).json({ data: celebrant })
    }
    res.send("not found")
}

module.exports.createpage_get = (req, res) => {
    res.sendFile(path.resolve("./views/createpage.html"))
}

// module.exports.createpage_post = async (req, res) => {
//     const { name, message, type, dateOfBirth } = req.body
//     const expireAt = dateOfBirth
//     try{
//         const celebrant = await Celebrant.create({ name, message, type, dateOfBirth, expireAt})
//         res.status(201).json({data: `http://127.0.0.1:3500/celebrantpage?id=${celebrant._id} ${celebrant.dateOfBirth}`})
//     }
//     catch (err) {
//         res.status(400).json(err)
//     }
// }


module.exports.createpage_post = async (req, res) => {

    const newFileName = req.body.newFilename;
    console.log("-------------------------"  + newFileName)
    var obj = {
        name: req.body.name,
        message: req.body.message,
        type: req.body.type,
        dateOfBirth: req.body.dateOfBirth,
        expireAt: req.body.dateOfBirth,
        // img: newFileName.map(fileName => {
        //     return (image = {
        //         data: fs.readFileSync(path.join(`uploads/${fileName}`)),
        //         contentType: 'image/png'
        //     })
        // })
        
        img: {image1 :{
            data: fs.readFileSync(path.join(`uploads/${req.body.newFilename[0]}`)),
            contentType: 'image/png'
        },
        image2 :{
            data: fs.readFileSync(path.join(`uploads/${req.body.newFilename[1]}`)),
            contentType: 'image/png'
        },
        image3 :{
            data: fs.readFileSync(path.join(`uploads/${req.body.newFilename[2]}`)),
            contentType: 'image/png'
        }
    }
    }

    try {
        const celebrant = await Celebrant.create(obj)
    // delete from upload folder after upload
        if(celebrant._id){
            req.body.newFilename.map( (filename) =>{
                 unlinkAsync(path.join(`uploads/${filename}`))
                 console.log(filename);
            })
        }
        res.status(201).json({ data: `http://127.0.0.1:3500/celebrantpage?id=${celebrant._id} ` })
    }
    catch (err) {
        res.status(400).json(err)
    }
    }

    module.exports.checkusers_get = async (req, res) => {
        try {
            const celebrant = await Celebrant.find({});
            res.render('imagesPage', {items: celebrant})
        } catch (error) {
            res.status(400).json(err)
        }
    }
