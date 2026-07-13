import ColumnChart from './ColumnChart'
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

  const [analises, setAnalises] = useState([])

  useEffect(() => {

      const unsubscribe = onSnapshot(
          collection(db, "analises"),
          (snapshot) => {

              const lista = snapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data()
              }));

              lista.sort((a, b) => {

                  const [diaA, mesA, anoA] = a.data.split("/");
                  const [diaB, mesB, anoB] = b.data.split("/");

                  const [horaA, minA, segA] = a.horaColeta.split(":");
                  const [horaB, minB, segB] = b.horaColeta.split(":");

                  const dataHoraA = new Date(
                      anoA,
                      mesA - 1,
                      diaA,
                      horaA,
                      minA,
                      segA
                  );

                  const dataHoraB = new Date(
                      anoB,
                      mesB - 1,
                      diaB,
                      horaB,
                      minB,
                      segB
                  );

                  return dataHoraA - dataHoraB;

              });

              setAnalises(lista.slice(-5));

          }
      );

      return () => unsubscribe();

  }, []);

  if (analises.length === 0) {
      return <h2>Carregando...</h2>;
  }

  const analise = analises[analises.length - 1];

  const variaveis = [
      ['ICF', 'icf', 'texto'],
      ['Choveu nas Últimas 24h ?', 'choveuUltimas24h', 'texto'],
      ['Temperatura do Ar', 'temperaturaAr', '°C'],
      ['Temperatura da Água', 'temperaturaAgua', '°C'],
      ['pH', 'ph', 'pH'],
      ['Condutividade', 'condutividade', 'µS/cm'],
      ['Cloreto', 'cloreto', 'mg/L'],
      ['Oxigênio Dissolvido', 'oxigenioDissolvido', 'mg/L'],
      ['DBO', 'dbo', 'mg/L'],
      ['Amônia', 'amonia', 'mg/L'],
      ['Fósforo Total', 'fosforoTotal', 'mg/L'],
      ['Cádmio', 'cadmioTotal', 'mg/L'],
      ['Chumbo', 'chumboTotal', 'mg/L'],
      ['Cobre', 'cobreTotal', 'mg/L'],
      ['Cromo', 'cromo', 'mg/L'],
      ['Ferro', 'ferroTotal', 'mg/L'],
      ['Manganês', 'manganesTotal', 'mg/L'],
      ['Níquel', 'niquel', 'mg/L'],
      ['Zinco', 'zinco', 'mg/L'],
      ['Coliformes', 'coliformesTermotolerantes', 'NMP'],
      ['Salinidade', 'salinidade', ''],
      ['Cor Verdadeira', 'corVerdadeira', 'uH'],
      ['Turbidez', 'turbidez', 'uT'],
      ['Nitrato', 'nitrato', 'mg/L'],
      ['Nitrito', 'nitrito', 'mg/L'],
      ['Daphnia', 'daphnia', ''],
      ['Sólidos Totais', 'solidosTotais', 'mg/L'],
      ['Clorofila', 'clorofila', 'µg/L'],
      ['Potássio', 'potassio', 'mg/L'],
      ['Alcalinidade', 'alcalinidade', 'mg/L'],
      ['Sulfato', 'sulfato', 'mg/L'],
      ['Sólidos Suspensos', 'solidosSuspensos', 'mg/L'],
      ['Sólidos Dissolvidos', 'solidosDissolvidos', 'mg/L'],
      ['Fósforo Solúvel', 'fosforoSoluvel', 'mg/L'],
      ['OD Saturação', 'odSaturacao', '%'],
      ['DQO', 'dqo', 'mg/L'],
      ['Fitoplâncton', 'fitoplanctonTotal', ''],
      ['Cianobactérias', 'densidadeCianobacterias', ''],
      ['CYANOPHYTA', 'cyanophyta', ''],
      ['CHLOROPHYTA', 'chlorophyta', ''],
      ['CRYPTOPHYTA', 'cryptophyta', ''],
      ['EUGLENOPHYTA', 'euglenophyta', ''],
      ['DINOPHYTA', 'dinophyta', ''],
      ['FITOFLAGELADO', 'fitoflagelado', ''],
      ['CHAROPHYTA', 'charophyta', ''],
      ['Nitrogênio Total', 'nitrogenioTotal', 'mg/L'],
      ['Valor Extra 1', 'valorExtra1', ''],
      ['Valor Extra 2', 'valorExtra2', '']
  ];

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
                  valor={analise[item[1]]}
                />
              )
              : (
                <ColumnChart
                    titulo={item[0]}
                    unidade={item[2]}
                    campo={item[1]}
                    dados={analises}
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