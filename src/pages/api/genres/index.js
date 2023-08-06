import { createRequest, getGenreId } from "..";

export default async (req, res) => {
  try {
    const $ = await createRequest("/");
    const genres = Array.from(
      $("#header_left_menu > li:nth-child(2) > div > div > div > p > a")
    ).map((item) => {
      const filename = getGenreId($(item).attr("href"));
      const regex = /^(.+)\.(\w+)$/;
      const match = filename?.match(regex);
      const id = match ? match[1] : match;
      const name = $(item).text().trim();
      return { id: id, name };
    });

    return res.status(200).json(genres);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
