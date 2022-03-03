<template>
  <div>
    <img class="img-1" src="../../../static/images/bg1.jpg" alt="">
    <div class="tip-d">
      <div class="img-box">
        <img src="../../../static/images/volume.png" alt="">
      </div>
      <p :animation="animationData">提醒：请各位同学关注自己的考勤结果，如有异常请及时与老师联系。</p>
    </div>
    <div class="center-box">
      <div class="center-item" v-for="(item, index) in itemList" :key="index">
        <img :src="item.iconSrc" alt="">
        <p>{{ item.title }}</p>
      </div>
    </div>
    <div class="line-1">
      <hr class="hr-1">
      <p>课程信息</p>
      <hr class="hr-1">
    </div>
    <div class="class-box" v-for="(item2, index) in classList" :key="index">
      <p class="class-p-1">{{ item2.className }}</p>
      <p class="class-p-2">教师:{{ item2.teacherName }}</p>
      <p class="class-p-3">{{ item2.location }}</p>
    </div>
  </div>
</template>

<script>
import icon1 from '../../../static/images/icon1.png'
import icon2 from '../../../static/images/icon2.png'
import icon3 from '../../../static/images/icon3.png'
import icon4 from '../../../static/images/icon4.png'
import icon5 from '../../../static/images/icon5.png'
import icon6 from '../../../static/images/icon6.png'
import icon7 from '../../../static/images/icon7.png'
export default {
  data () {
    return {
      itemList: [{
        iconSrc: icon1,
        title: '扫码签到'
      }, {
        iconSrc: icon2,
        title: '数字签到'
      }, {
        iconSrc: icon3,
        title: '课堂出勤'
      }, {
        iconSrc: icon4,
        title: '请假申请'
      }, {
        iconSrc: icon5,
        title: '每日健康打卡'
      }, {
        iconSrc: icon6,
        title: '出入校园报备'
      }, {
        iconSrc: icon7,
        title: '返校申请'
      }, {
        iconSrc: null,
        title: '-'
      }, {
        iconSrc: null,
        title: '-'
      }],
      classList: [{
        className: '中国特色社会主义理论与实践研究',
        teacherName: '张波',
        location: '[第3周-第11周]星期二:3-4节:博学楼E403|[第3周-第11周]星期五:1-2节:博学楼E403'
      }, {
        className: '中国特色社会主义理论与实践研究',
        teacherName: '刘寒梅',
        location: '[第3周-第11周]星期二:3-4节:博学楼E403|[第3周-第11周]星期五:1-2节:博学楼E403'
      }, {
        className: '油藏工程涉及方法与应用',
        teacherName: '袁迎中',
        location: '[第6周-第17周]星期二:3-4节:博学楼E403|[第6周-第17周]星期五:1-2节:博学楼E403'
      }, {
        className: '油藏工程涉及方法与应用',
        teacherName: '李骞',
        location: '[第6周-第17周]星期二:3-4节:博学楼E403|[第6周-第17周]星期五:1-2节:博学楼E403'
      }, {
        className: '油藏工程涉及方法与应用',
        teacherName: '李继强',
        location: '[第3周-第11周]星期二:3-4节:博学楼E403|[第3周-第11周]星期五:1-2节:博学楼E403'
      }],
      timer: null, // 提示语滚动计时器
      animationData: {}
    }
  },

  methods: {
    rolling () {
      // 从右向左移动
      let animation1 = wx.createAnimation({
        duration: 10000,
        timingFunction: 'linear'
      })
      setTimeout(() => {
        animation1.left(-430).step()
        this.animationData = animation1.export()
      }, 0)
    }
  },
  created () {
  },
  onReady () {
    this.rolling()
    this.timer = setInterval(() => {
      // 从左向右移动（瞬移）
      let animation2 = wx.createAnimation({
        duration: 0,
        timingFunction: 'step-start'
      })
      animation2.left(350).step()
      this.animationData = animation2.export()
      this.rolling()
    }, 10100)
  }
}
</script>

<style scoped>
.img-1{
  width: 100%;
  height: 3rem;
}
.tip-d{
  width: 100%;
  height: 0.6rem;
  background-color: #fcfaeb;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  padding: 0 0.2rem 0 0;
  margin-top: -0.1rem;
  overflow: hidden;
}
.img-box{
  width: 0.8rem;
  height: 0.5rem;
  background-color: #fcfaeb;
  /* background-color: red; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 999;
  box-sizing: border-box;
}
.img-box img{
  width: 0.4rem;
  height: 0.4rem;
}
.tip-d p{
  width: calc(100% - 0.6rem);
  color: #d17637;
  white-space: nowrap;
  /* overflow: hidden; */
  font-size: 0.28rem;
  /* background-color: blue; */
  position: relative;
  left: 350px;
}
.center-box{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.center-item{
  width: calc(100% / 3);
  height: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1rpx solid #eeeeee;
}
.center-item img{
  width: 70rpx;
  height: 70rpx;
}
.center-item p{
  font-size: 0.3rem;
}
.line-1{
  width: 100%;
  height: 0.3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 0.3rem 0;
}
.line-1 p{
  width: 150rpx;
  text-align: center;
  /* background-color: yellow */
}
.hr-1{
  width: calc((100% - 90px) / 2);
  height: 2rpx;
  background-color: #cccccc;
}
.class-box{
  width: 92%;
  height: 2.3rem;
  border: 1px solid #cccccc;
  margin: 0 auto;
  border-radius: 5px;
  margin-bottom: 0.2rem;
}
.class-p-1{
  width: 100%;
  height: 0.6rem;
  border-bottom: 1px solid #eeeeee;
  font-size: 0.3rem;
  box-sizing: border-box;
  padding-left: 0.3rem;
  line-height: 0.6rem;
}
.class-p-2{
  width: 100%;
  height: 0.4rem;
  font-size: 0.27rem;
  color: #4e4e4e;
  padding-left: 0.3rem;
  margin: 0.2rem 0;
}
.class-p-3{
  width: 100%;
  height: 0.4rem;
  font-size: 0.24rem;
  color: #929292;
  padding: 0 0.3rem;
  /* white-space: pre-wrap; */
  /* word-wrap: break-word;  */
  /* background-color: red; */
  box-sizing: border-box;
}
</style>
