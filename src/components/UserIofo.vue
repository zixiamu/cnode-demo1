<template>
    <div class="UserInfo">
         <div class="loading" v-if="isLoading">
            <img src="../assets/loading.gif" v-if="isLoading">
        </div>
        <div class="userInformation clearfix" v-else>
            <section>
                <img :src="userinfo.avatar_url" alt="">
                <span>{{userinfo.loginname}}</span>
                <p>{{userinfo.score}}积分</p>
                <p>注册时间：{{userinfo.create_at | formatDate}}</p>
            </section>
            <div class="replies_topics">
                <div class="replies">
                <p>回复主题</p>
                <ul>
                    <li v-for="item in userinfo.recent_replies">
                        <router-link :to="{
                            name:'post_content',
                            params:{
                                id:item.id
                            }
                        }">
                            {{item.title}}
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="topics">
                <p>创建的主题</p>
                <ul>
                    <li v-for="item in userinfo.recent_topics">
                        <router-link :to="{
                            name:'post_content',
                            params:{
                                id:item.id
                            }
                        }">
                            {{item.title}}
                        </router-link>
                    </li>
                </ul>
            </div>
            </div>  
        </div>
    </div>
</template>

<script>
export default {
    name:'UserIofo',
    data(){
        return{
            isLoading:false,
            userinfo:{}
        }
    },
    methods:{
        getDate(){
            this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
            .then((res)=>{
                if(res.data.success === true){
                    this.isLoading=false
                    this.userinfo = res.data.data
                }
            })
            .catch(function(err){
                console.log(err)
            })
        }
    },
    beforeMount(){
        this.isLoading=true//加载成功之前显示加载动画
        this.getDate()//在页面加载之前获取数据
    }
}
</script>

<style scoped>
ul{
    list-style: none;
}
.clearfix::after{
    content:'';
    display: block;
    clear: both;
  }
  .userInformation>section{
      float: left;
  }
  .userInformation>.replies_topics{
      float: right;
  }

</style>
