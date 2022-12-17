export default function setIsPreview(req, res) {
  const secretToken = process.env.NEXT_PUBLIC_DASHBOARD_SECRET_TOKEN;
  const { token } = req.query;
  const match = secretToken === token;

  if (!match) {
    res.redirect("/404");
    return;
  }
  res.setPreviewData({});
  res.redirect("/admin/dashboard/login");
}
