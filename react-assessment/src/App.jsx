import useSWR from "swr";
import axios from "axios";
import './App.css'

const fetcher = async (url) => {
  return await axios.get(url).then(res => res.data.results);
}

function App() {
  const {data, error, isLoading} = useSWR("https://pokeapi.co/api/v2/pokemon/", fetcher)
  console.log(data)
  if (error) return <div>Failed to find pokemon</div>

  if (isLoading) return <div>Pokemon are still loading...</div>

  return (
    <div className="App">
      <h2>Pokemon:</h2>
      {data.map((mon, i) => {
        return (
          <div style={{marginBottom: i === 8 ? "1em" : "", color: i < 9 ? "white" : "black"}} key={i}>{i + 1}. {mon.name}</div>
        )
      })}
    </div>
  )
}

export default App
