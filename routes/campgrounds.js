const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds.js');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware.js');

const multer  = require('multer')
const { storage } = require('../cloudinary')
const upload = multer( {storage} ) 

router.route('/')
    .get(campgrounds.index)
    .post(isLoggedIn, upload.array('image'), validateCampground, campgrounds.createCampground)
    // .post(upload.array('image'), (req,res) => {
    //     console.log(req.body, req.files);
    //     res.send('it worked')
    // })

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(campgrounds.showCampground)
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, campgrounds.editCampground)
    .delete(isLoggedIn, isAuthor, campgrounds.deleteCampground)


router.get("/edit/:id", isLoggedIn, isAuthor, campgrounds.renderEditForm)

module.exports = router;