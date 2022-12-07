exports = async function ({owner_id, friendId}) {
  const db = context.services.get('mongodb-atlas').db('AppData');

  const userInfoColl = db.collection('UserInfo');
  const friendInfoColl = db.collection('Friend');
  const curStateColl = db.collection('CurState');

  const [myInfo, friendInfo] = await Promise.all([
    userInfoColl.findOne({owner_id}),
    userInfoColl.findOne({owner_id: friendId}),
  ]);
  const [myFriend, myFriendCurState] = await Promise.all([
    friendInfoColl.findOneAndUpdate({owner_id}, {$push: {items: friendInfo}}),
    curStateColl.findOne({owner_id: friendId}),
    friendInfoColl.updateOne(
      {owner_id: friendId},
      {$push: {receivedRequests: myInfo}},
    ),
  ]);

  return {myInfo, friendInfo, myFriend, myFriendCurState};
};