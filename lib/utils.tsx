import ObjectID from "bson-objectid";

import { Types } from "mongoose";

export const getOrCreateUid = () => {
  let uid: string | null = localStorage.getItem("uid");

  if (uid) {
    if (Types.ObjectId.isValid(uid)) {
      return uid;
    }
  }

  uid = ObjectID().toHexString();
  localStorage.setItem("uid", uid);

  return uid;
};
