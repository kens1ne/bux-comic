import { createRequest, getChapterId, getGenreId } from "../..";

export default async (req, res) => {
  const { query } = req;
  const comicId = query.slug;

  try {
    const $ = await createRequest(`/truyen-tranh/${comicId}`);
    const title = $("div.book_info > div.book_other > h1").text().trim();
    const link = $(".book_info > div.book_avatar > img")
      .attr("src")
      .replace(/\?.*$/, "");
    const thumbnail = `${process.env.API_COMICS}/images?src=` + link;
    const description = $(".story-detail-info.detail-content").text().trim();

    const fullName = $("ul > li.othername.row > h2").text().trim();
    const authors = $("ul > li.author.row > p.col-xs-9 > a").text().trim();
    const status = $("ul > li.status.row > p.col-xs-9").text().trim();
    const liked = $("ul > li:nth-child(3) > p.col-xs-9").text().trim();
    const followers = $("ul > li:nth-child(4) > p.col-xs-9").text().trim();
    const total_views = $("ul > li:nth-child(5) > p.col-xs-9").text().trim();

    const genres = Array.from(
      $("div.book_info > div.book_other > ul.list01 > li")
    ).map((item) => {
      const id = getGenreId(
        $(item)
          .find("a")
          .attr("href")
          .replace(/\.html$/, "")
      );
      const name = $(item).text().trim();
      return { id, name };
    });

    const chapters = Array.from(
      $(".book_detail > div.list_chapter > div > div")
    ).map((item) => {
      const id = getChapterId($(item).find("a").attr("href"));
      const name = $(item).find("a").text().trim();
      const update_at = $(item).find(".time-chap").text().trim();
      return { id, name, update_at };
    });
    const result = {
      title,
      thumbnail,
      description,
      fullName,
      authors,
      status,
      total_views,
      liked,
      followers,
      genres,
      chapters,
      id: comicId,
    };

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
