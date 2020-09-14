export default {
  id: "default",
  url: process.env.DEFAULT_URL || "mongodb+srv://<user>:<pass>@cluster0-i6jbp.mongodb.net/<dbName>?w=majority&retryWrites=true",
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
