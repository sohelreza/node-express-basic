const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// INSTANCE METHODS
todoSchema.methods = {
  findActive: function () {
    return mongoose.model("Todo").find({ status: "active" });
  },
  findActiveByCallback: function (callback) {
    return mongoose.model("Todo").find({ status: "active" }, callback);
  },
};

// STATIC METHODS
todoSchema.statics = {
  findByJs: function () {
    return this.find({ title: /js/i });
  },
};

// QUERY HELPERS
todoSchema.query = {
  byLanguage: function (language) {
    return this.find({ title: new RegExp(language, "i") });
  },
};

module.exports = todoSchema;
