import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully 🔗");
    });

    let mogodbURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
    const projectName = "resume-builder";

    if (typeof mogodbURI !== "string" || mogodbURI.trim() === "") {
      mogodbURI = "mongodb://127.0.0.1:27017";
      console.warn(
        "MONGODB_URI not set — falling back to localhost MongoDB at mongodb://127.0.0.1:27017"
      );
    }

    // Remove trailing slash
    if (mogodbURI.endsWith("/")) {
      mogodbURI = mogodbURI.slice(0, -1);
    }

    // If the provided URI already contains a database name (e.g. mongodb://host:port/dbname or mongodb+srv://.../dbname),
    // use it as-is. Otherwise append the project database name.
    const parts = mogodbURI.split("/");
    const hasDbName = parts.length >= 4 && parts[3].trim() !== "";

    const connectString = hasDbName ? mogodbURI : `${mogodbURI}/${projectName}`;

    await mongoose.connect(connectString, {
      // recommended options for mongoose 6+ are defaults, but keep this object for future tweaks
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
