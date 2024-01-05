import app from "./app";

const PORT = process.env.PORT || 6000;

// Start the server...
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}...`);
});
