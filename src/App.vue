<template>
  <div id="app">
   <Header></Header>
   <div class="main clearfix">
     <router-view name="main"></router-view>
     <router-view name="slidebar"></router-view>
   </div>
    
  </div>
</template>

<script>
import Header from './components/Header'
import Postlist from './components/Postlist'
export default {
  name: 'App',
  components:{
    Header,
    Postlist
  }
}
</script>

<style>
  *{
    padding: 0px;
    margin: 0px;
  }
 *{
    box-sizing: border-box;
  }
  .main{
    width: 74%;
    margin: 15px auto;
  }
  body{
    background: rgb(225,225,225);
  }
  
  .clearfix::after{
    content:'';
    display: block;
    clear: both;
  }
</style>
