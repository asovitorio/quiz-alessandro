// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import questoes from "../bancoDeQuestoes";
import QuestaoModel from "@/models/questao";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const idSelecionado = Number(req.query.id);

  const questaoFiltrada = questoes.filter(
    (quest) => quest.id === idSelecionado
  );
  if (questaoFiltrada.length === 1) {
    const questaoSelecionada = questaoFiltrada[0].embaralharRespostas();

    return res.status(200).json(questaoSelecionada.questoesObjeto());
  } else {
    return res
      .status(404)
      .json({
        questoes: {
          erro: `requisição invalida id:${idSelecionado} não existe na base de dados`,
        },
      });
  }
}
