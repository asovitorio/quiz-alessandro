import Botao from '@/components/Botao'
import Estatistica from '@/components/Estatistica'
import styles from '@/styles/Resultado.module.css'
import { useRouter } from 'next/router'

function Resultado() {
  const router = useRouter()
  const total = Number(router.query.total)
  const certas = Number(router.query.certas)

  const percentual = Math.round((certas / total) * 100)

  return (
    <div className={styles.resultados}>
      <h1>Resultado Final</h1>
      <div style={{display:'flex'}}>
        <Estatistica texto="Perguntas" valor={total} />
        <Estatistica texto="Certas" valor={certas} corFundo='#9CD2A4'/>
        <Estatistica texto="Percentual" valor={`${percentual}%`} corFundo='#DE6A33' />
      </div>
      <Botao 
      href='/'
      texto='Tentar novamente'
      />
    </div>
  )
}

export default Resultado
