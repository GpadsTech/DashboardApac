import Gauge from './Gauge.jsx'
import styles from './Dashboard.module.css'

import { useEffect, useState } from 'react'

import { db } from '../firebase.js'

import {
  collection,
  onSnapshot
} from 'firebase/firestore'

import { Link } from 'react-router-dom'

function InfoCard({ titulo, valor }) {
  return (
    <div
      style={{
        width: '100%',
        height: '250px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <p
        style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          fontWeight: '600',
          color: '#555',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: '1rem'
        }}
      >
        {titulo}
      </p>

      <div
        style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#1d93d8'
        }}
      >
        {valor}
      </div>
    </div>
  )
}

function Dashboard({ onFechar }) {

  const [analise, setAnalise] = useState(null)

  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, 'analises'),
      (snapshot) => {

        if (snapshot.empty) return

        const ultimo =
          snapshot.docs[snapshot.docs.length - 1]

        setAnalise(ultimo.data())
      }
    )

    return () => unsubscribe()

  }, [])

  if (!analise) {
    return <h2>Carregando...</h2>
  }

  const variaveis = [
    ['ICF', analise.icf, 'texto'],
    ['Choveu nas Últimas 24h ?', analise.choveuUltimas24h, 'texto'],
    ['Temperatura do Ar', analise.temperaturaAr, '°C', 0, 50],
    ['Temperatura da Água', analise.temperaturaAgua, '°C', 0, 50],

    ['pH', analise.ph, 'pH', 0, 14],
    ['Condutividade', analise.condutividade, 'µS/cm', 0, 5000],
    ['Cloreto', analise.cloreto, 'mg/L', 0, 500],
    ['Oxigênio Dissolvido', analise.oxigenioDissolvido, 'mg/L', 0, 20],
    ['DBO', analise.dbo, 'mg/L', 0, 50],
    ['Amônia', analise.amonia, 'mg/L', 0, 50],
    ['Fósforo Total', analise.fosforoTotal, 'mg/L', 0, 10],
    ['Cádmio', analise.cadmioTotal, 'mg/L', 0, 5],
    ['Chumbo', analise.chumboTotal, 'mg/L', 0, 5],
    ['Cobre', analise.cobreTotal, 'mg/L', 0, 5],
    ['Cromo', analise.cromo, 'mg/L', 0, 5],
    ['Ferro', analise.ferroTotal, 'mg/L', 0, 20],
    ['Manganês', analise.manganesTotal, 'mg/L', 0, 20],
    ['Níquel', analise.niquel, 'mg/L', 0, 5],
    ['Zinco', analise.zinco, 'mg/L', 0, 20],
    ['Coliformes', analise.coliformesTermotolerantes, 'NMP', 0, 1000],
    ['Salinidade', analise.salinidade, '', 0, 50],
    ['Cor Verdadeira', analise.corVerdadeira, 'uH', 0, 500],
    ['Turbidez', analise.turbidez, 'uT', 0, 500],
    ['Nitrato', analise.nitrato, 'mg/L', 0, 50],
    ['Nitrito', analise.nitrito, 'mg/L', 0, 50],
    ['Daphnia', analise.daphnia, '', 0, 100],
    ['Sólidos Totais', analise.solidosTotais, 'mg/L', 0, 5000],
    ['Clorofila', analise.clorofila, 'µg/L', 0, 500],
    ['Potássio', analise.potassio, 'mg/L', 0, 100],
    ['Alcalinidade', analise.alcalinidade, 'mg/L', 0, 500],
    ['Sulfato', analise.sulfato, 'mg/L', 0, 500],
    ['Sólidos Suspensos', analise.solidosSuspensos, 'mg/L', 0, 1000],
    ['Sólidos Dissolvidos', analise.solidosDissolvidos, 'mg/L', 0, 5000],
    ['Fósforo Solúvel', analise.fosforoSoluvel, 'mg/L', 0, 10],
    ['OD Saturação', analise.odSaturacao, '%', 0, 200],
    ['DQO', analise.dqo, 'mg/L', 0, 500],
    ['Fitoplâncton', analise.fitoplanctonTotal, '', 0, 100000],
    ['Cianobactérias', analise.densidadeCianobacterias, '', 0, 100000],
    ['CYANOPHYTA', analise.cyanophyta, '', 0, 100000],
    ['CHLOROPHYTA', analise.chlorophyta, '', 0, 100000],
    ['CRYPTOPHYTA', analise.cryptophyta, '', 0, 100000],
    ['EUGLENOPHYTA', analise.euglenophyta, '', 0, 100000],
    ['DINOPHYTA', analise.dinophyta, '', 0, 100000],
    ['FITOFLAGELADO', analise.fitoflagelado, '', 0, 100000],
    ['CHAROPHYTA', analise.charophyta, '', 0, 100000],
    ['Nitrogênio Total', analise.nitrogenioTotal, 'mg/L', 0, 50],
    ['Valor Extra 1', analise.valorExtra1, '', 0, 100000],
    ['Valor Extra 2', analise.valorExtra2, '', 0, 100000]




  ]

  return (
    <div className={styles.dashboard}>

      <h2 className={styles.titulo}>
        {analise.estacao}
      </h2>

      <p>
        Data: {analise.data}
      </p>

      <p>
        Hora: {analise.horaColeta}
      </p>



      <div
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          display: 'flex',
          gap: '0.5rem'
        }}
      >
        <Link
          to="/historico"
          style={{
            padding: '0.5rem 1.2rem',
            border: '3px solid #333',
            borderRadius: '9px',
            textDecoration: 'none',
            color: '#333',
            fontWeight: '700'
          }}
        >
          Histórico
        </Link>

        <button
          onClick={onFechar}
          style={{
            background: 'none',
            border: '3px solid #333',
            borderRadius: '8px',
            cursor: 'pointer',
            padding: '0.5rem 0.8rem'
          }}
        >
          ✕
        </button>
      </div>

      <div className={styles.grid}>
        {variaveis.map((item, index) => (

          <div
            key={index}
            className={styles.card}
          >

            {item[2] === 'texto'
              ? (
                <InfoCard
                  titulo={item[0]}
                  valor={item[1]}
                />
              )
              : (
                <Gauge
                  titulo={item[0]}
                  valor={item[1]}
                  unidade={item[2]}
                  min={item[3]}
                  max={item[4]}
                  cor="#1d93d8"
                />
              )
            }

          </div>

        ))}
      </div>

    </div>
  )
}

export default Dashboard