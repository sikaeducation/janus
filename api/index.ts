import app from "./app";

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`App is listening on ${PORT}`);
});
