import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article'
import PostList from '../components/Postlist'
import UserIofo from '../components/UserIofo'
import SlideBar from '../components/SlideBar'

Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '/',
      name: 'root',
      components:{
        main:PostList
      }
    },
    {
      path: '/topic/:id&author=:name',
      name: 'post_content',
      components:{
        main:Article,
        slidebar:SlideBar
      }
    },
    {
      path: '/userinfo/:name',
      name: 'user_info',
      components:{
        main:UserIofo
      }
    }
  ]
})
