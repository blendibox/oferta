import Link from 'next/link'
import styles from '../styles/Home.module.css'

export const config = { amp: true };


export default function FourOhFour() {
  return <>
  <br/><br/><br/>   <br/><br/><br/>
    <h1>404 - Página não encontrada</h1>
    <br/><br/><br/>
    <Link href="/">
      <a>
        Voltar à Página Inicial
      </a>

    </Link>
       <br/><br/><br/>
  </>
}