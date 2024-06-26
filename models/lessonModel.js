const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
  },
  type: {
    type: String,
    required: [true, "lesson's type is required"],
    enum: ["recorded", "file"],
    default: "recorded",
  },
  image: {
    type: String,
    required: [true, "Lesson image is required"],
  },
  videoUrl: {
    type: String,
    required: true,
  },
  attachment: {
    type: String,
  },
});

const setImageURL = (doc) => {
  //return image base url + iamge name
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/lessons/images/${doc.image}`;
    doc.image = imageUrl;
  }
  if (doc.attachment) {
    const attachmentUrl = `${process.env.BASE_URL}/lessons/files/${doc.attachment}`;
    doc.attachment = attachmentUrl;
  }
};
//after initializ the doc in db
// check if the document contains image
// it work with findOne,findAll,update
lessonSchema.post("init", (doc) => {
  setImageURL(doc);
});
// it work with create
lessonSchema.post("save", (doc) => {
  setImageURL(doc);
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
