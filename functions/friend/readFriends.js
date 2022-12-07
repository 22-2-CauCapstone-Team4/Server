exports = async function ({owner_id}) {
  const db = context.services.get('mongodb-atlas').db('AppData');

  const curStateColl = db.collection('CurState');
  const friendInfoColl = db.collection('Friend');

  const friendInfo = await friendInfoColl.findOne({owner_id});
  let friendIds = friendInfo.items;
  if (!friendIds) friendIds = [];
  else friendIds = friendIds.map(friend => friend.owner_id);
  const friendCurStates = await curStateColl.find({owner_id: {"$in": friendIds}});

  return {friendInfo, friendCurStates};
};