import { createRequest, getChapterId, getComicId, getTotalPages } from ".";

export default async (req, res) => {
  const { query } = req;
  const q = query.q ? query.q : "";
  if (!q) return res.status(400).json({ status: false });
  const page = query.page ? Number(query.page) : 1;

  try {
    const $ = await createRequest("/tim-kiem/trang-" + page + ".html?q=" + q);
    const comics = Array.from(
      $("#main_homepage > div.list_grid_out > ul > li")
    ).map((item) => {
      const link = $(item)
        .find(".book_avatar > a > img")
        .attr("src")
        .replace(/\?.*$/, "");
      const thumbnail = `${process.env.API_COMICS}/images?src=` + link;
      const title = $(item)
        .find(".book_info > .book_name.qtip > h3 > a")
        .text();
      const id = getComicId(
        $(item)
          .find(".book_info > .book_name.qtip > h3 > a")
          .attr("href")
          .replace(/\.html$/, "")
      );
      const short_description = "";

      const last_chapter = {
        id: getChapterId(
          $(item).find(".book_info > div.last_chapter > a").attr("href")
        ),
        name: $(item).find(".book_info > div.last_chapter > a").text().trim(),
      };

      return {
        thumbnail: thumbnail,
        title: title,
        id: id,
        short_description,
        last_chapter,
      };
    });

    const total_pages = $('.page_redirect > a:contains("»")').attr("href")
      ? Number(
          getTotalPages($('.page_redirect > a:contains("»")').attr("href"))
        )
      : page;

    const result = {
      comics,
      total_pages,
      current_page: page,
    };
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
