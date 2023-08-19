import RespostaModel from '@/models/resposta'
import styles from '@/styles/Resposta.module.css'
interface RespostaProps {
  valor: RespostaModel
  indice: number
  letra: string
  corFundoLetra: string

  respostaFornecida: (indice: number) => void
}

export default function Resposta(props: RespostaProps) {
  const resposta = props.valor
  const respostaRevelada = resposta.revelada?styles.revelada:''
  return (
    <div
      className={styles.resposta}
      onClick={(e) => {
        e.preventDefault()
        props.respostaFornecida(props.indice)
      }}
    >
      <div className={`${styles.conteudoResposta} ${respostaRevelada}`}>
       
          <div className={styles.frente}>
            <div
              className={styles.letra}
              style={{ background: props.corFundoLetra }}
            >
              {props.letra}
            </div>
            <div className={styles.valor}>{resposta.valor}</div>
          </div>
       
          <div className={styles.verso}>
            {resposta.certa ? (
              <div className={styles.certa}>
                <div>Aresposta certa é...</div>
                <div className={styles.valor}>{resposta.valor}</div>
              </div>
            ) : (
              <div className={styles.errada}>
                <div>Aresposta informada está errada...</div>
                <div className={styles.valor}>{resposta.valor}</div>
              </div>
            )}
          </div>
      
      </div>
    </div>
  )
}
