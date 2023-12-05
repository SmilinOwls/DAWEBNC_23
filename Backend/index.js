const express = require("express");

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const passport = require("passport");
const session = require("express-session");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const placeRouter = require("./routes/place");
const roomRouter = require("./routes/room");
const siteRouter = require("./routes/site");
const blogRouter = require("./routes/blog");
const bookingRouter = require("./routes/booking");

dotenv.config();
require("./services/passport");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000/",
  })
);

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(cookieParser());
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

const publicPath = path.join(__dirname, "./public");
app.use("/public", express.static(publicPath));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads");
  },
});

const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/avatars");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname); // dặt lại tên cho file
  },
});

const photoMiddleware = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const extensionImageList = [".png", ".jpg", ".jpeg", ".webp"];
    const extension = file.originalname.slice(-4);
    const check = extensionImageList.includes(extension);
    if (check) {
      cb(null, true);
    } else {
      cb(new Error("extention không hợp lệ"));
    }
  },
});

const avatarMiddlewware = multer({
  storage: avatarStorage,
  fileFilter: function (req, file, cb) {
    const extensionImageList = [".png", ".jpg", ".jpeg", "svg"];
    const extension = file.originalname.slice(-4);
    const check = extensionImageList.includes(extension);
    if (check) {
      cb(null, true);
    } else {
      cb(new Error("extention không hợp lệ"));
    }
  },
});

app.post(
  "/api/upload-photo",
  photoMiddleware.array("photos", 100),
  (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath);
    }
    res.status(200).json(uploadedFiles);
  }
);

app.post(
  "/api/user/upload-avatar",
  avatarMiddlewware.single("avatar"),
  (req, res) => {
    const { file } = req;
    const urlImage = `${file.path}`;
    try {
      res.status(200).json({
        profilePic: urlImage,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

app.post(
  "/api/upload-room",
  photoMiddleware.array("photoRooms", 100),
  (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath);
    }
    res.status(200).json(uploadedFiles);
  }
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/place", placeRouter);
app.use("/api/room", roomRouter);
app.use("/api/site", siteRouter);
app.use("/api/blog", blogRouter);
app.use("/api/book", bookingRouter);

const PORT = process.env.PORT || 5000;
const URI = process.env.DB_URL;

mongoose.set("strictQuery", false);
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
