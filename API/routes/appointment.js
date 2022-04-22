const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const Post = require("../models/AppointmentSchema");
const router = express.Router();

//Get All appointments in the collection
router.get("/getAll",async(req, res) => {
    try {
    let posts = await Post.find();
    res.status(200).json({
        status: 200,
        data: posts,
    });
    } catch (err) {
    res.status(400).json({
        status: 400,
        message: err.message,
    });
    }
});

//Get All appointments related to a user - get by username
router.get("/getByUsername/:userName",async(req, res)=>{
    try{
        let post = await Post.findOne({
            username: req.params.userName,
        });
        if (post) {  
            res.status(200).json({
              status: 200,
              data: post.registeredCourses,
            });
        }
          else{
            res.status(400).json({
                status: 400,
                message: "No post found",
            });
        }

    } catch (err) {
        res.status(400).json({
            status : 400,
            message :err.message,
        });
    }

});
//Get a specific user-tutor appointment
router.get("/getByUsername/:userName/:tutorName",async(req,res)=>{
    try {
        let post = await Post.findOne({
            username: req.params.userName,
        });
        let filteredRegisteredCourses = post.registeredCourses.filter(function(i){
            return i.tutorName == req.params.tutorName;
        });
        if (post) {  
            res.status(200).json({
              status: 200,
              data: filteredRegisteredCourses,
            });
        }

    } catch (err) {
    res.status(400).json({
        status: 400,
        message: err.message,
        });
    }
});

//Add a new appointment
router.post("/add", async (req, res) => {
  try {
    let post = new Post(req.body);
    post = await post.save();
    res.status(200).json({
      status: 200,
      data: post,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

//Update an appointment
router.put("/update/:userName", async (req, res) => {
    try {
        let post = await Post.findOne({
            username: req.params.userName,
        });
        let updatePost = false;
        if(post){
            updatePost = await Post.findByIdAndUpdate(post._id, req.body, {
                new : true,
            });
        }
        if (updatePost) {  
          res.status(200).json({
            status: 200,
            data: post,
          });
        }
        else{
            res.status(400).json({
                status: 400,
                message: "No post found",
              });
        }
        
      } catch (err) {
        res.status(400).json({
          status: 400,
          message: err.message,
        });
      }
  });

//Delete an appointment
router.delete("/delete/:userName/:tutorName", async (req, res) => {
    try {
        let post = await Post.findOne({
            username: req.params.userName,
        });
        let filteredRegisteredCourses = post.registeredCourses.filter(function(i){
            return i.tutorName != req.params.tutorName;
        });
        post.registeredCourses = filteredRegisteredCourses;
        if(post){
            updatePost = await Post.findByIdAndUpdate(post._id, post, {
                new : true,
            });
        }
        if (post) {  
          res.status(200).json({
            status: 200,
            data: post,
            message : "Appointment deleted successfully",
          });
        }
        else{
            res.status(400).json({
                status: 400,
                message: "No post found",
              });
        }
        
      } catch (err) {
        res.status(400).json({
          status: 400,
          message: err.message,
        });
      }
  });

module.exports = router ;
