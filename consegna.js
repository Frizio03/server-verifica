module.exports = ({
  exLength,
  ip,
  port,
  exMessages,
  fetchHelper,
}) => `<!DOCTYPE html>
<html>
<head>
  <title>Verifica</title>
  <style>
    body {
      font-family: monospace;
    }
    p {
      line-height: 25px;
    }
    code {
      background: #ffd7d7;
      border: solid 1px #ff7d7d;
      padding: 2px;
    }
    li {
      padding: 20px;
    }
  </style>
</head>
<body>
<h1>Verifica</h1>
<p>Esegui l'accreditamento e svolgi i ${exLength} esercizi proposti.</p>
<p>Per controllare lo stato di avanzamento del tuo lavoro puoi consultare i dati all'indirizzo <a href="http://${ip}:${port}/voto" target="_blank">http://${ip}:${port}/voto</a>.</p>
<ul>
${!fetchHelper ? "" : `
  <li>
    <h2>Accreditamento</h2>
    <p>Devi fare una chiamata in <code>POST</code> all'indirizzo <code>http://${ip}:${port}/accreditamento</code> inviando un JSON contentente la chiave <code>nome</code> con il tuo nome e cognome;</p>
  </li>
`}

  <li>
    <h2>Esercizi</h2>
    <p>La verifica è composta da <code>${exLength}</code> esercizi.</p>

    ${!fetchHelper ? "" : `
      <p>Per ogni esercizio devi fare una chiamata in <code>GET</code> con l'header <code>x-data</code> con valore <code>'true'</code> all'indirizzo <code>http://${ip}:${port}/esercizi/n</code> dove n corrisponde al numero dell'esercizio ( n >= 1 && n <= ${exLength} ) per visualizzare la consegna e i dati da elaborare;</p>
      <p>Una volta elaborati i dati fare una chiamata in <code>POST</code> allo stesso indirizzo inviando un JSON contenente la chiave <code>data</code> con la soluzione dell'esercizio;</p>
    `}

    <h3>Consegne:</h3>
    <ol>
      ${exMessages}
    </ol>
  </li>

</ul>
</body>
</html>
`
