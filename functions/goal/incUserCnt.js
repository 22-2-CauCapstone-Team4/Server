exports = async function (changeEvent) {
  const id = changeEvent.documentKey._id,
    newGoal = changeEvent.fullDocument;

  const Goals = context.services
    .get("mongodb-atlas")
    .db("AppData")
    .collection("Goal");

  const cnt = await Goals.count({ name: newGoal.name });
  await Promise.all([
    Goals.updateMany(
      { name: newGoal.name, $not: { _id: id } },
      { $inc: { userCnt: 1 } }
    ),
    Goals.updateOne({ _id: id }, { $set: { userCnt: cnt + 1 } }),
  ]);
};
