import asyncHandler from "express-async-handler";

const upload = asyncHandler(async (req, res) => {
  const { file } = req;
  console.log(file);
  if (file) {
    res.send(file.filename);
  } else {
    res.status(400);
    throw new Error("File uploading failed");
  }
});

export { upload };
