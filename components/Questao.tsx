import QuestaoModel from '@/models/questao'
import styles from '@/styles/Questao.module.css'
import Enunciado from './Enunciado'
import Resposta from './Resposta'
import Temporizador from './Temporizador'

interface QuestaoProps {
  valor: QuestaoModel
  respostaFornecida: (indice:number)=>void
  tempoEsgotado: ()=>void
  tempoParaResposta?:number
}

export default function Questao(props: QuestaoProps) {
  const questao = props.valor
  
  
function reinderizarResposta() {
  return questao.respostas.map((resposta,i) =>{
    const letraEnunciado = ['A','B','C','D']
    const cores = ['#F2C866','#A2C866','#41bec2','#c1418c']
    return <Resposta 
    key={i}
    valor={resposta}
    indice={i}
    letra={letraEnunciado[i]}
    corFundoLetra={cores[i]}
    respostaFornecida={props.respostaFornecida}

    />
  })
}
  return (
    <div className={styles.questao}>
      <Enunciado texto={questao.enunciado} />
      <Temporizador 
      key={questao.id}
      duracao={props.tempoParaResposta ?? 10}
      tepoEsgotado={props.tempoEsgotado}
      />
      {reinderizarResposta()}
    </div>
  )
}
