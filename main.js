function main() {
  request()
  requestAnimationFrame(main)
}

function filterData(arr) {
  return arr.filter((item,index,arr) => {
    return index % 70 === 0 || index === arr.length;
  })
}

function formatTime(timeArr){
  return timeArr.map(item => item.split(' ')[1])
}

function findDate(timeArray) {
  var start = timeArray.findIndex(element => element >= '11:30:00')
  var end = timeArray.findIndex(element => element > '13:00:00')
  return {start,end}
}


function draw(data) {
  let timeXAxis = formatTime(filterData(data.time))
  let aliggzf = filterData(data.aliggzf).map(item => item.replace('%',''))
  let jzzf = filterData(data.jzzf).map(item => item.replace('%',''))
  let aliggtl = filterData(data.aliggtl).map(item => item.replace('%',''))
  const {start,end} = findDate(timeXAxis)
  if(start >0 && end < 0){
  //  已经到中午11:30:00 还没有到下午13:00:00
    timeXAxis = timeXAxis.slice(0,start)
    aliggzf = aliggzf.slice(0,start)
    jzzf = jzzf.slice(0,start)
    aliggtl = aliggtl.slice(0,start)
  } else if (start > 0 && end > 0) {
  //  已经到了13:00:00
    timeXAxis = timeXAxis.slice(0,start).concat(timeXAxis.slice(end,timeXAxis.length))
    aliggzf = aliggzf.slice(0,start).concat(aliggzf.slice(end,aliggzf.length))
    jzzf = jzzf.slice(0,start).concat(jzzf.slice(end,jzzf.length))
    aliggtl = jzzf.slice(0,start).concat(aliggtl.slice(end,aliggtl.length))
  }
  var myChart = echarts.init(document.getElementById('main'))
  var option = {
    xAxis: {
      type: 'category',
      data: timeXAxis
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
      data: ['阿里港股涨幅','盘内涨幅','阿里港股套利']
    },
    series: [{
      data: aliggzf,
      type: 'line',
      name: '阿里港股涨幅',
      symbol: 'none',
    }, {
      data: jzzf,
      type: 'line',
      name: '盘内涨幅',
      symbol: 'none'
    },{
      data: aliggtl,
      type: 'line',
      name: '阿里港股套利',
      symbol: 'none'
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
