exports = async function ({owner_id, email, nickname}) {
  const db = context.services
    .get("mongodb-atlas")
    .db("AppData");
    
  const userInfos = db.collection("UserInfo");
  const friends = db.collection("Friend");

  const customUserData = {
    owner_id,
    email,
    nickname,
  };

  try {
    await Promise.all([userInfos.insertOne(customUserData), friends.insertOne({owner_id})]);
  } catch (err) {
    return { success: false, err: err.message };
  }

  return { success: true, customUserData };
};
