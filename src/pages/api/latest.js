// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getComics } from ".";

export default async (req, res) => {
  try {
    const { query } = req;
    const page = query.page ? Number(query.page) : 1;

    const result = await getComics(`/truyen-moi-cap-nhat`, page);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
