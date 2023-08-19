// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import questoes from "@/pages/api/bancoDeQuestoes";

import { embaralhar } from "@/functions/array";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const ids = questoes.map((questao) => questao.id);
  return res.status(200).json(embaralhar(ids));
}
