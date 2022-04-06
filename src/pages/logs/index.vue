<template>
  <div class="main-box">
    <canvas canvas-id="canvas" id="canvas" class="canvas"></canvas>
    <div v-if="!show1">
      <input class="input1" v-model="studentId" type="number" placeholder="请输入学号">
      <p class="tip-p">请正确输入学号！</p>
      <button class="btn" @click="comfire()">确认</button>
    </div>
    <!-- <canvas v-show="show1" canvas-id="canvas" id="canvas" class="canvas"></canvas> -->
    <div v-if="show1">
      <!-- <canvas canvas-id="canvas" id="canvas" class="canvas"></canvas> -->
      <div class="msg-box">
        <img class="avator" :src="userMsg.avatorSrc" alt="">
        <div class="msg-d">
          <p>{{ userMsg.name }}({{ userMsg.studentId }})</p>
          <p>学院 : {{ userMsg.college }}</p>
          <p>班级 : {{ userMsg.class }}</p>
          <p>宿舍 : 走读</p>
          <img class="qrcode-img-new" :src="qrcode1" alt="二维码">
          <p>{{ nowTime }}</p>
        </div>
      </div>
      <div class="bottom-d">
        <!-- <p class="p-1">{{ nowTime }}</p> -->
        <!-- <img class="qrcode-img" :src="qrcode ? qrcode1 : qrcode2" alt="二维码"> -->
        <!-- <p class="p-2">识别码刷新时间还有 : {{ updateTime }}秒</p> -->
        <div class="back-d" @click="exit()">
          <img class="switchIcon" :src="switchIcon" alt="图标">
          <p class="getback-p">退出账号</p>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import qrcode1 from '../../../static/images/qrcode1.png'
import qrcode2 from '../../../static/images/qrcode2.png'
import switchIcon from '../../../static/images/switch.png'
import avator1 from '../../../static/images/avator1.jpg'
import avator2 from '../../../static/images/avator2.jpg'
import avator3 from '../../../static/images/avator3.jpg'
export default {
  data () {
    return {
      userMsg: {},
      userMsg1: {
        avatorSrc: avator1,
        name: '黎永豪',
        studentId: '2021201116',
        college: '石油与天然气工程学院',
        class: '石油2021'
      },
      userMsg2: {
        avatorSrc: avator2,
        name: '陈华',
        studentId: '2020205051',
        college: '化学化工学院',
        class: '化学2020'
      },
      userMsg3: {
        avatorSrc: avator3,
        name: '梁家豪',
        studentId: '2018442756',
        college: '建筑工程学院',
        class: '土木2018-03'
      },
      qrcode: true, // 显示在页面上的二维码
      qrcode1,
      qrcode2,
      switchIcon,
      timer: null, // 计时器，实时显示当前时间
      nowTime: '', // 当前时间
      updateTime: '',
      timer2: null, // 10秒倒计时
      show1: false,
      studentId: '' // 学号
    }
  },

  methods: {
    // 波浪动画
    loop1 () {
      const query = wx.createSelectorQuery()
      query.select('#canvas').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        var canvas = {
          width: res[0].width,
          height: res[0].height
        }
        // console.log('width----' + this.width)
        // console.log('height----' + this.height)
        // console.log(canvas)
        var boHeight = canvas.height / 25 // 除数越大，波浪越陡
        var posHeight = canvas.height / 1.2
        // 初始角度为0
        var step = 0
        // 定义三条不同波浪的颜色
        var lines = ['rgba(255,255,255, 1)', 'rgba(150,183,122, 1)']
        var context = wx.createContext()
        let requestAnimFrame = (function () {
          return function (callback) {
            setTimeout(callback, 1000 / 60)
          }
        })()
        function loop () {
          context.clearRect(0, 0, canvas.width, canvas.height)
          step++
          // 画3个不同颜色的矩形
          for (var j = lines.length - 1; j >= 0; j--) {
            context.fillStyle = lines[j]
            // 每个矩形的角度都不同，每个之间相差45度
            var angle = (step + j * 100) * Math.PI / 300
            var deltaHeight = Math.sin(angle) * boHeight
            var deltaHeightRight = Math.cos(angle) * boHeight
            context.beginPath()
            context.moveTo(0, posHeight + deltaHeight)
            context.bezierCurveTo(canvas.width / 2, posHeight + deltaHeight - boHeight, canvas.width / 2, posHeight + deltaHeightRight - boHeight, canvas.width, posHeight + deltaHeightRight)
            context.lineTo(canvas.width, canvas.height)
            context.lineTo(0, canvas.height)
            context.lineTo(0, posHeight + deltaHeight)
            context.closePath()
            context.fill()
          }
          wx.drawCanvas({
            canvasId: 'canvas',
            actions: context.getActions()
          })
          requestAnimFrame(loop)
        }
        loop()
      })
    },
    // 获取当前时间
    getNowTime () {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let secends = date.getSeconds()
      if (minute < 10) {
        minute = '0' + minute
      }
      if (secends < 10) { // 小于10，就显示为01，02，03
        secends = '0' + secends
      }
      let nowTime = ''
      if (month + 1 < 10) {
        nowTime = year + '年' + '0' + (month + 1) + '月' + day + '日' + ' ' + hour + ':' + minute + ':' + secends
      } else {
        nowTime = year + '年' + (month + 1) + '月' + day + '日' + ' ' + hour + ':' + minute + ':' + secends
      }
      // console.log('当前时间---' + nowTime)
      return nowTime
    },
    // 倒计时10秒
    countdown () {
      let beginTime = 10
      this.updateTime = beginTime
      this.timer2 = setInterval(() => {
        beginTime--
        this.updateTime = beginTime
        if (beginTime === 0) {
          clearInterval(this.timer2)
          this.qrcode = !this.qrcode
        }
      }, 1000)
    },
    comfire () {
      if (this.studentId === '2021201116' || this.studentId === '2020205051' || this.studentId === '2018442756') {
        if (this.studentId === '2021201116') {
          this.userMsg = this.userMsg1
        }
        if (this.studentId === '2020205051') {
          this.userMsg = this.userMsg2
        }
        if (this.studentId === '2018442756') {
          this.userMsg = this.userMsg3
        }
        wx.setStorage({
          key: 'studentId',
          data: this.studentId
        })
        this.show1 = true
        // this.$nextTick(() => {
        //   this.loop1() // 波浪动画
        // })
        // this.countdown() // 倒计时
        this.timer = setInterval(() => { // 当前时间
          this.nowTime = this.getNowTime()
        }, 1000)
      } else {
        wx.showToast({
          title: '没有该用户！',
          icon: 'error',
          duration: 1000
        })
      }
    },
    exit () {
      clearInterval(this.timer)
      clearInterval(this.timer2)
      // clearInterval(this.timer3)
      this.show1 = !this.show1
    }
  },
  onLoad () {
    this.qrcode = this.qrcode1
  },
  onReady () {
    // console.log('缓存-----' + wx.getStorageSync('studentId'))
    this.studentId = wx.getStorageSync('studentId') || ''
    this.loop1()
    // this.countdown()
  },
  onShow () {
    this.timer = setInterval(() => {
      this.nowTime = this.getNowTime()
    }, 1000)
  },
  onHide () {
    clearInterval(this.timer)
    // clearInterval(this.timer2)
  }
}
</script>

<style scoped>
.main-box{
  width: 100%;
  height: 100%;
  /* background-color: red; */
  position: relative;
}
.tip-p{
  width: 90%;
  margin: 0rpx auto;
  font-size: 0.3rem;
  color: #cccccc;
  /* background-color: red; */
}
.input1{
  width: 90%;
  height: 1rem;
  border: 1px solid #cccccc;
  margin: 0rpx auto;
  /* margin-top: 10rpx; */
  /* text-indent: 12px; */
  box-sizing: border-box;
  padding-left: 12px;
  border-radius: 20rpx;
}
.btn{
  width: 90%;
  height: 1rem;
  background-color: #679952;
  margin: 100rpx auto;
  color: white;
}
.canvas{
  width: 100%;
  height: 7.5rem;
  background-color: #679952;
  /* background-color: #96f16b; */
}
.msg-box{
  width: 710rpx;
  height: auto;
  /* background-color: blue; */
  margin: 0 calc((100% - 355px) / 2);
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0.8rem;
}
.avator{
  width: 3.5rem;
  height: 4.6rem;
  margin-right: 20rpx;
  border-radius: 20rpx;
  margin-top: 3rpx;
}
.msg-d p{
  font-size: 0.25rem;
  color: white;
  margin-bottom: 0.15rem;
}
.bottom-d{
  width: 500rpx;
  height: auto;
  /* background-color: pink; */
  margin: 0 calc((100% - 250px) / 2);
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.3rem;
}
.p-1{
  color: #235061;
}
.p-2{
  color: #235061;
}
.qrcode-img{
  width: 290rpx;
  height: 290rpx;
  margin: 20rpx 0;
}
.qrcode-img-new{
  width: 265rpx;
  height: 265rpx;
  margin: 0rpx 35rpx;
}
.back-d{
  display: flex;
  flex-direction: row;
  margin-top: 50rpx;
  /* background-color: red; */
  display: flex;
  flex-direction: row;
  align-items: center;
}
.switchIcon{
  width: 50rpx;
  height: 50rpx;
  margin-right: 10rpx;
}
.getback-p{
  line-height: 50rpx;
}
</style>
