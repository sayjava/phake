import { compile } from "@sayjava/phake-cli/lib/compile";
export default function handler(req, res) {
  try {
    const { template } = req.body;
    const content = compile({ template });
    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
