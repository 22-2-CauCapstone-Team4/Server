exports = async function (changeEvent) {
  const id = changeEvent.documentKey._id,
    deletedGoal = changeEvent.fullDocument;

  const Goals = context.services
    .get("mongodb-atlas")
    .db("AppData")
    .collection("Goal");

  await Goals.updateMany({ name: deletedGoal.name }, { $inc: { userCnt: -1 } });
};