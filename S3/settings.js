const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secreteAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.S3_BUCKET_NAME,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      //  req.middleware = { userId: Ids[0].id };

      // Coleta ID do usuário:
      const userId = req.middleware.userId;

      // Coleta nome "place":
      const place = req.body.place;

      // Pega extensão do arquivo:
      const extension = file.originalname.split(".").pop();

      // Finalmente criamos o nome do arquivo:
      const fileName =
        `rememorize/user-${userId}/${place}-${Date.now()}.${extension}`
          .replace(/\s+/g, "-")
          .toLowerCase();

      cb(null, fileName);
    },
  }),
});

module.exports = {
  s3Client,
  upload,
};
