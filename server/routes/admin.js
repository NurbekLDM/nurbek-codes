const express = require("express");
const router = express.Router();
require("dotenv").config();
const supabase = require("../config/supabase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { serialize, parse } = require("cookie");

// Token generatsiya qilish uchun maxfiy kalitlar
const JWT_SECRET =
  'your-secret-key-for-access-token-1234567890!@#$%^&*';
const JWT_REFRESH_SECRET =
'your-secret-key-for-refresh-token-1234567890!@#$%^&*';

// Token generatsiya qilish funksiyasi
const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

// Admin login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const { data: user, error } = await supabase
    .from("admins")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Parolni tekshirish
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Tokenlar generatsiya qilish
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  console.log("Generated accessToken:", accessToken);
  console.log("Generated refreshToken:", refreshToken);

  // Refresh tokenni saqlash uchun Supabase ga yozish
  await supabase
    .from("admins")
    .update({ refresh_token: refreshToken })
    .eq("id", user.id);

  // Tokenlarni cookielarga saqlash

  const isDevelopment = process.env.NODE_ENV === "development";

  res.setHeader("Set-Cookie", [
    serialize("accessToken", accessToken, {
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: !isDevelopment? "lax" : "none",
      maxAge: 3600,
      path: "/",
    }), // 1 soat uchun
    serialize("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 604800,
      path: "/",
    }), // 7 kun uchun
  ]);

  // Tokenlarni frontendga qaytaramiz
  res.status(200).json({
    message: "Login successful",
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: {
      id: user.id,
      username: user.username,
    },
  });
});

// Token yangilash endpointi
router.post("/refresh", async (req, res) => {
  // Cookielardan refresh token olish
  const cookies = parse(req.headers.cookie || "");
  const refreshToken = cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  try {
    // Refresh token ni tekshirish
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const { userId } = decoded;

    // Foydalanuvchini topish
    const { data: user, error } = await supabase
      .from("admins")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    // Refresh token bazada mavjudligini tekshirish
    if (user.refresh_token !== refreshToken) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    // Yangi access token generatsiya qilish
    const newAccessToken = generateAccessToken(user);

    // .env faylidan NODE_ENV o'zgaruvchisini olish
    const isDevelopment = process.env.NODE_ENV === "development";

    // Yangi access tokenni cookiega qayta yozish
    res.setHeader(
      "Set-Cookie",
      serialize("accessToken", newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 3600,
        path: "/",
      })
    );

    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    return res.status(401).json({ error: "Invalid refresh token" });
  }
});

// api/admin/face-login
router.post("/face-login", async (req, res) => {
  const token = jwt.sign({ user: "face_user" }, JWT_SECRET, { expiresIn: "1h" });

  res.cookie("accessToken", token, {httpOnly: true, maxAge: 3600000});
  res.json({token});
});

module.exports = router;