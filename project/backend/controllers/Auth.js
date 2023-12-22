import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const role = user[0].role;

    const accessToken = jwt.sign(
      { userId, name, email, role },
      process.env.SESS_SECRET,
      {
        expiresIn: "30s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email, role },
      process.env.REFRESH_TOKEN_SECTRET,
      {
        expiresIn: "1d",
      }
    );

    await User.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Email tidak ditemukan" });
  }
};

// export const Login = async (req, res) => {
//   const user = await User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   });
//   if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
//   const match = await argon2.verify(user.password, req.body.password);
//   if (!match) return res.status(400).json({ msg: "Wrong Password" });
//   req.session.userId = user.uuid;
//   const uuid = user.uuid;
//   const name = user.name;
//   const email = user.email;
//   const role = user.role;
//   res.status(200).json({ uuid, name, email, role });
// };

export const logOut = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await User.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);
  const userId = user[0].id;
  await User.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
