<template>
 <div class="autherinfo">
     <div class="authersummay">
         <div class="topbar">作者</div>
         <div class="topbar_author">
            <router-link :to='{name:"user_info",
                        params:{
                            name:user_info.loginname
                        }
                        }'>
                <img :src="user_info.avatar_url" alt="">
            </router-link>
            <router-link :to='{name:"user_info",
                        params:{
                            name:user_info.loginname
                        }
                        }'>
                <span>{{user_info.loginname}}</span>
            </router-link>
        </div>
     </div>
     <div class="recent_topics">
         <div class="topics">作者最近主题</div>
         <ul>
             <li v-for="list in topcilimitby5" :title="list.title">
                 <router-link :to="{
                     name:'post_content',
                     params:{
                          id:list.id,
                          name:list.author.loginname
                     }
                 }">
                <span>{{list.title}}</span>
                 </router-link>
             </li>
         </ul>
     </div>
     <div class="recent_replies">
         <div class="replies">作者最近回复</div>
         <ul>
             <li v-for="list in replylimitby5" :title="list.title">
                <router-link :to="{
                    name:'post_content',
                    params:{
                        id:list.id,
                        name:list.author.loginname
                    }
                }">
                <span>{{list.title}}</span>
                </router-link>
             </li>
         </ul>
     </div>
 </div>
</template>

<script>
export default {
    name:'SlideBar',
    data(){
        return{
            user_info:{}
        }
    },
     methods:{
        getDate(){
            this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
            .then((res)=>{
                if(res.data.success === true){
                    this.isLoading=false
                    this.user_info = res.data.data
                }
            })
            .catch(function(err){
                console.log(err)
            })
        }
    },
    computed:{
        topcilimitby5(){
            if(this.user_info.recent_topics){
                return this.user_info.recent_topics.slice(0,5)
            }
        },
        replylimitby5(){
            if(this.user_info.recent_replies){
                return this.user_info.recent_replies.slice(0,5)
            }
        }
    },
    beforeMount(){
        this.isLoading=true//加载成功之前显示加载动画
        this.getDate()//在页面加载之前获取数据
    }
}
</script>

<style scoped>
a{
    text-decoration: none;
}

.autherinfo{
    float: right;
    width:290px;
    position: relative;
    left: -50px;
    background: rgb(255,255,255);
    border-radius: 5px;
}
.autherinfo>.authersummay>.topbar{
    padding: 10px;
    font-size: 13px;
    background: rgb(246,246,246);
    border-radius: 5px 5px 0  0;
}
    .autherinfo>.authersummay>.topbar_author{
        padding: 10px;
    }
.autherinfo>.authersummay>.topbar_author>a>img{
    height: 48px;
    width: 48px;
}
.autherinfo>.authersummay>.topbar_author>a>span{
    position: relative;
    top:-20px;
    color: rgb(51,51,51)
}
.autherinfo>.recent_topics>.topics{
    padding: 10px;
    font-size: 13px;
    background: rgb(246,246,246);
}
.autherinfo>.recent_topics>ul>li{
    padding: 10px;
}
.autherinfo>.recent_topics>ul>li>a>span{
    color: rgb(119,128,135);
    font-size: 14px;
}
.autherinfo>.recent_replies>.replies{
    padding: 10px;
    font-size: 13px;
    background: rgb(246,246,246);
}
.autherinfo>.recent_replies>ul>li{
    padding: 10px;
}
.autherinfo>.recent_replies>ul>li>a>span{
    color: rgb(119,128,135);
    font-size: 14px;
}
</style>

