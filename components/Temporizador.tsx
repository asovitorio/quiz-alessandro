import styles from '@/styles/Temporizador.module.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
interface TemporizadorProps {
  duracao: any
  key:number
  tepoEsgotado: () => void
}

function Temporizador(props: TemporizadorProps) {
  return (
    <div className={styles.temporizador}>
      <CountdownCircleTimer
        isPlaying
        size={120}
        duration={props.duracao}
        onComplete={props.tepoEsgotado}
        colors={['#BCE596', '#F7B801', '#ED827A', '#A30000']}
        colorsTime={[props.duracao, props.duracao / 2, props.duracao / 3, 0]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
  )
}

export default Temporizador
