exports = async function (email) {
  const userInfos = context.services
    .get("mongodb-atlas")
    .db("AppData")
    .collection("UserInfo");

  try {
    const user = await userInfos.findOne({ email });
    if (!user) return { success: true, isExisted: false };
    else return { success: true, isExisted: true };
  } catch (err) {
    return { success: false, err: err.message };
  }
};
