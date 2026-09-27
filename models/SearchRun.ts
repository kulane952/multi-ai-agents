import mongoose, { Schema, models } from "mongoose";

const SearchRunSchema = new Schema({
  query: { type: String, required: true },
  status: { type: String, required: true },
  state: { type: Schema.Types.Mixed, required: true }
}, { timestamps: true });

export const SearchRun = models.SearchRun || mongoose.model("SearchRun", SearchRunSchema);
