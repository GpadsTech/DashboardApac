import styles from './App.module.css'
import Header from './components/Header.jsx'
import Mapa from './components/Mapa.jsx'
import Dashboard from './components/Dashboard.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Historico from './components/Historico.jsx'

function App() {
  const [estacaoSelecionada, setEstacaoSelecionada] = useState(null)
  const [cidadeSelecionada, setCidadeSelecionada] = useState(null)

  return (
    <BrowserRouter>

      <Header />

      <Routes>

        <Route
          path="/"
          element={
            <div>
              <div className={styles.container}>

                <div className={styles.mapa}>
                  <Mapa
                    onEstacaoClick={setEstacaoSelecionada}
                    cidadeSelecionada={cidadeSelecionada}
                  />
                </div>

                {(estacaoSelecionada || cidadeSelecionada) && (
                  <div className={styles.dashboard}>
                    <Dashboard
                      onFechar={() => {
                        setEstacaoSelecionada(null)
                        setCidadeSelecionada(null)
                      }}
                    />
                  </div>
                )}

              </div>
            </div>
          }
        />

        <Route path="/historico" element={<Historico />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App