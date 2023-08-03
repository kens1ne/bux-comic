import Genres from "@/utils/Genres";

const getLatestPost = async () => {
  return await fetch(`https://api.manhwaco.com/latest`)
    .then((res) => res.json())
    .then((res) => res);
};

const generateSitemap = (total_pages) => {
  const currentTime = new Date();

  let sitemap = "";
  for (let i = 1; i <= total_pages; i++) {
    sitemap += `<sitemap>
        <loc>${process.env.DOMAIN}/sitemap_post_${i}.xml</loc>
        <lastmod>${currentTime.toISOString()}</lastmod>
</sitemap>`;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
    <loc>${process.env.DOMAIN}/sitemap_pages.xml</loc>
      <lastmod>${currentTime.toISOString()}</lastmod>
    </sitemap>
        ${sitemap}
  </sitemapindex>
  `;
};

function SiteMap() {}

export const getServerSideProps = async ({ res }) => {
  const { total_pages } = await getLatestPost();

  const sitemap = generateSitemap(total_pages);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
