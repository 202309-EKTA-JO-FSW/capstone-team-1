const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const { getStorage, getDownloadURL } = require("firebase-admin/storage");

// initialize firebase app as admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "capstone-project-486e3.appspot.com",
});

const uploadImage = async (imageFile, imageFolder) => {
  // imageFile will come from request through multer
  try {
    const bucket = admin.storage().bucket();
    const imageBuffer = imageFile.buffer;
    // add the date to the image file name to ignore the dublicated names
    const today = new Date().toLocaleDateString().replace(/\//g, "-");
    // imageFolder is the name of the folder in firebase storage
    const imageName = imageFolder + "/" + today + "_" + imageFile.originalname;
    const file = bucket.file(imageName);
    // saving the image in database
    await file.save(imageBuffer, {
      contentType: imageFile.mimetype,
    });

    // getting imageUrl
    const fileRef = getStorage()
      .bucket("capstone-project-486e3.appspot.com")
      .file(imageName);
    const downloadURL = await getDownloadURL(fileRef);

    return downloadURL;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { uploadImage };
