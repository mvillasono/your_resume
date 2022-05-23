import type { NextApiRequest, NextApiResponse } from "next";
import type { Template } from "../../resumen/types";
import api from "../../resumen/api";

interface Request extends NextApiRequest {
  query: {
    id: string;
  };
}

export default async function handler(
  req: Request,
  res: NextApiResponse<Template>
) {
  const store = await api.fetch(req.query.id);

  if (!store) {
    return res.status(404).end();
  }

  return res.status(200).json(store);
}
