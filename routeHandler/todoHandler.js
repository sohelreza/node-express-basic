/*
 *
 * Title: Todo Handler File
 * Description: Todo CRUD operations
 * Author: S. M. Sohel Reza (ChefOnline)
 * Date: 08/06/2022
 *
 *
 */

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);
const checkLogin = require("../middlewares/checkLogin");

// GET ALL THE TODOS
router.get("/", checkLogin, (req, res) => {
  Todo.find({ status: "active" })
    .select({
      _id: 0,
      _v: 0,
      date: 0,
    })
    .limit(2)
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Success",
        });
      }
    });
});

// GET ACTIVE TODO
router.get("/active", async (req, res) => {
  const todo = new Todo();

  const data = await todo.findActive();

  res.status(200).json({
    data,
  });
});

// GET ACTIVE TODOS WITH CALLBACK
router.get("/active-callback", (req, res) => {
  const todo = new Todo();

  todo.findActiveByCallback((err, data) => {
    res.status(200).json({ data });
  });
});

// GET ACTIVE TODOS WITH STATIC METHOD
router.get("/js", async (req, res) => {
  const data = await Todo.findByJs();

  res.status(200).json({ data });
});

// GET TODOS BY LANGUAGE
router.get("/language", async (req, res) => {
  const data = await Todo.find().byLanguage("js");

  res.status(200).json({ data });
});

// GET A TODO BY ID
router.get("/:id", async (req, res) => {
  await Todo.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Success",
      });
    }
  });
});

// POST A TODO
router.post("/", (req, res) => {
  const newTodo = new Todo(req.body);

  newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Todo was inserted successfully!",
      });
    }
  });
});

// POST MULTIPLE TODO
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Todos were inserted successfully",
      });
    }
  });
});

// PUT TODO
router.put("/:id", async (req, res) => {
  const result = await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: { status: "active" },
    },
    { new: true, useFindAndModify: false },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Todo was updated successfully",
        });
      }
    }
  );

  console.log(result);
});

// DELETE TODO
router.delete("/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Todo was deleted successfully",
      });
    }
  });
});

module.exports = router;
