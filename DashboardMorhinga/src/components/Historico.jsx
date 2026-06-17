import { useState } from "react"
import { db } from "../firebase"
import styles from "./Historico.module.css"
import { collection, getDocs } from "firebase/firestore"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"
import { Link } from "react-router-dom"

function Historico() {

  const [dataInicio, setDataInicio] = useState("")
  const [dataFinal, setDataFinal] = useState("")
  const [dados, setDados] = useState([])

  const [variaveisSelecionadas, setVariaveisSelecionadas] = useState([
    "temperaturaAgua"
  ])

  const variaveisDisponiveis = [
    "temperaturaAr",
    "temperaturaAgua",
    "ph",
    "condutividade",
    "cloreto",
    "oxigenioDissolvido",
    "dbo",
    "amonia",
    "fosforoTotal",
    "cadmioTotal",
    "chumboTotal",
    "cobreTotal",
    "cromo",
    "ferroTotal",
    "manganesTotal",
    "niquel",
    "zinco",
    "coliformesTermotolerantes",
    "salinidade",
    "corVerdadeira",
    "turbidez",
    "nitrato",
    "nitrito",
    "daphnia",
    "solidosTotais",
    "clorofila",
    "potassio",
    "alcalinidade",
    "sulfato",
    "solidosSuspensos",
    "solidosDissolvidos",
    "fosforoSoluvel",
    "odSaturacao",
    "dqo",
    "fitoplanctonTotal",
    "densidadeCianobacterias",
    "cyanophyta",
    "chlorophyta",
    "cryptophyta",
    "euglenophyta",
    "dinophyta",
    "fitoflagelado",
    "ochrophytaBacillariophyceae",
    "ochrophytaXanthophyceae",
    "charophyta",
    "nitrogenioTotal",
    "valorExtra1",
    "valorExtra2"
  ]

  const cores = [
    "#7ecec4",
    "#ff6b6b",
    "#4d96ff",
    "#ffd93d",
    "#845ec2",
    "#00c9a7",
    "#f9a826",
    "#ff9671",
    "#0081cf",
    "#c34a36",
    "#2c73d2",
    "#ffc75f",
    "#008f7a",
    "#f6416c",
    "#4b4453"
  ]

  function converterValor(valor) {

    if (valor === null || valor === undefined)
      return null

    if (typeof valor === "number")
      return valor

    if (typeof valor !== "string")
      return valor

    let texto = valor.trim()

    texto = texto.replace("<", "")
    texto = texto.replace(">", "")
    texto = texto.replace(",", ".")

    const numero = Number(texto)

    return isNaN(numero)
      ? null
      : numero
  }

  const pesquisar = async () => {

    const snapshot = await getDocs(
      collection(db, "analises")
    )

    const resultados = snapshot.docs
      .map(doc => {

        const dado = doc.data()

        const convertido = {}

        Object.keys(dado).forEach(chave => {
          convertido[chave] =
            converterValor(dado[chave])
        })

        convertido.dataOriginal = dado.data

        return convertido
      })
      .filter(doc => {

        if (!doc.dataOriginal)
          return false

        const partes =
          doc.dataOriginal.split("/")

        if (partes.length !== 3)
          return false

        const dataFormatada =
          `${partes[2]}-${partes[1]}-${partes[0]}`

        return (
          dataFormatada >= dataInicio &&
          dataFormatada <= dataFinal
        )
      })

    setDados(resultados)
  }

  return (
    <div className={styles.container}>

      <Link
        to="/"
        className={styles.voltar}
      >
        ← Voltar ao mapa
      </Link>

      <h2 className={styles.titulo}>
        Histórico das Análises
      </h2>

      <div className={styles.filtros}>

        <label className={styles.label}>
          Data inicial
        </label>

        <input
          className={styles.input}
          type="date"
          value={dataInicio}
          onChange={(e) =>
            setDataInicio(e.target.value)
          }
        />

        <label className={styles.label}>
          Data final
        </label>

        <input
          className={styles.input}
          type="date"
          value={dataFinal}
          onChange={(e) =>
            setDataFinal(e.target.value)
          }
        />

        <button
          className={styles.botao}
          onClick={pesquisar}
        >
          Pesquisar
        </button>

      </div>

      <div style={{ marginBottom: "2rem" }}>

        <label className={styles.label}>
          Variáveis (CTRL para selecionar várias)
        </label>

        <select
          multiple
          className={styles.input}
          style={{ height: "250px", width: "100%" }}
          value={variaveisSelecionadas}
          onChange={(e) => {

            const selecionadas =
              Array.from(
                e.target.selectedOptions,
                option => option.value
              )

            setVariaveisSelecionadas(selecionadas)
          }}
        >

          {variaveisDisponiveis.map((variavel) => (
            <option
              key={variavel}
              value={variavel}
            >
              {variavel}
            </option>
          ))}

        </select>

      </div>

      {dados.length > 0 && (

        <ResponsiveContainer
          width="100%"
          height={600}
        >

          <LineChart data={dados}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="dataOriginal" />

            <YAxis />

            <Tooltip />

            <Legend />

            {variaveisSelecionadas.map((variavel, index) => (

              <Line
                key={variavel}
                type="monotone"
                dataKey={variavel}
                name={variavel}
                stroke={
                  cores[index % cores.length]
                }
                strokeWidth={3}
                dot={false}
              />

            ))}

          </LineChart>

        </ResponsiveContainer>

      )}

    </div>
  )
}

export default Historico