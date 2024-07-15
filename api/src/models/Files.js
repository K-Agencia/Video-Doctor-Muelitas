import { Schema, model } from "mongoose";

const Files = Schema(
  {
    namefile: {
      type: String
    },
    path: {
      type: String
    },
    downloads: {
      type: [Date],
      default: undefined
    }
  },
  {
    timestamps: true,
    versionkey: false
  }
)

export default model("Files", Files);