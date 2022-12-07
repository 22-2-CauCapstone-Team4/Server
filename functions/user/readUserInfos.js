exports = function ({nickname}) {
  const userInfoColl = context.services
    .get('mongodb-atlas')
    .db('AppData')
    .collection('UserInfo');
  const userInfos = userInfoColl.find({nickname: {$regex: `${nickname}`}});

  return { userInfos };
};