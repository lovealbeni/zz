function main() {
  request()
}

function filterData(arr) {
  return arr.filter((item,index,arr) => {
    return index % 70 === 0 || index === arr.length;
  })
}

function draw(data) {
  console.log(data.time)
  console.log(data.jzzf)
  var myChart = echarts.init(document.getElementById('main'))
  var option = {
    xAxis: {
      type: 'category',
      data: filterData(data.time.map(item => item.split(' ')[1]))
    },
    yAxis: [
      {
        name: '涨幅',
        type: 'value'
      }
    ],
    tooltip: {
      trigger: 'axis'
    },
    legend:{
      data: ['阿里港股涨幅','盘内涨幅']
    },
    series: [{
      data: filterData(data.aliggzf.map(item => item.replace('%',''))),
      type: 'line',
      name: '阿里港股涨幅',
    }, {
      data: filterData(data.jzzf.map(item => item.replace('%',''))),
      type: 'line',
      name: '盘内涨幅',
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
      console.log(myObj)
      draw(myObj)
    }
  }
  const requestDate = new Date()
  // const requestUrl = `result_zz_${requestDate.getFullYear()}-${(requestDate.getMonth()+1)<10?'0'+(requestDate.getMonth()+1):requestDate.getMonth()+1}-${requestDate.getDate()}.json`
  const requestUrl = `result_zz_2021-03-24.json`
  httpRequest.open("GET",requestUrl,true)
  httpRequest.send()
}

window.onload = main
