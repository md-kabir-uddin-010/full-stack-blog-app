export default function removePreviewData(req, res) {
  res.clearPreviewData();
  res.redirect("/");
}
