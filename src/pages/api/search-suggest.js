import { createRequestPost } from ".";

export default async (req, res) => {
  const { query } = req;
  const q = query.q;
  if (!q) return res.status(400).json({ status: false });
  try {
    const $ = await createRequestPost(q);

    const comics = Array.from($("li")).map((item) => {
      const linkImg = $(item).find("img").attr("src").replace(/\?.*$/, "");
      const thumbnail = `${process.env.API_COMICS}/images?src=` + linkImg;
      const link = $(item).find("a").attr("src");
      const name = $(item).find(".name").text().trim();
      const name_other = $(item).find(".name_other").text().trim();
      const chapter = $(item).find(".search_info p:nth-child(3)").text().trim();
      return {
        link,
        thumbnail,
        name,
        name_other,
        chapter,
      };
    });

    return res.status(200).json({ status: true, comics: comics });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
