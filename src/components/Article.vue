<template>
    <div class="article">
        <!--如果正则加载显示此div-->
        <div class="loading" v-if="isLoading">
            <img src="../assets/loading.gif" v-if="isLoading">
        </div>
        <div v-else>
            <div class="topic_header">
                <div class="topic_header_title">
                <div class="topic_title">{{post.title}}</div>
                    <ul class="clearfix">
                        <li>·发布于{{post.create_at | formatDate}}</li>
                        <li>·作者:
                            <router-link :to="{
                                name:'user_info',
                                pamars:{
                                    name:post.author.loginname
                                }
                            }">
                            {{post.author.loginname}}
                            </router-link>
                        </li>
                        <li>·{{post.visit_count}}次浏览</li>
                        <li>·来自{{post | tabFormtter}}</li>
                    </ul>
                </div>
                <div v-html="post.content" id="content" class="topic_content" ></div>
            </div>
            <div class="topbar_reply">
                <div class="topbar">回复</div>
                <div v-for="(reply,index) in post.replies" class="replySec">
                    <div class="replyup">
                        <router-link :to='{name:"user_info",
                        params:{
                            name:reply.author.loginname
                        }
                        }'>
                        <img :src="reply.author.avatar_url" alt="">
                        </router-link>
                        <router-link :to='{name:"user_info",
                        params:{
                            name:reply.author.loginname
                        }
                        }'>
                        <span>{{reply.author.loginname}}</span>
                        </router-link>
                        <span>{{index+1}}楼</span>
                        <span v-if="reply.ups.length>0">
                            good:{{reply.ups.length}}
                        </span>
                        <span v-else>
                        </span>
                    </div>
                <p v-html="reply.content"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name:'Article',
    data(){
        return{
            isLoading:false,//是否正在加载
            post:{}//代表当前文章页的所有内容，所有属性
        }
    },
    methods:{
        getArticleDate(){
            this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
            .then((res)=>{
                if(res.data.success === true){
                    this.isLoading=false
                    this.post = res.data.data
                }
            })
            .catch(function(err){
                console.log(err)
            })
        }
    },
    beforeMount(){
        this.isLoading=true
        this.getArticleDate()
    },
    watch:{
        '$route'(to,from){
            this.getArticleDate()
        }
    }

}

</script>


<style>
@import url('../assets/markdown-github.css');
ul{
    list-style: none;
}
.loading>img{
    position:absolute;
    top:50%;
    left: 35%;
}
.article{
    float: left;
    max-width:1025px;
}
.article>div>.topic_header{
    background: rgb(255,255,255);
    padding:10px;
    border-radius: 5px;
}
.article>div>.topic_header>.topic_header_title{
    padding: 10px;
    border-bottom: 1px solid rgb(225,225,225);
}
.article>div>.topic_header>.topic_header_title>.topic_title{
    font-size: 22px;
    color: rgb(51,51,51);
    width:806px;
    margin: 8px 0px;
    font-weight: 700;
}
.article>div>.topic_header>.topic_header_title>ul>li{
    font-size: 12px;
    float: left;
    color: rgb(131, 131, 131);
    padding: 0px 5px;
}
.article>div>.topic_header>.topic_header_title>ul>li>a{
    color: rgb(131, 131, 131);
    text-decoration:none;
}
.article>div>.topic_header>.topic_header_title>ul>li>a:hover{
    text-decoration: underline;
}
.article>div>.topbar_reply{
    margin-top: 15px;
}
.article>div>.topbar_reply>.topbar{
    padding: 10px;
    background: rgb(246,246,246);
    border-radius: 5px 5px 0 0;
}
.article>div>.topbar_reply>.replySec{
    margin-bottom: 2px;
    background: #fff;
    padding: 10px;
}
.article>div>.topbar_reply>.replySec>.replyup>a>img{
    width: 30px;
    height: 30px;
}
.article>div>.topbar_reply>.replySec>.replyup>a:hover{
    color: rgb(56,95,138);
    text-decoration: underline;
}
.article>div>.topbar_reply>.replySec>.replyup>a{
    color: rgb(102,102,102);
    text-decoration: none;
}
.article>div>.topbar_reply>.replySec>.replyup>a>span{
    font-size: 12px;
    vertical-align: super;
}
.article>div>.topbar_reply>.replySec>.replyup>span{
    font-size: 12px;
    vertical-align: super;
}
</style>
