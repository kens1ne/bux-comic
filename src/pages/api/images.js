import axios from "axios";

export default async (req, res) => {
  try {
    const { src } = req.query;
    if (src == "undefined")
      return res.status(400).json({ error: "src warning" });
    const options = {
      responseType: "stream",
      headers: {
        referer: `${process.env.URL_CRAWLER}`,
      },
    };

    const response = await axios.get(src, options);
    return response.data.pipe(res);
  } catch (err) {
    return res.status(400).json({ error: "Have an error! Please try again." });
  }
};
