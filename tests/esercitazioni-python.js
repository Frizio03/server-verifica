const { rnd, choice, rndNumList, rndFruit } = require("../utils")
const randomWords = require("random-words")
const randomName = require("random-name")

const createPeopleStruct = () => {
  const persone = []

  for (let i = 0; i < rnd(20, 50); i++) {
    const persona = {
      nome: randomName.first(),
      cognome: randomName.last(),
      anni: rnd(40, 80),
      figli: []
    }

    for (let f = 0; f <  rnd(0, 5); f++) {
      persona.figli.push({
        name: randomName.first(),
        anni: rnd(1, 20)
      })
    }

    persone.push(persona)
  }
  return persone
}

module.exports = {
  accreditation: {
    points: 1
  },
  ex: [
    {
      message: "Data una parola maiuscola restituiscila minuscola",
      data: () => randomWords(1)[0].toUpperCase(),
      solution: ({ data }) => data.toLowerCase(),
      points: 1
    },

    {
      message: "Dato un numero restituiscilo moltiplicato per se stesso",
      data: () => rnd(12342, 124095),
      solution: ({ data }) => data * data,
      points: 1
    },

    {
      message: "Dato un dictionary restituisci il valore alla chiave 'cognome'",
      data: () => ({ nome: randomName.first(), cognome: randomName.last(), anni: rnd(30, 60) }),
      solution: ({ data }) => data.cognome,
      points: 1
    },

    {
      message: "Data una lista restituisci la sua lunghezza",
      data: () => rndNumList(rnd(400, 1000), 0, 1),
      solution: ({ data }) => data.length,
      points: 1
    },

    { 
      message: "Data una lista di parole invia una lista contenente le stesse parole tutte maiuscole",
      data: () => randomWords({
        min: 50,
        max: 100,
        wordsPerString: 1
      }).map(e => {
        e = e[0].toUpperCase() + e.substr(1)
        return e
      }),
      
      solution: ({ data }) => data.map(w => w.toUpperCase()),
      points: 1
    },

    {
      message: "Data una lista di numeri restituiscine la somma",
      data: () => rndNumList(50, 10, 30),
      solution: ({ data }) => data.reduce((acc, n) => acc += n, 0),
      points: 1
    },
    
    {
      message: "Data una lista di numeri restituisci la somma dei numeri maggiori di 5",
      data: () => rndNumList(50, 0, 10),
      solution: ({ data }) => data.reduce((acc, n) => {
        if (n > 5) {
          acc += n
        } 
        return acc
      }, 0),
      points: 1
    },

    {
      message: "Data una lista di numeri restituisci la somma dei numeri in posizioni pari (zero compreso)",
      data: () => rndNumList(50, 0, 10),
      solution: ({ data }) => data.reduce((acc, n, i) => {
        if (i % 2 === 0) {
          acc += n
        }
        return acc
      }, 0),
      points: 1
    },

    {
      message: "Data una lista di numeri restituisci la somma dei numeri dispari",
      data: () => rndNumList(50, 0, 10),
      solution: ({ data }) => data.reduce((acc, n) => {
        if (n % 2 !== 0) {
          acc += n
        }
        return acc
      }, 0),
      points: 1
    },
    
    {
      message: "Data una lista di parole ordinale in ordine alfabetico",
      data: () => randomWords({
        min: 50,
        max: 100,
        wordsPerString: 1
      }),
      solution: ({ data }) => data.sort(),
      points: 1
    },

    {
      message: "Data una lista di parole ordinale in ordine alfabetico e restituiscile tutte minuscole (attenzione, le parole possono avere delle lettere maiuscole)",
      data: () => randomWords({
        min: 50,
        max: 100,
        wordsPerString: 1
      }).map(e => {
        if (rnd(1, 6) >= 3) {
          e = e[0].toUpperCase() + e.substr(1)
        }
        
        return e
      }),
      solution: ({ data }) => data.map(e => e.toLowerCase()).sort(),
      points: 1
    },

    {
      message: "Data una lista di numeri restituiscine una contenente i numeri precedenti a quelli dati; es: [3, 5, 2] ---> [2, 4, 1]",
      data: () => rndNumList(100, -40, 40),
      solution: ({ data }) => data.map(n => n - 1),
      points: 1
    },

    {
      message: "Data una lista di numeri restituiscine una in cui ogni numero sia sommato con quello alla posizione successiva; l'ultimo numero della lista rimane invariato",
      data: () => rndNumList(100, 20, 80),
      solution: ({ data }) => {
        const out = []
        for (let i = 0; i < data.length - 1; i++) {
          out.push(data[i] + data[i + 1])
        }
        out.push(data[data.length - 1])
        return out
      },
      points: 1
    },

    {
      message: "Data una lista di numeri, conta i positivi, i negativi e gli zeri e restituisci un dictionary che riporti i dati rilevati con le seguenti chiavi: \"positivi\", \"negativi\", \"zeri\"",
      data: () => rndNumList(100, -5, 5),
      solution: ({ data }) => data.reduce((acc, n) => {
        if (n < 0) {
          acc.negativi ++
        } else if (n === 0) {
          acc.zeri ++
        } else {
          acc.positivi ++
        }
        return acc
      }, {
        positivi: 0,
        negativi: 0,
        zeri: 0
      }),
      points: 1
    },

    {
      message: "data una lista di parole, restituisci una nuova lista in cui le parole con un numero di lettere pari siano scritte in maiuscolo e le altre in minuscolo",
      data: () => randomWords({
        min: 50,
        max: 100,
        wordsPerString: 1
      }),
      solution: ({ data }) => data.map(w => w.length % 2 === 0 ? w.toUpperCase() : w.toLowerCase()),
      points: 1
    },

    {
      message: "data una lista di parole, restituisci una sola stringa che contenga tutte le parole della lista separate da uno spazio. ATTENZIONE: l'ultima parola non deve essere seguita da uno spazio",
      data: () => randomWords({
        min: 50,
        max: 100,
        wordsPerString: 1
      }),
      solution: ({ data }) => data.join(" "),
      points: 1
    },

    {
      message: "data una lista di parole, restituisci una sola stringa formata dall'ultimo carattere di ogni parola",
      data: () => randomWords({
        min: 50,
        max: 100,
        wordsPerString: 1
      }),
      solution: ({ data }) => data.reduce((acc, w) => acc += w[w.length - 1], ""),
      points: 1
    },

    {
      message: "data una lista di parole, restituisci una sola stringa formata dal primo carattere di ogni parola più lunga di 4 caratteri",
      data: () => randomWords({
        min: 50,
        max: 100,
        wordsPerString: 1
      }),
      solution: ({ data }) => data.reduce((acc, w) => w.length > 4 ? acc += w[0] : acc, ""),
      points: 1
    },

    {
      message: "Dato un numero restituisci una lista contenente tutti i suoi divisori ordinati in ordine crescente",
      data: () => rnd(6000, 10000),
      solution: ({ data }) => {
        const out = []
        for (let i = 1; i <= data; i++) {
          if (data % i === 0) {
            out.push(i)
          }
        }
        return out
      },
      points: 1
    },

    {
      message: "Dato una lista di persone restituisci una lista contenente il numero di figli di ciascuna persona",
      data: () => createPeopleStruct(),
      solution: ({ data }) => data.reduce((acc, persona) => {
        acc.push(persona.figli.length)
        return acc
      }, []),
      points: 1
    },

    {
      message: "Data una lista di numeri restituisci una lista in cui siano esclusi tutti i valori maggiori di 5",
      data: () => rndNumList(100, 0, 10),
      solution: ({ data }) => data.filter(e => e <= 5),
      points: 1
    },

    {
      message: "Data una lista di numeri restituiscine una in cui ci siano presenti solo i valori compresi tra 3 e 6 inclusi",
      data: () => rndNumList(100, 0, 10),
      solution: ({ data }) => data.filter(e => e >= 3 &&  e <= 6),
      points: 1
    },

    {
      message: "Data una lista di persone restituisci il numero derivato dalla somma di tutti i loro anni",
      data: () => createPeopleStruct(rnd(40, 50)),
      solution: ({ data }) => data.reduce((acc, p) => {
        acc += p.anni
        return acc
      }, 0),
      points: 1
    },

    {
      message: "Data una lista di persone restituisci una lista di nomi di tutte le persone che hanno un cognome che inizia per C",
      data: () => createPeopleStruct(rnd(40, 50)),
      solution: ({ data }) => data.reduce((acc, p) => {
        if (p.cognome.toUpperCase()[0] === "C") {
          acc.push(p.nome)
        }
        return acc
      }, []),
      points: 1
    },

    {
      message: "data una lista di stringhe restituisci il numero di \"a\" che compaiono in totale",
      data: () => randomWords({
        min: 50,
        max: 100,
        wordsPerString: 3
      }),
      solution: ({ data }) => data.reduce((acc, w) => acc += (w.match(/a/g) || []).length, 0),
      points: 1
    },

    {
      message: "data una lista di numeri restituisci una lista in cui tutti i positivi siano negativi e viceversa",
      data: () => rndNumList(100, -5, 5),
      solution: ({ data }) => data.map(n => n * -1),
      points: 1
    },

    {
      message: "dato un dictionary contenente le chiavi \"negozio\" e \"magazzino\", restituisci una lista formata da tutti i prodotti di entrambe le liste non ripetuti e ordinati alfabeticamente",
      data: () => ({
        negozio: rndFruit(4),
        magazzino: rndFruit(4)
      }),
      solution: ({ data }) => {
        return Object.keys([...data.negozio, ...data.magazzino].reduce((acc, f) => {
          acc[f] = true
          return acc
        }, {})).sort()
      },
      points: 1
    },

    {
      message: "dato un dictionary contenente le chiavi \"negozio\" e \"magazzino\", restituisci un dictionary nel quale la chiave sia il nome di ciascun prodotto DEL NEGOZIO e il valore sia il numero di pezzi di quel prodotto presenti SIA NEL NEGOZIO CHE NEL MAGAZZINO ",
      data: () => ({
        negozio: rndFruit(7),
        magazzino: rndFruit(70)
      }),
      solution: ({ data }) => {
        const out = data.negozio.reduce((acc, f) => {
          if (!acc[f]) {
            acc[f] = 1
          } else {
            acc[f] ++
          }
          
          return acc
        }, {})
        
        data.magazzino.forEach(f => {
          if (out[f]) {
            out[f] ++
          }
        })
        
        return out
      },
      points: 1
    },

    {
      message: "dato un numero calcolane il fattoriale",
      data: () => rnd(8, 10),
      solution: ({ data }) => {
        let out = 1
        for (let i = 1; i <= data; i++) {
          out *= i
        }
        return out
      },
      points: 1
    },

    {
      message: "data una mappa costituita da una stringa di varie righe, trova le coordinate della posizione del tesoro (reppresentata dal carattere X) e restituiscile in un dictionary alle chiavi \"x\" e \"y\"",
      data: () => {
        let map = ""
        const w = rnd(70, 80)
        const h = rnd(30, 35)
        
        const tesoro = {
          x: rnd(0, w - 1),
          y: rnd(0, h - 1)
        } 
          
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            if (x === tesoro.x && y === tesoro.y) {
              map += "X"
            } else {
              map += "."
            }
          }
          map += "\n"
        }
        
        return map
      },
      solution: ({ data: map }) => {
        const rows = map.split("\n")
        const h = rows.length
        const w = rows[0].length
        
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            if (rows[y][x] === "X") {
              return { x, y }
            }
          }
        }
      },
      points: 1
    }
  ]
}
