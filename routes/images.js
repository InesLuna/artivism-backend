const express = require('express');
const router  = express.Router();

//cloudinary API
const uploadCloud = require('../configs/cloudinary-setup.js')

router.post('/upload',
    uploadCloud.single("userImage"), (req, res, next) => {
    // console.log('file is: ', req.file)

    if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
}
  
// get secure_url from the file object and save it in the
// variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
res.json({ secure_url: req.file.secure_url });
})

/* router.post('/multipleUpload',
    uploadCloud.array("userImage", 6), async (req, res, next) => {
       // console.log(req.files)
        const response = req.files
        console.log(req.files)
        const urls = await response.map(element => element.url);
        console.log(urls)
        if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
    }
  
    res.json({ secure_url: urls});
}) */



module.exports = router;