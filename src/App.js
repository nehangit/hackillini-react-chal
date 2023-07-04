import './App.css';
import { useState, useEffect } from 'react';

function Entries(props){
  const[resp, setResp] = useState("")

  function apiCall(url){
    fetch(url).then(ret => ret.json()).then((dat)=>{
      var ind = 0;
      var tableEntries = [];
      for(var i of dat.profiles){
        tableEntries.push(
        <tr key={ind}>
          <td>{ind + 1}</td>
          <td>{i.discord}</td>
          <td>{i.points}</td>
        </tr>
        )
        ind++
      }
      setResp(tableEntries) 
    })
  }

  useEffect(()=>{
  apiCall("https://api.hackillinois.org/profile/leaderboard/?limit=".concat(props.lim))     // eventually add sorting by points the other direction, search by team status, id, interests, etc.
  }, [props.lim])
  
  return resp
}


function App() {

  const [limit, setLimit] = useState(0)
  useEffect(()=>{fetch("https://api.hackillinois.org/profile/leaderboard/").then(ret => ret.json()).then((apidat)=>{
    setLimit(apidat.profiles.length)
  })}, [])

  function limitRes(down){
    var inp = parseInt(down.target.value)
    if(down.key === "Enter"){
      if(isNaN(inp) || inp < 1){
      console.log("invalid")
      }
      else{
      setLimit(inp)
      }
    }
  }
  //console.log("limit state", limit)

  return (
    <div className="App">
      <h1 className="Title">HackIllinois Leaderboard!!</h1>
      <header className="App-body">
        <br></br>
        <div>
          <label htmlFor="lim">Enter the number of entries to show:</label>
          <input id="lim" type='number' onKeyDown={(ev) => limitRes(ev)}></input>
        </div>
        <br></br>
        <div>
          <table id="board">
            <thead>
              <tr>
              <th>Place</th>
              <th>Discord</th>
              <th>Points</th>
              </tr>
            </thead>
            <tbody>
              <Entries lim = {limit} />
            </tbody>
          </table>
          <p>Created by Nehan Tarefder</p>
        </div>
      </header>
    </div>
  );
}

export default App;
