const { test, section, port = 8080, agent = false, agentTimeout = null, fetchHelper = false } = require("simple-argv")
const express = require("express")
const app = new express()
const bodyParser = require("body-parser")
const md5 = require("md5")
const { readFileSync, writeFileSync, readdirSync, mkdirSync } = require("fs")
const { join } = require("path")
const inquirer = require("inquirer")
const timediff = require("timediff")
const equal = require("node-json-equal")
const consegna = require("./consegna.js")

const startTime = new Date()

if (agent) {
  console.log("agent enabled")
}

try {
  mkdirSync(join(__dirname, "data"))
} catch (_) {}

const getUserEx = (user, ex, exNumber) => {
  let out = user.data[exNumber]
  if (!out) {
    const { message } = ex
    const rndSeed = typeof ex.rndSeed === "function" ? ex.rndSeed() : null
    const data = ex.data(rndSeed)
    out = user.data[exNumber] = {
      rndSeed,
      data,
      message: typeof message === "function" ? message({ rndSeed, data }) : ex.message
    }
  }
  return out
}

const isCorrect = (userData, correctData) => {
  if (!agent && typeof userData !== typeof correctData) {
    return false
  }
  
  if (typeof userData === "object") {
    return equal(userData, correctData)
  } else {
    if (agent) {
      let a = String(userData).trim()
      let b = String(correctData).trim()

      if (a[a.length - 1] === "\n") {
        a = a.substr(0, a.length - 1)
      }
      if (b[b.length - 1] === "\n") {
        b = b.substr(0, b.length - 1)
      }
      console.log({ a, b })
      return a === b
    } else {
      return userData === correctData
    }
  }
}

Promise.resolve()
  .then(() => {
    if (test) {
      return { testName: test }
    } else {
      return inquirer.prompt({
        message: "scegli la verifica",
        type: "list",
        name: "testName", 
        choices: readdirSync("./tests").map(e => e.replace(/\.js/g, ""))
      })
    }
  })
  .then(test => {
    const out = [test]
    if (section) {
      out.push({ section })
    } else {
      out.push(inquirer.prompt({
        message: "scegli la classe",
        type: "input",
        name: "section"
      }))
    }
    return Promise.all(out)
  })
  .then(([{ testName }, { section }]) => {
    const test = require(`./tests/${testName}.js`)
    //const date = new Date()
    const getDataPath = () => `./data/${section.toUpperCase()}_${testName.toUpperCase()}.json`
    //const getDataPath = () => `./data/${section.toUpperCase()}_${testName.toUpperCase()}_${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.json`
   
    let users

    const correct = () => {
      return Object.values(users).map(user => {
        let score = 0
        if (user.nome) {
          score += test.accreditation.points
        }
        
        Object.values(user.ex).forEach(({ points }) => score += points)
        user.score = score
        return user
      })
    }
    
    try {
      users = JSON.parse(readFileSync(getDataPath()))
    } catch (_) {
      users = {}
    }
    setInterval(() => {
      writeFileSync(getDataPath(), JSON.stringify(users, null, 2))
    }, 1000)


    const serverIds = [
      "8c58189189546fd442142b4cd340d8bc",
      "a7fe76d782ccc15fb264334f66833fe8"
    ]

    const auth = ({ user: { id } }, res, next) => {
      if (!serverIds.includes(id)) {
        res.status(403).json({
          message: "non puoi passare!"
        })
      } else {
        next()
      }
    }

    app.use(bodyParser.json())
    app.use((err, req, res, next) => {
      res.status(400).json({
        message: "controlla che il body sia un json"
      })
    })

    app.use((req, res, next) => {
      const id = md5("asmcoisamnf3219i021415" + req.ip + "apk1309kr019m,xdwp132").toString()
      if (!users[id]) {
        users[id] = {
          id,
          ex: {},
          data: {}
        }
      }
      req.user = users[id]
      next()
    })

    app.post("/accreditamento", ({ user, body }, res) => {
      const { nome } = body
      if (!nome) {
        return res.status(400).json({
          message: "inserisci il campo nome nel body della request"
        })
      }

      user.nome = nome
      res.json({
        message: "accreditamento effettuato con successo!"
      })
      correct()
    })

    function getLocalIp() {
      const os = require("os")
      
      let eth, wifi = null
      
      for (const addresses of Object.values(os.networkInterfaces())) {
        for (const add of addresses) {
          const { address } = add
          if (address.startsWith("192.168.")) {
            eth = address
          } else if (address.startsWith("10.100.")) {
            wifi = address
          }
        }
      }
      
      return eth || wifi
    }
    
    app.get("/", (req, res) => {
      const { user } = req
      res.send(
        consegna({
          exLength: test.ex.length,
          ip: getLocalIp(),
          port,
          fetchHelper,
          exMessages: test.ex.map((ex, i) => {
            const { message } = getUserEx(user, ex, i)
            return `<li>${message.replace(/\n/g, "<br>")}</li>`
          }).join("")
        })
      )
    })

    app.get("/agent", (req, res) => {
      res.json({
        agent,
        agentTimeout: agentTimeout ? new Date(new Date().getTime() + agentTimeout * 60000) : null 
      })
    })
    
    app.get("/esercizi", (req, res) => {
      res.json(test.ex.map((ex, i) => {
        const { message } = getUserEx(req.user, ex, i)
        return { 
          message, 
          points: ex.points 
        }
      }))
    })
    
    app.get("/esercizi/:num", (req, res) => {
      const { user, params } = req
      const { num } = params
      const ex = test.ex[num - 1]
      if (ex) {
        const { message, data } = getUserEx(user, ex, num - 1)
        const json = { message }
        if (req.get("x-data")) {
          json.data = data//getExData(user, ex, num - 1)
        }
        return res.json(json)
      } else {
        return res.status(404).json({
          message: "esercizio non trovato"
        })
      }
    })
    
    app.post("/esercizi/:num", (req, res) => {
      if (!req.body) {
        return res.status(400).json({
          message: "manca il body"
        })
      }
      const { body, user } = req
      
      if (!user.nome) {
        return res.status(400).json({
          message: "devi accreditarti prima di consegnare un esercizio!"
        })
      }
      
      const { data: answer, code } = body
      const { num } = req.params
      
      if (typeof answer === "undefined") {
        return res.status(400).json({
          message: "manca la chiave data"
        })
      }
      
      const ex = test.ex[num - 1]
      if (ex) {
        user.time = new Date()
        user.fromStart = Object.values(timediff(startTime, user.time, "HHmmSS")).map(e => e.toString().padStart(2, "0")).join(":")

        if (!user.ex[num]) {
          user.ex[num] = {
            points: 0
          }
        }
        
        if (user.ex[num].points === 0) {
          user.ex[num].code = code
        }
        
        const { rndSeed, data } = getUserEx(user, ex, num - 1)
        
        if (isCorrect(answer, ex.solution({ rndSeed, data }))) {
          user.ex[num].points = ex.points
          user.ex[num].code = code
          res.json({
            message: `esercizio corretto! +${ex.points}`
          })
          correct()
        } else {
          res.status(400).json({
            message: "la soluzione non è corretta"
          })
        }
      } else {
        res.status(404).json({
          message: "esercizio non valido"
        })
      }
    })

    const cleanUser = user => {
      const out = Object.assign({}, user)
      delete out.data
      out.ex = Object.entries(out.ex).reduce((acc, [key, value]) => {
        const data = Object.assign({}, value)
        delete data.code
        acc[key] = data
        return acc
      }, {})
      Object.values(out.ex).map(ex => {
        ex = Object.assign({}, ex)
        delete ex.code
        return ex        
      })
      return out
    }

    app.get("/risultati", ({ user: { id } }, res) => {
      if (serverIds.includes(id)) {
        res.json(Object.values(users))
      } else {
        res.json(Object.values(users).map(cleanUser))
      }
    })

    app.get("/risultati/viewer", (req, res) => {
      res.send(readFileSync("./viewer.html").toString())
    })

    app.get("/voto", ({ user : { id } }, res) => {
      res.json(cleanUser(users[id]))
    })
    
    app.get("/correggi", auth, (req, res) => {
      res.json(correct())
    })

    app.all("*", (req, res) => {
      res.status(404).json({
        message: "pagina non trovata"
      })
    })

    app.listen(port, () => console.log(`server listening on port ${port}`))
  })
  .catch(console.log)
