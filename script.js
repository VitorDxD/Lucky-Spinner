const add = document.querySelector('#btn-add')
const inputText = document.querySelector('#item-text')
const inputColor = document.querySelector('#item-color')
const rotate = document.querySelector('#btn-rotate')
const ctx = document.querySelector('#myChart')
const arrayText = []
const arrayColor = [] 
let myPieChart;

rotate.addEventListener('click', (e) => {
    e.preventDefault()
    ctx.animate(
    [
        { transform: 'rotate(0)' },
        { transform: `rotate( ${Math.random() * 3600}deg )`}
    ], 
    {
        duration: 2000,
        iterations: 1,
        fill: 'forwards'
    })
})

add.addEventListener('click', (e) => {
    e.preventDefault()
        arrayText.push(inputText.value)
        arrayColor.push(inputColor.value)
        const ctx = document.querySelector('#myChart')
    
        function createSizes(){
            let array = []
            for(var i = 0; i < arrayText.length; i++){
                array.push(360/arrayText.length)
            } 
            return array
        }
    
        let dados = {
            datasets: [{
                data: createSizes(),
                backgroundColor: arrayColor
            }],
            labels: arrayText
        }
        let opcoes = {
            cutoutPercentage: 0,
            events: [],
            plugins: {
                legend: {
                    display: false,
                },
                datalabels: {
                    formatter: (value, context) => {
                        return context.chart.data.labels[context.dataIndex]
                    },
                    color: "white",
                    font: {
                        size: 20
                    } 
                }
            }
        }

        //NECESSARIO ANALISAR
        if (myPieChart){
            myPieChart.destroy()
            console.log('Foi destruído')
        }
        
        myPieChart = new Chart (ctx, {
            type: 'pie',
            data: dados,
            options: opcoes,
            plugins: [ChartDataLabels]
        })
        inputText.value = ''
        inputColor.value = '#000000'
})