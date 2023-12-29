// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const uteid = req.query.desc;

  res.status(200).json({ name: "John", uteid: uteid, quer: "1123232" });
}

wo;
