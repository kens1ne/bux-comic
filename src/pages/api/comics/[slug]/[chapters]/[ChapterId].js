import { createRequest, getChapterId } from "@/pages/api";

export default async (req, res) => {
  const { query } = req;
  const comicId = query.slug;
  const ChapterId = query.ChapterId;
  try {
    const $ = await createRequest(`/truyen-tranh/${comicId}-${ChapterId}`);
    const images = Array.from($(".page-chapter")).map((item, index) => {
      const image =
        `${process.env.API_COMICS}/images?src=` +
        $(item).find("img").attr("src").trim().replace(/\?.*$/, "");
      return { page: index + 1, src: image };
    });
    const comic_name = $(
      ".breadcrumb:nth-child(1) > li:nth-child(2) > a > span"
    )
      .text()
      .trim();

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

    const previous_chapter = {
      id: getChapterId(
        $(
          "div:nth-child(1) > div.chapter-control > div.d-flex.align-items-center.justify-content-center > a:nth-child(1)"
        ).attr("href")
      ),
      name: $(
        "div:nth-child(1) > .chapter-control > div.d-flex.align-items-center.justify-content-center > a:nth-child(1)"
      )
        .text()
        .trim(),
    };

    const chapter_name = $(
      ".breadcrumb:nth-child(1) > li:nth-child(3) > a > span"
    )
      .text()
      .trim();

    const next_chapter = {
      id: getChapterId(
        $(
          "div:nth-child(1) > div.chapter-control > div.d-flex.align-items-center.justify-content-center > a:nth-child(2)"
        ).attr("href")
      ),
      name: $(
        "div:nth-child(1) > .chapter-control > div.d-flex.align-items-center.justify-content-center > a:nth-child(2)"
      )
        .text()
        .trim(),
    };

    const result = {
      images,
      chapters,
      previous_chapter,
      next_chapter,
      chapter_name,
      comic_name,
    };

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
