export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const image = req.body.image;

    const response = await fetch(
      "https://api.remove.bg/v1.0/removebg",
      {
        method: "POST",

        headers: {
          "X-Api-Key": "zv59181XVzvrJNhHVdCSL4Uj",
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          image_file_b64: image,
          size: "auto"
        })
      }
    );

    // لو حدث خطأ من remove.bg
    if (!response.ok) {

      const errorText = await response.text();

      return res.status(500).json({
        error: errorText
      });
    }

    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "image/png");

    return res.send(Buffer.from(buffer));

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });
  }
}