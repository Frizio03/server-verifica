const fetch = require("node-fetch")
const getUrl = endpoint => `http://192.168.1.231:8080/${endpoint}`
  
const accreditamento = () => {
  fetch(getUrl("accreditamento"), {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      nome: "Giovanni Bruno"
    })
  })
    .then(res => res.json())
    .then(console.log)
    .catch(console.log)
}

const es1 = () => {
  fetch(getUrl("esercizi/1"), {
    headers: {
      "x-data": true
    }
  })
    .then(res => res.json())
    .then(({ message, data }) => {
      console.log(message)
      console.log(data)
      const result = data.reduce((acc, e) => acc + e, 0)
      console.log(result)
      return fetch("http://192.168.1.231:8080/esercizi/1", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          data: result
        })
      })
    })
    .then(res => res.json())
    .then(data => console.log(data)) 
    .catch(console.log)
}

const es2 = () => {
  fetch(getUrl("esercizi/2"), {
    headers: {
      "x-data": true
    }
  })
    .then(res => res.json())
    .then(({ message, data }) => {
      console.log(message)
      console.log(data)
      const min = data.reduce((acc, e) => acc < e ? acc : e, data[0])
      const result = data.map(e => e * min)
      
      return fetch(getUrl("esercizi/2"), {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          data: result
        })
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(console.log)
}

const es3 = () => {
  fetch(getUrl("esercizi/3"), {
    headers: {
      "x-data": true
    }
  })
    .then(res => res.json())
    .then(({ message, data }) => {
      console.log(message)
      console.log(data)
      return fetch(getUrl("esercizi/3"), {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          data: data.filter(e => e <= 3)
        })
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(console.log)
}

accreditamento()
//es2()
