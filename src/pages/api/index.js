import axios from "axios";
import { load } from "cheerio";

export default (req, res) => {
  res.status(200).json({ copyright: "BuxTruyen.Com" });
};

export const createRequest = async (path, type = "GET") => {
  try {
    const { data } = await axios.request({
      method: type,
      url: `${process.env.URL_CRAWLER}${path}`.replace(/\?+/g, "?"),
      headers: {
        "User-Agent": "*",
        Cookie: "visit-read=co",
      },
    });

    return load(data);
  } catch (err) {
    return { error: err.message };
  }
};

export const createRequestPost = async (query) => {
  try {
    query = query.trim();
    if (!query || query == "") return { status: false, comics: [] };

    const formData = new FormData();

    formData.append("search", query);

    let status = true;

    const { data } = await axios.post(
      `${process.env.URL_CRAWLER}/frontend/search/search`,
      formData,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
          "Content-Type":
            "multipart/form-data; boundary=<calculated when request is sent>",
        },
      }
    );

    return load(data);
  } catch (err) {
    return { error: err.message };
  }
};

export const getTotalPages = (link) => {
  if (!link) return "";
  // const regex = /\/page\/(\d+)\//;
  const regex = /trang-(\d+)/;
  const match = link.match(regex);
  return match ? match[1] : undefined;
};

export const getGenreId = (link) => {
  if (!link) return "";
  const regex = /\/the-loai\/([^/]+)/;
  const match = link.match(regex);
  return match ? match[1] : undefined;
};

export const getComicId = (link) => {
  if (!link) return "";
  const regex = /\/truyen-tranh\/([^/]+)/;
  const match = link.match(regex);
  return match ? match[1] : undefined;
};

export const getChapterId = (link) => {
  if (!link) return "";
  const regex = /-([^/]+)\.html/;
  const match = link.match(regex);
  return match ? match[1] : undefined;
};

export const getComics = async (path, page = 1) => {
  try {
    const $ = await createRequest(path + `/trang-${page}`);

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

      const time_ago = $(item)
        .find(".book_avatar > div > span.time-ago")
        .text();

      const hot = $(item).find(".book_avatar > div > span.hot").text();
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
        time_ago,
        hot,
      };
    });

    const total_pages = $('.page_redirect > a:contains("»")').attr("href")
      ? Number(
          getTotalPages($('.page_redirect > a:contains("»")').attr("href"))
        )
      : page;

    return {
      comics,
      total_pages,
      current_page: page,
    };
  } catch (err) {
    return { error: err.message };
  }
};
