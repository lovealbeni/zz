function main() {
  request()
}

function draw(data) {
  console.log(data.time)
  console.log(data.jz)
  var myChart = echarts.init(document.getElementById('main'))
  var option = {
    xAxis: {
      type: 'category',
      data: data.time
    },
    yAxis: [
      {
        name: 'A',
        type: 'value',
      }
    ],
    series: [{
      data: data.jz,
      type: 'line'
    }
      // ,{
      //   data: [10, 20, 24, 28, -15, 17, 20],
      //   type: 'line',
      //   yAxisIndex:1,
      //   symbol: 'none',
      //   lineStyle: {
      //     width: 1,
      //     color: 'transparent'
      //   },
      //   markLine: {
      //     symbol: 'none'
      //   }
      // }
    ]
  };
  myChart.setOption(option)
}

function request() {
  var httpRequest = new XMLHttpRequest()
  httpRequest.onreadystatechange = function(){
    if(this.readyState === 4 && this.status === 200) {
      const myObj = JSON.parse(this.responseText)
      draw(myObj)
    }
  }
  const requestDate = new Date()
  // const requestUrl = `result_zz_${requestDate.getFullYear()}-${(requestDate.getMonth()+1)<10?'0'+(requestDate.getMonth()+1):requestDate.getMonth()+1}-${requestDate.getDate()}.json`
  const requestUrl = `result_zz_2021-03-22.json`
  httpRequest.open("GET",requestUrl,true)
  httpRequest.send()
}

window.onload = main
