const mongoose = require("mongoose");

// Define the schema for SevaAllocation
const sevaAllocationSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  main_incharge: {
    type: String,
    required: true,
  },
  vice_incharge: {
    type: String,
    required: true,
  },
  scope_of_service: {
    type: String,
    required: true,
  },
});

// Create the model with the schema
const SevaAllocation = mongoose.model("SevaAllocation", sevaAllocationSchema);

// Export the model
module.exports = {SevaAllocation};
