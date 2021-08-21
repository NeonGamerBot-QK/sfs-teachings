console.log('Loaded About Me')

let noop = () => {}
fetch('/date').then(d => {
    d.json().then(data => {
        document.getElementById('date').innerHTML = data
    })
})
fetch('/info').then(d => d.json()).then(data => {
    data.forEach((d, i) => {
        console.log(i)
        let textId = document.getElementById(`info-${i}-text`)
        let titleId = document.getElementById(`info-${i}-title`)
        textId.innerHTML = d.description
        titleId.innerHTML = d.title
    })
    
})