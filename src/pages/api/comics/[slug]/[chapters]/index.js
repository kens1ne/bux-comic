import { createRequest, getChapterId } from "@/pages/api";

export default async (req, res) => {
  const { query } = req;
  const comicId = query.slug;
  try {
    const $chapter = await createRequest(`/truyen-tranh/${comicId}`, "GET");

    const chapters = Array.from(
      $chapter(
        ".div_middle > div.main_content > div > div.list_chapter > div > div"
      )
    ).map((item) => {
      const id = getChapterId($chapter(item).find("a").attr("href"));
      const name = $chapter(item).find("a").text().trim();
      const update_at = $chapter(item).find(".time-chap").text().trim();
      return { id, name, update_at };
    });

    return res.status(200).json(chapters);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
