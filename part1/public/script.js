console.log('Loaded About Me')

let noop = () => {}
fetch('/date').then(d => {
    d.json().then(data => {
        document.getElementById('date').innerHTML = data
    })
})
let date = Date.now()
let latency = 0;
function reload() {
    let NowDate = Date.now()
    fetch('/data.json').then(d => d.json()).then(data => {
        data.tabs.forEach((d, i) => {
           // console.log(i)
            latency = Date.now() - NowDate + (latency > 500 ? latency / 5 : latency)
            let textId = document.getElementById(`info-${i}-text`)
            let titleId = document.getElementById(`info-${i}-title`)
            textId.innerHTML = d.description
            titleId.innerHTML = d.title
        })
        
    })
}
setInterval(() => {
    console.log(latency)
}, 1);
let timeout = setInterval(reload,latency?latency:30+600)
let oldlatency = latency.toFixed()
while(oldlatency !== latency) {
    oldlatency = latency.toFixed()
clearInterval(timeout)
timeout = setInterval(reload,(latency?latency:30)+600)
}