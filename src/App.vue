<template>
  <div id="app">
      <heade v-show = logined ></heade>
       <transition
       mode="out-in"
       :duration="280"
       appear-active-class="fade-enter-active"  
       name="fade">
        <keep-alive :include="keepAlive">
          
          <router-view ></router-view>
          
        </keep-alive>
        <!-- <router-view v-if="!$route.meta.keepAlive" key="158"></router-view> -->
      </transition>
      <!-- <transition-group
       mode="out-in"
       appear
       enter-active-class="animated lightSpeedIn fade-enter-active"
       leave-active-class="animated lightSpeedOut fade-leave-active"
       appear-active-class="animated lightSpeedIn fade-enter-active"  
       name="fade">
        <router-view v-if="!$route.meta.keepAlive" key="158"></router-view>
        
      </transition-group> -->
      
      <foot v-show = logined></foot>
  </div>
</template>

<script>
import foot from './common/footer/footer';
import heade from './common/header/header';

export default {
  name: 'App',
  components:{
      foot,
      heade,
  },
  computed:{
    keepAlive(){
      return this.$store.state.keepAlive
    },
    logined(){
      return this.$store.state.logined
    }
  },
}
</script>

<style>
  *{
    margin:0;
    /* padding: 0; */
  }
  html,body,#app {
    height: 100%;
    background-color: rgb(251,249,254)
  }
  body{
    height:100%;
    min-height:100%;
  }
  #app >>> .weui-toast{
    top:40%;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }
  .fade-enter-active,.fade-leave-active{
    transition: opacity 1s;
  }
</style>
