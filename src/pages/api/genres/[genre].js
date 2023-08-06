import { getComics } from "..";

export default async (req, res) => {
  try {
    const { query } = req;
    const slug = "/the-loai/" + query.genre;
    const page = query.page ? Number(query.page) : 1;
    const result = await getComics(slug, page);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
