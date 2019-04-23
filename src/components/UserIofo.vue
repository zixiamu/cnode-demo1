<template>
    <div class="UserInfo">
         <div class="loading" v-if="isLoading">
            <img src="../assets/loading.gif" v-if="isLoading">
        </div>
        <div class="userInformation clearfix" v-else>
            <section>
                <img :src="userinfo.avatar_url" alt="">
                <span>{{userinfo.loginname}}</span>
                <p class="score">{{userinfo.score}}积分</p>
                <p class="create_at">注册时间：{{userinfo.create_at | formatDate}}</p>
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
a{
    text-decoration: none;
}
ul{
    list-style: none;
}
.clearfix::after{
    content:'';
    display: block;
    clear: both;
}
.loading>img{
    position:absolute;
    top:50%;
    left: 50%;
}
.userInformation>section{
    float: left;
    padding: 40px;
    background: rgb(246,246,246);
    margin-top: 100px;
    margin-left: 260px;
    border-radius: 5px;
    width: 215px;
}
.userInformation>section>img{
    display: inline-block;
    border: 1px solid rgba(119,128,135,0.5);
    border-radius: 5px;
    margin-left:7
    px;
}
.userInformation>section>span{
    display:block;
    color: rgb(119,128,135);
    padding-top:10px;
    padding-bottom: 5px;
    text-align: center;
}
.userInformation>section>.score{
    text-align: center;
    padding-top:5px;
    padding-bottom: 5px;
}
.userInformation>section>.create_at{
    padding-top:5px;
    text-align: center;
    color: rgb(119,128,135);
}
.userInformation>.replies_topics{
    float: right;
    margin-top:100px;
    margin-right: 370px;
    width: 540px;
}
.userInformation>.replies_topics>.replies{
    background: rgb(255,255,255);
    border-radius: 5px;
    padding-bottom: 10px;
}
.userInformation>.replies_topics>.replies>p{
    border-radius: 5px;
    padding-top:10px;
    padding-bottom: 10px;
    background: rgb(247,247,247);
    padding-left: 40px;
    padding-right: 40px;
}
.userInformation>.replies_topics>.replies>ul>li>a{
    display: inline-block;
    padding-top:10px;
    padding-right: 40px;
    padding-left: 40px;
    color: rgb(0,136,204);
    padding-bottom:10px;
}
.userInformation>.replies_topics>.replies>ul>li>a:hover{
    text-decoration: underline;
    color: rgb(0,85,128);
}
.userInformation>.replies_topics>.topics{
    background: rgb(255,255,255);
    border-radius: 5px;
    padding-bottom: 10px;
}
.userInformation>.replies_topics>.topics>p{
    border-radius: 5px;
    margin-top: 40px;
    padding-top:10px;
    padding-bottom: 10px;
    background: rgb(247,247,247);
    padding-left: 40px;
    padding-right: 40px;
}
.userInformation>.replies_topics>.topics>ul>li>a{
    display: inline-block;
    padding-top:10px;
    padding-right: 40px;
    padding-left: 40px;
    color: rgb(0,136,204);
    padding-bottom:10px;
}
.userInformation>.replies_topics>.topics>ul>li>a:hover{
    text-decoration: underline;
    color: rgb(0,85,128);
}
</style>
