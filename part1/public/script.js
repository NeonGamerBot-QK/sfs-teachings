console.log('Loaded About Me')
console.log(window.navigator.onLine)
if(!window.navigator.onLine) {
    document.body.innerHTML = ''
window.stop()
    alert('Connect to the internet to continue')
window.open('https://localhost:3000')
    window.close()    
}
let noop = () => {}
fetch('/date').then(d => {
    d.json().then(data => {
        document.getElementById('date').innerHTML = data
    })
})
// console.log(window)
let lastfetch = 0;
let date = Date.now()
let latency = 0;
function createText(div, text, i) {
    div.className = 'box' 
    const p = document.createElement('p') 
       p.id = `info-${i}-text`
       p.innerHTML = text;
       div.appendChild(p)
       return p;
    
}
function createTitle(div, title, i) {
    const titleId = document.createElement('h1') 
    titleId.id = `info-${i}-title`
    titleId.innerHTML = title;
    div.appendChild(titleId)
    return titleId;
}
function createImg(div, url, i) {
    const titleId = document.createElement('img') 
    titleId.id = `info-${i}-image`
    titleId.className = 'box-img'
    titleId.src = url;
    div.appendChild(titleId)
    return titleId;
}
function save(item) {
    document.body.appendChild(item)
}
function reload() {
    let NowDate = Date.now()
    fetch('/data.json').then(d => d.json()).then(data => {
        document.getElementById('name').innerHTML = data.name; 
        document.getElementById('img-box').src = '/images/profile.jpg'
        data.tabs.forEach((d, i) => {
           // console.log(i)
           let changed = {}
           console.log('fetched data ' + parseInt( Date.now() - lastfetch))
           lastfetch = Date.now()
            latency = Date.now() - NowDate + (latency > 500 ? latency / 5 : latency)
            let textId = document.getElementById(`info-${i}-text`)
            let titleId = document.getElementById(`info-${i}-title`)
            let imgId = document.getElementById(`info-${i}-image`)
            if(!textId && !titleId) {
                var div = document.createElement('div')
                createTitle(div, d.title,i)
                createText(div, d.description,i)
               return save(div)
            }
            let dive;
            if(!titleId) {
                
                if(!dive) dive = document.createElement('div')
                titleId = createTitle(dive,d.description,i)
              }
           if(!textId) {
               if(!dive) dive = document.createElement('div')
            textId = createText(dive, d.description,i)
            }
            if(!imgId && d.ImageURL) {
                if(!dive) dive = document.createElement('div')
                imgId = createImg(dive, d.ImageURL, i)
                console.log(imgId)
            }
            let formatedDesc = d.description.match(/.{1,42}/g).join('\n');
                textId.innerHTML = formatedDesc;
                
                titleId.innerHTML = d.title
                if(dive) save(dive)
        })
        
    })
    return noop();
}
function fetchLatency() {
   // console.log('fetched')
    return (latency?latency:30)+600
}
let timeout = setInterval(reload,fetchLatency())
