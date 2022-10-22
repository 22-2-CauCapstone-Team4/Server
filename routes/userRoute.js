const { Router } = require("express");
const { isValidObjectId } = require("mongoose");
const { User } = require("../models");

const userRouter = Router();

userRouter.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    let { nickname } = req.body;

    // nickname 확인
    if (!nickname || typeof nickname !== "string")
      return res.status(400).send({ err: "nickname is required " });
    nickname = nickname.trim();
    if (nickname.length <= 0 || nickname.length > 8)
      return res
        .status(400)
        .send({ err: "nickname must be a string within 8 chars " });

    // nickname 중복 확인
    const [sameNicknameUser] = await Promise.all([User.findOne({ nickname })]);
    if (sameNicknameUser)
      return res.status(400).send({ err: "nickname must be unique " });

    // 등록
    const user = new User({ ...req.body, userId });
    await user.save();

    res.send({ success: true, user });
  } catch (err) {
    return res.status(400).send({ err: err.message });
  }
});

module.exports = { userRouter };
