// image upload middleware
const multer = require('multer');
const sharp = require('sharp');

// set upload storage
const multerStorage = multer.memoryStorage();

// filter image with multer
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please upload images.", false)
    }
}



const upload = multer({ storage: multerStorage,
    fileFilter: multerFilter 
});

// set max upload to 3 images 
const uploadFiles = upload.array("images", 3);

// handle errors
const uploadImages = (req, res, next) => {
    uploadFiles(req, res, err => {
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_UNEXPECTED_FILE") {
                return res.send("Too many files uploaded");
            }
        } else if (err){
            return res.send(err)
        }
        next();
    })
}

// resize image before upload
const resizeImages = async (req, res, next) => {
    if (!req.files) return next();
    req.body.images = [];
    req.body.newFilename = []
    await Promise.all(
        req.files.map(async file => {
            const filename = file.originalname.replace(/\..+$/, "");
            const newFilename = `images-${filename}-${Date.now()}.jpeg`;
            req.body.newFilename.push(newFilename);

            await sharp(file.buffer)
                .resize(640, 320)
                .toFormat("jpeg")
                .jpeg({ quality: 70 })
                .toFile(`uploads/${newFilename}`);
            req.body.images.push(newFilename);
        })
    );
    next();
} 

const getResult = async (req, res, next) => {
    if (req.body.images.length <= 0) {
        return res.send(`You must select atleast 1 image`);
    } else if(req.body.images.length > 3) {
        return res.send(`You cannot select more than 3 images`);

    }
     else{
        const images = req.body.images.map(image => "" + image + "").join("");
    } 
    next();
}

module.exports = {
    uploadImages,
    resizeImages,
    getResult
}