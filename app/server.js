const express = require('express')
const bodyParser = require('body-parser')
const net = require('net')
const { exec } = require('child_process')
const fs = require('fs')
const app = express()
const port = 4545

import newTek from './newTek.js'
import VizCommands from './VizCommands.js'

const VIZ = new VizCommands()
const client = new net.Socket()


const nvgIP = 'localhost'
const nvgPort = 6100

client.connect(nvgPort, nvgIP, () => console.log(`connected to ${nvgIP}:${nvgPort}`))

const playGraphics = (graphics, delays) => {
  graphics.map((gfx, i) => {
    setTimeout( () => {
      console.log(gfx)
      client.write(gfx)
    }, delays[i])
  })
}


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//LJTV
let contents = [[],[],[]]
let isRed = Array(3).fill(Array(6).fill(false))
let sideStories = ['','','','']
let sideStoryTitles = ['','','','']
let sceneIsIn = false
let previousContentsIter = 0

const writeData = (data) => {
  let content = JSON.stringify(data);
  fs.writeFileSync('C:/Users/grafika/Desktop/PROGRAMI/ljtvPopoldneData.json', content)
  console.log('created old data')
}

let oldData = Array(3).fill(Array(6).fill(false))
try {
  const rawdata = fs.readFileSync('C:/Users/grafika/Desktop/PROGRAMI/ljtvPopoldneData.json')
  oldData = JSON.parse(rawdata)
} catch {
  console.log('ajaja')
}
//api fetchers and formaters
const getGasPrices = () => {
  const url = `https://goriva.si/api/v1/search/?format=json&franchise=&name=&o=&position=46.069865199999995%2C14.521375599999997&radius=50000&timestamp=${Date.now()}`
  fetch(url)
    .then( response => response.json() )
    .then( data => {
      let sortedResults = data.results
      sortedResults.sort((a,b) => {
        if(a.prices['95'] < b.prices['95']) return -1
        if(a.prices['95'] > b.prices['95']) return  1
        return 0
      })
      const topValidResults = []
      sortedResults.map((item, iter) => {
        if (item.prices['95'] && item.prices['dizel']) topValidResults.push(item)
      })
      const finalData = topValidResults.slice(0, 6)
      contents[0] = finalData.map((offer, iter) => {
        if (iter < 7) {
          return({
            title: offer.name
              .replace(' LJUBLJANA', '')
              .replace('FE_trading d.o.o. / FE_AVANTI_LJUBLJANA_TOPLARNIŠKA', 'HOFER TOPLARNIŠKA')
              .replace(' -', '')
              .replace('0', '').replace('1', '').replace('2', '').replace('3', '').replace('4', '')
              .replace('5', '').replace('6', '').replace('7', '').replace('8', '').replace('9', '')
              .replace('0', '').replace('1', '').replace('2', '').replace('3', '').replace('4', '')
              .replace('5', '').replace('6', '').replace('7', '').replace('8', '').replace('9', '')
              .replace('0', '').replace('1', '').replace('2', '').replace('3', '').replace('4', '')
              .replace('5', '').replace('6', '').replace('7', '').replace('8', '').replace('9', '')
              .replace('0', '').replace('1', '').replace('2', '').replace('3', '').replace('4', '')
              .replace('5', '').replace('6', '').replace('7', '').replace('8', '').replace('9', '')
              .slice(0,25),
            top: `bencin 95: ${offer.prices['95']}€`,
            bottom: `dizel: ${offer.prices['dizel']}€`
          })
        }
      })
    })
}

const getCovidData = () => {
  fetch('https://www.gov.si/teme/koronavirus-sars-cov-2/aktualni-podatki/element/67669/izvoz.csv')
    .then(res => res.text())
    .then(text => {
      const splitted = text.split(",")
      console.log(splitted)
      contents[1] = [
        {title: 'TESTIRANI',          top: '8027', bottom: ''},
        {title: 'POZITIVNI',          top: '83', bottom: ''},
        {title: 'HOSPITALIZIRANI',    top: '316', bottom: ''},
        {title: 'NA INTENZIVNI',      top: '96', bottom: ''},
        {title: 'ODP. IZ BOLNIŠNICE', top: '2', bottom: ''},
        {title: 'UMRLI',              top: '1', bottom: ''},
      ]
      isRed[1] = contents[1].map((item, iter) => {
        if (item.top > oldData[1][iter].top) {
          return true
        } else {
          return false
        }
      })
    })
}
const getGoldPrices = () => {
  const myHeaders = new Headers();
  myHeaders.append("x-access-token", "goldapi-4es8kcuki48ervs-io");
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };


  const urls = [
    "https://www.goldapi.io/api/XAU/EUR",
    "https://www.goldapi.io/api/XAG/EUR",
    "https://www.goldapi.io/api/XPT/EUR",
    "https://www.goldapi.io/api/XPD/EUR"
  ]
  const titles = [
    'zlato',
    'srebro',
    'platina',
    'paladij'
  ]

  const grabContent = (url, number) => fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => contents[2][number] = {title: titles[number] + ' [EUR]', top: result.price.toFixed(3), bottom: ''})
    .catch(error => console.log('error', error));

  Promise
    .all(urls.map((url, iter) => grabContent(url,iter)))
    .then(() => {
      console.log(contents)
      fetch('http://data.fixer.io/api/latest?access_key=d269abf0c32ad938b79494da19c37599')
        .then(data => data.json())
        .then(result => {
          contents[2][4] = {title: 'USD [EUR]', top: result.rates.USD.toFixed(2), bottom: ''}
          contents[2][5] = {title: 'CHF [EUR]', top: result.rates.CHF.toFixed(2), bottom: ''}
        })
        .then(() => {
          isRed[2] = contents[2].map((item, iter) => {
            console.log(`${Number(item.top)} < ${Number(oldData[2][iter].top)}`)
            console.log(`${Number(item.top) < Number(oldData[2][iter].top)}`)
            if (Number(item.top) < Number(oldData[2][iter].top)) return true
            else return false
          })
          console.log(contents[2])
          console.log(oldData[2])
          console.log(isRed)
        })
    })

}

getGoldPrices()
getGasPrices()
getCovidData()

//helpers
let contentsIter = 0
const advanceContentsIter = () => {
  previousContentsIter = contentsIter
  contentsIter < contents.length - 1 ?  contentsIter += 1 : contentsIter =  0
}
let storiesIter = 0
const advanceStoriesIter = () => {
  storiesIter < sideStories.length / 2 - 1 ?  storiesIter += 1 : storiesIter = 0
  console.log(storiesIter)
}
const playContentsOnViz = (content) => {
  console.log(contents)
  console.log(isRed[contentsIter])
  playGraphics( VIZ.changeContents2(content, isRed[contentsIter], isRed[previousContentsIter]), [200, 300, 400, 500, 600, 700, 800])
  playGraphics( VIZ.changeStories([sideStories[0 + 2 * storiesIter], sideStories[1 + 2 * storiesIter]], [sideStoryTitles[0 + 2 * storiesIter], sideStoryTitles[1 + 2 * storiesIter]]), [3500, 4000])
}
const playStories = () => {
  playGraphics( VIZ.changeStories([sideStories[0 + 2 * storiesIter], sideStories[1 + 2 * storiesIter]], [sideStoryTitles[0 + 2 * storiesIter], sideStoryTitles[1 + 2 * storiesIter]]), [900, 1000])
  advanceStoriesIter()
}
const changeContents = () => {
  setInterval(() => {
    if (sceneIsIn) {
      advanceContentsIter()
      playContentsOnViz(contents[contentsIter])
      if (contentsIter == 0) {
        playStories()
      }
    }
  }, 10000)
}
changeContents()

const celaPasicaIn = (content) => {
  sceneIsIn = true
  playGraphics([VIZ.celaPasicaIn()], [10, 20])
}
const celaPasicaOut = (content) => {
  sceneIsIn = false
  playGraphics([VIZ.celaPasicaOut()], [10, 20])
}

//ROOT end point
app.get('/', (req, res) => res.send('Look what you have done to my BOOoY!'))


app.get('/scene_IN', (req, res) => {
  console.log('scene_IN')
  res.send('scene_IN')
  celaPasicaIn()
  playContentsOnViz(contents[contentsIter])
})
app.get('/scene_OUT', (req, res) => {
  console.log('scene_OUT')
  res.send('scene_OUT')
  celaPasicaOut()
})
/*  Post requesti, da dobim podatke in react frontenda.  */
app.post('/setStories', (req, res) => {
  console.log('stories =', req.body)
  sideStories = req.body.stories
  sideStoryTitles = req.body.titles
  writeData(contents)
  res.sendStatus(200)
})
app.post('/podpis', (req, res) => {
  console.log('podpis =', req.body.podpis)
  console.log(`podpis is left = ${req.body.isLeft}`)
  playGraphics(VIZ.podpis(req.body.podpis, req.body.isLeft), [10, 5000])
  res.sendStatus(200)
})



app.listen(port, () => console.log(`Listening on at http://localhost:${port}`))
