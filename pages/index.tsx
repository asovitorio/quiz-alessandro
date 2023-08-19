import Loader from '@/components/Loader'
import Questionario from '@/components/Questionario'
import QuestaoModel from '@/models/questao'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const BASE_URL = 'http://localhost:3000/api'

export default function Home() {
  const router = useRouter()
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState<number>(0)

  async function obterIdsDasQuestoes() {
    const resposta = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestoes = await resposta.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }
  async function obterQuestao(idQuestao: number) {
    const resposta = await fetch(`${BASE_URL}/questao/${idQuestao}`)
    const json = await resposta.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json)
    setQuestao(novaQuestao)
  }

  useEffect(() => {
    obterIdsDasQuestoes()
  }, [])

  useEffect(() => {
    idsDasQuestoes.length > 0 && obterQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes])

  function respostaFornecida(indice: number) {
    setQuestao(questao?.responderCom(indice))
  }

  function tempoEsgotado() {
    if (!questao?.respondida) setQuestao(questao?.responderCom(-1))
  }

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
  }
  function idProximaQuestao() {
    if (questao) {
      const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1
      return idsDasQuestoes[proximoIndice]
    }
  }
  function irParaProxima() {
    const proximoId = idProximaQuestao()
    proximoId ? irParaProximaQuestao(proximoId) : finalizar()
  }
  function irParaProximaQuestao(proximoId: number) {
    obterQuestao(proximoId)
  }
  function finalizar() {
    router.push({
      pathname:'/resultado',
      query:{
        total:idsDasQuestoes.length,
        certas:respostasCertas
      }
    })
  }
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >{
      questao?(
        <Questionario
          questao={questao}
          ultima={idProximaQuestao() === undefined}
          questaoRespondida={questaoRespondida}
          irParaProxima={irParaProxima}
        />

      ):(
        <Loader />
      )
    }
      {/* <Questao
        valor={questao}
        respostaFornecida={respostaFornecida}
        tempoEsgotado={tempoEsgotado}
      />
      <Botao texto='Próxima' href='/resultado'/> */}
    </div>
  )
}
