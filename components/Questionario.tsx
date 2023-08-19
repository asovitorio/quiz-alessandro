import styles from '@/styles/Questionario.module.css'
import QuestaoModel from '@/models/questao'
import Questao from './Questao'
import Botao from './Botao'

interface QuestionarioProps {
  questao: QuestaoModel
  ultima: boolean
  questaoRespondida: (questao: QuestaoModel) => void
  irParaProxima: () => void
}

const Questionario = (props: QuestionarioProps) => {
  function respostaFornecida(indice: number): any {
    if (!props.questao.respondida) {
      props.questaoRespondida(props.questao.responderCom(indice))
    }
  }
  return (
    <div className={styles.questionario}>
      {props.questao ? (
        <Questao
          valor={props.questao}
          tempoParaResposta={6}
          respostaFornecida={respostaFornecida}
          tempoEsgotado={props.irParaProxima}
        />
      ) : (
        false
      )}
      <Botao
        onClick={props.irParaProxima}
        texto={props.ultima ? 'Finalizar' : 'Próxima'}
      />
    </div>
  )
}

export default Questionario
