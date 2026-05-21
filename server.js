const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const mongoose = require("mongoose");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= MONGODB CONNECTION =================
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/student-ai"
  )
  .then(() => {
    console.log(
      "✅ MongoDB Connected"
    );
  })
  .catch((err) => {
    console.log(err);
  });

// ================= MONGODB SCHEMA =================
const saveSchema =
  new mongoose.Schema({
    text: String,
    notes: String,
    quiz: Array,
    flashcards: Array,
  });

const SaveModel =
  mongoose.model(
    "SavedData",
    saveSchema
  );

// ================= MULTER =================
const upload = multer({
  dest: "uploads/",
});

// ================= HOME =================
app.get("/", (req, res) => {
  res.send(
    "Backend Running Successfully"
  );
});

// ================= FILE UPLOAD =================
app.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {

    try {

      console.log(
        "UPLOAD API CALLED"
      );

      console.log(req.file);

      if (!req.file) {

        return res
          .status(400)
          .json({
            error:
              "No file uploaded",
          });
      }

      const filePath =
        req.file.path;

      const originalName =
        req.file.originalname.toLowerCase();

      let extractedText = "";

      // ================= PDF =================
      if (
        originalName.endsWith(
          ".pdf"
        )
      ) {

        const dataBuffer =
          fs.readFileSync(
            filePath
          );

        const data =
          await pdfParse(
            dataBuffer
          );

        extractedText =
          data.text;
      }

      // ================= DOCX =================
      else if (
        originalName.endsWith(
          ".docx"
        )
      ) {

        const result =
          await mammoth.extractRawText(
            {
              path: filePath,
            }
          );

        extractedText =
          result.value;
      }

      // ================= TXT =================
      else if (
        originalName.endsWith(
          ".txt"
        )
      ) {

        extractedText =
          fs.readFileSync(
            filePath,
            "utf8"
          );
      }

      // ================= PPT/PPTX =================
      else if (
        originalName.endsWith(
          ".ppt"
        ) ||
        originalName.endsWith(
          ".pptx"
        )
      ) {

        extractedText =
          "PPT/PPTX upload successful. Convert slides to PDF for text extraction.";
      }

      // ================= UNKNOWN =================
      else {

        extractedText =
          "Unsupported file format.";
      }

      // delete uploaded file
      fs.unlinkSync(filePath);

      res.json({
        text: extractedText,
      });

    } catch (error) {

      console.log(
        "FULL ERROR BELOW"
      );

      console.log(error);

      res.status(500).json({
        error:
          "File processing failed",
      });
    }
  }
);

// ================= SAVE DATA =================
app.post(
  "/save",
  async (req, res) => {

    try {

      const newData =
        new SaveModel(
          req.body
        );

      await newData.save();

      res.json({
        message:
          "Saved Successfully",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error:
          "Save failed",
      });
    }
  }
);

// ================= GET ALL DATA =================
app.get(
  "/all",
  async (req, res) => {

    try {

      const data =
        await SaveModel.find();

      res.json(data);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error:
          "Failed to fetch data",
      });
    }
  }
);

// ================= START SERVER =================
const PORT = 5000;

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );
});