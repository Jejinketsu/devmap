import React, { useState, useEffect } from 'react';
import api from './services/api'

// Componente: Bloco isolado de HTML, CSS e JS, o qual não interefere no restante da aplicação.
// Propriedade: Informações que um componente PAI passa para um componente FILHO (parâmetros)
// Estado: Informações mantidas pelo componente (lembrar: imutabilidade)

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

import './global.css'
import './app.css'
import './sidebar.css'
import './main.css'

function App() {
  const [ devs, setDevs] = useState([])

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs")

      setDevs(response.data)
    }

    loadDevs()
  })

  async function handleAddDev(data) {
      const response = await api.post("/devs", data)
      setDevs([...devs, response.data])
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastras</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (<DevItem key={dev._id} dev={dev}/>))}
        </ul>
      </main>
    </div>
  )
}

export default App