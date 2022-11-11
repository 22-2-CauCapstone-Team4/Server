exports = async function ({owner_id, email, nickname}) {
  const userInfos = context.services
    .get("mongodb-atlas")
    .db("AppData")
    .collection("UserInfo");

  const customUserData = {
    owner_id,
    email,
    nickname,
  };

  try {
    await userInfos.insertOne(customUserData);
  } catch (err) {
    return { success: false, err: err.message };
  }

  return { success: true, customUserData };
};
