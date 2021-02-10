from spalla import Verifica

Verifica.url = "http://localhost:8080"
Verifica.firma("Giovanni Bruno")

def exec(n, printData = True): 
  es = Verifica.inizia_esercizio(n)
  if printData:
    print(es.testo)

  if n == 1:
    r = 0
    for n in es.dati:
      if n > 546:
        r += n

  elif n == 2:
    r = 0
    for p in es.dati:
      if len(p) < 5:
        r += 1

  elif n == 3:
    r = []
    for n in es.dati:
      if n % 2 == 0 and n > 5:
        r.append(n)

  elif n == 4:
    r = []
    for i in range(len(es.dati)):
      if es.dati[i] > 0:
        r.append(i)

  elif n == 5:
    r = []
    for parola in es.dati:
      if parola[0] == "t" or parola[-1] == "t":
        r.append(parola)
  
  elif n == 6:
    r = []
    for i in range(26, es.dati + 1):
      if i % 3 != 0:
        r.append(i)

  elif n == 7:
    r = []
    for parola in es.dati.split():
      if parola[0] != "o" and parola[0] != "t":
        r.append(parola)

  # print(r)
  es.consegna(r)

'''
for i in range(1, 8):
  exec(i, True)
'''

Verifica.stampa_esercizi()
