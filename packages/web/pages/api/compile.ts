export default function handler(req, res) {
  const { template } = req.body;
  console.log(template);
  res.status(200).json({ template: "Template compiled" });
}
