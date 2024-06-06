const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const isAuthenticated = require("../middlewares/isAuthenticated");

const prisma = new PrismaClient();

router.get("/find", isAuthenticated, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });

    if (!user) {
      res.status(440).json({ error: "ユーザーが見つかりませんでした。" });
    }

    res.status(200).json({
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/profile/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("プロフィール検索" + req);
  console.log("プロフィール検索" + userId);

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: parseInt(userId) },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!profile) {
      console.log("プロフィールが見つかりませんでした。");
      return res
        .status(404)
        .json({ message: "プロフィールが見つかりませんでした。" });
    }
    console.log("プロフィールが見つかりました。" + userId);
    res.status(200).json(profile);
  } catch (err) {
    console.log("プロフィール検索err");
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
