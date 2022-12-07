
exports = async function ({owner_id, friendId, isAccepted}) {
  const db = context.services.get('mongodb-atlas').db('AppData');

  const userInfoColl = db.collection('UserInfo');
  const friendInfoColl = db.collection('Friend');
  const curStateColl = db.collection('CurState');

  const [myInfo, friendInfo] = await Promise.all([
    userInfoColl.findOne({owner_id}),
    userInfoColl.findOne({owner_id: friendId}),
  ]);

  let promises;
  if (isAccepted) {
    promises = Promise.all([
      friendInfoColl.findOneAndUpdate(
        {owner_id},
        {$push: {items: friendInfo}},
        {$pull: {receivedRequests: {$elemMatch: {owner_id: friendId}}}},
      ),
      curStateColl.findOne({owner_id: friendId}),
    ]);
  } else {
    promises = Promise.all([
      friendInfoColl.findOneAndUpdate(
        {owner_id},
        {$pull: {receivedRequests: {$elemMatch: {owner_id: friendId}}}},
      ),
      curStateColl.findOne({owner_id: friendId}),
      friendInfoColl.updateOne(
        {owner_id: friendId},
        {$pull: {items: {$elemMatch: {owner_id}}}},
      ),
    ]);
  }
  const [myFriend, myFriendCurState] = await promises;

  return {myInfo, friendInfo, myFriend, myFriendCurState};
};