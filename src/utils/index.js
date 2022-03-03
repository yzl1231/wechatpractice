export function getWaves (id) {
  var ctx = document.getElementById(id).getContext('2d')
  var step = 0
  let init = function () {
    // 清空canvas
    ctx.clearRect(0, 0, 200, 200)
    step += 3
    // 转化为弧度
    var stepAngle = step * Math.PI / 180
    var deltaHeight = Math.sin(stepAngle) * 20
    var deltaHeightRight = Math.cos(stepAngle) * 20
    var y = 100 + deltaHeight
    // 计算在左半圆上随着y值上下移动，对应的x值
    var expression = 8100 - Math.pow((100 - y), 2)
    var x = 100 - Math.sqrt(expression)
    var rightY = 100 + deltaHeightRight
    var expressionRight = 8100 - Math.pow((100 - rightY), 2)
    // 取右侧的X坐标（同一个y值会有两个x坐标）
    var rightX = 200 - (100 - Math.sqrt(expressionRight))
    // alert("rightX:"+rightX+" rightY:"+rightY+" x:"+x+" y:"+y)
    ctx.lineWidth = 5
    ctx.strokeStyle = 'green'
    ctx.beginPath()
    ctx.arc(100, 100, 90, 0, Math.PI * 2, false)
    ctx.stroke()
    // ctx.fillStyle = "green"
    ctx.fillStyle = 'rgba(0,222,255, 0.2)'
    ctx.beginPath()
    ctx.moveTo(x, y)
    // ctx.lineTo(rightX, rightY)
    ctx.bezierCurveTo(100, y - 30, 100, rightY - 30, rightX, rightY)
    // ctx.stroke()
    // 计算圆起始点（与X轴平行的直径的右侧端点）与圆左侧给定Y坐标的点
    var distance = Math.sqrt(Math.pow((190 - x), 2) + Math.pow((100 - y), 2))
    // sina=d/2r   a为夹角的一半  2a为两点的圆心角   Math.asin最终结果为弧度 如asin(1)=1/2*PI
    var angle = Math.asin(distance / 180) * 2
    var distanceRight = Math.sqrt(Math.pow((190 - rightX), 2) + Math.pow((100 - rightY), 2))
    var angleRight = Math.asin(distanceRight / 180) * 2
    // ctx.beginPath()
    // 如果在左侧上半圆则用2PI-弧度
    if (y < 100) {
      angle = 2 * Math.PI - angle
    }
    if (rightY < 100) {
      angleRight = -angleRight
    }
    ctx.arc(100, 100, 90, angleRight, angle, false)
    // ctx.stroke()
    ctx.fill()
    window.requestAnimationFrame(init)
  }
}

// export default {
//   getWaves()
// }
