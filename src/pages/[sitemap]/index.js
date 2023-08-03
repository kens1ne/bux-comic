import Genres from "@/utils/Genres";

const getLatestPost = async (page = 1) => {
  return await fetch(`https://api.manhwaco.com/latest?page=${page}`)
    .then((res) => res.json())
    .then((res) => res);
};

const generatePosts = (posts) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    ${
      posts &&
      posts
        .map((item) => {
          return `<url>
        <loc>${process.env.DOMAIN}/comic/${item.id}</loc>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>`;
        })
        .join("")
    }
  </urlset>
  `;
};

const generateGenres = (genres) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${process.env.DOMAIN}</loc>
    </url>
    ${
      genres &&
      genres
        .map((item) => {
          return `<url>
        <loc>${process.env.DOMAIN}/genres/${item.id}</loc>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>`;
        })
        .join("")
    }
  </urlset>
  `;
};

function SitemapDynamic() {}

export const getServerSideProps = async ({ res, params }) => {
  const sitemap = params.sitemap;

  if (!sitemap.includes("xml")) {
    return {
      notFound: true,
    };
  }

  if (sitemap.includes("page")) {
    const sitemapData = generateGenres(Genres);

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapData);
    res.end();
  }

  if (sitemap.includes("post")) {
    const page = sitemap.split("_")[2].replace(".xml", "");
    const { comics: comics, total_pages: totalPages } = await getLatestPost(
      page
    );
    if (!totalPages) {
      return {
        notFound: true,
      };
    }

    const sitemapData = generatePosts(comics);
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapData);
    res.end();
  }

  return {
    props: {},
  };
};

export default SitemapDynamic;
