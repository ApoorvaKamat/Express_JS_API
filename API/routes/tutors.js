// routes/posts.js

const express = require("express");
const Tutor = require("../models/TutorSchema");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let tutor = new Tutor(req.body);
    tutor = await tutor.save();
    res.status(200).json({
      status: 200,
      data: tutor,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.get("/listTutors", async (req, res) => {
  try {
    let tutors = await Tutor.find();
    res.status(200).json({
      status: 200,
      data: tutors,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.get("/:tutorname", async (req, res) => {
  try {
    let tutor = await Tutor.findOne({
      tutorName: req.params.tutorname,
    });
    if (tutor) {
      res.status(200).json({
        status: 200,
        data: tutor,
      });
    }
    res.status(400).json({
      status: 400,
      message: "No post found",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.put("/:tutorname", async (req, res) => {
  try {
    let tutor = await Tutor.findOneAndUpdate(req.params.tutorname, req.body, 
      {
      new: true,
      });
    if (tutor) {
      res.status(200).json({
        status: 200,
        data: tutor,
      });
    }
    res.status(400).json({
      status: 400,
      message: "No post found",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.delete("/:tutorname", async (req, res) => {
  try {
    let tutor = await Tutor.findOneAndRemove(req.params.tutorname);
    if (tutor) {
      res.status(200).json({
        status: 200,
        message: "Post deleted successfully",
      });
    } else {
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

module.exports = router;