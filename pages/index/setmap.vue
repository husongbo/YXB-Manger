<template>
<div class="setmap">
  <van-nav-bar
      :title="$route.name"
      left-arrow
      :border='false'
      fixed
      class="bg-f3f3f3"
      @click-left="back"
  />
  <div class="height-46px"></div>




  <iframe id="mapPage" width="100%" height="100%" frameborder=0 src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=DTGBZ-IHPWP-6WCDC-VKXZN-5K7PQ-DBBU7&referer=myapp">
  </iframe>
  <van-button class="footer" @click="Send">
    完成
  </van-button>

</div>
</template>

<script>
  export default {
    name: "setmap",
    data(){
      return {
        Location:null,
        msg:'callback'
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      init(){
        let that = this
        window.addEventListener('message', function(event) {
          // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
          let loc = event.data;
          if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
            that.Location = loc;		
          }
        }, false);
      },
      Send(){
        if(this.Location === undefined || this.Location === null){this.$notify('请选择一个地址');return false}
        this.JumpPa('/peisongdian',{location:this._G.Encry(this.Location),type:this._G.Encry(this.msg)})
      },
    }

  }
</script>

<style lang="less">
  .setmap{

    #mapPage{
      position: relative;
      height: calc(100vh - (47px + 55px));
    }
    .footer{
      height: 55px;
      color: #fff;
      position: absolute;
      text-align: center;
      z-index: 10;
      left: 0px;
      right: 0px;
      bottom: 0px;
      font-size: 1.1rem;
      width: 100%;
      background-color: #C00305 !important;
    }




  }
</style>
