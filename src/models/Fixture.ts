import mongoose from "mongoose";

const FixtureSchema = new mongoose.Schema({}, { strict: false }); // Flexible

export default mongoose.models.Fixture ||
  mongoose.model("Fixture", FixtureSchema);
