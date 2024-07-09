import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    subCognito: {
      type: String
    },
    fa_firstname: {
      type: String
    },
    fa_lastname: {
      type: String
    },
    mo_firstname: {
      type: String
    },
    mo_lastname: {
      type: String
    },
    ch_firstname: {
      type: String
    },
    ch_lastname: {
      type: String
    },
    ch_birthday: {
      type: Date
    },
    correo: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model('User', User);