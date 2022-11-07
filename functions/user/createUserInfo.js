exports = async function ({id, email, nickname}) {
  const userInfos = context.services
    .get('mongodb-atlas')
    .db('AppData')
    .collection('UserInfo');

  const customUserData = {
    userId: id,
    email,
    nickname,
  };

  try {
    await userInfos.insertOne(customUserData);
  } catch (err) {
    return {success: false, err: err.message};
  }

  return {customUserData};
};
