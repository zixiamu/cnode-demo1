<template>
    <div>
        <!--数据未返回的时候，显示这个正在加载的gif-->
        <div class="loading">
            <img src="../assets/loading.gif" v-if="isLoading">
        </div>
        <!--我们的主题帖子列表-->
        <div class="posts">
            <ul>
                <li>
                    <div class="topBar">
                        <span class="all" @click="changespan">全部</span>
                        <span @click="changespan">精华</span>
                        <span @click="changespan">分享</span>
                        <span @click="changespan">问答</span>
                        <span @click="changespan">招聘</span>
                    </div>
                </li>
                <li v-for="post in posts">
                    <!--头像-->
                    <router-link :to="{
                        name:'user_info',
                        params:{
                            name:post.author.loginname
                        }
                    }">
                    <img :src="post.author.avatar_url" alt="">
                    </router-link>
                    <!--回复/浏览-->
                    <span class="reply_visit">
                        <span class="reply_count" title="回复数">{{post.reply_count}}</span>
                        <span class="visit_count" title="点击数">/{{post.visit_count}}</span>
                    </span>
                    <!--帖子的分类-->
                    <span :class="[{post_good:(post.good ===true),post_top:(post.top === true),topiclist_tab:(post.good !==true && post.top !== true)}]">{{post | tabFormtter}}</span>
                    <!--标题-->
                    <router-link :to="{name:'post_content',
                    params:{
                        id:post.id,
                        name:post.author.loginname
                    }}">
                    <span v-bind:title="post.title" class="title"  :title="post.title">
                        {{post.title}}
                    </span>
                    </router-link>
                    <!--最终回复时间-->
                    <span class="last_reply">
                        {{post.last_reply_at| formatDate}}
                    </span>
                </li>
                <li>
                    <pagenation @handleList="renderList"></pagenation>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import pagenation from './Pagenation'
export default {
    name:'Postlist',
    data(){
        return{
            isLoading:false,
            posts:[],//代表页面的列表数组
            postpage:1
        }
    },
    components:{
        pagenation
    },
    methods:{
        getData(){
            this.$http.get('https://cnodejs.org/api/v1/topics',{
                params:{
                    page:this.postpage,
                    limit:20
                }
            }).then(res=>{
                this.isLoading=false//加载成功去除动画
                this.posts= res.data.data
            }).catch(err=>{
                console.log(err)
            })
        },
        renderList(value){
            this.postpage=value
            this.getData()
        },
        changespan(){
            alert('还未开发')
        }
    },
    beforeMount(){
        this.isLoading=true//加载成功之前显示加载动画
        this.getData()//在页面加载之前获取数据
    }
}
</script>

<style scoped>
ul{
    list-style: none;
}
img{
    width: 30px;
    height: 30px;
}
img:hover{
    cursor: pointer;
}
a{
    text-decoration:none;
    color: #333;
}
a:visited{
    color:#778087;
}
.posts>ul>li:first-child{
    line-height: 20px;
    padding:10px;
    background: rgb(245,245,245);
    border-radius: 5px;
    border-bottom: 1px solid rgb(225,225,225);
}
.posts>ul>li:first-child>.topBar>span.all{
    color: rgb(255,255,255);
    background: rgb(128,189,1);
}
.posts>ul>li:first-child>.topBar>span{
    padding: 3px 4px;
    margin: 0px 10px;
    color: rgb(126,188,20)
}
.posts>ul>li:first-child>.topBar>span:hover{ 
    color: #005580;
    cursor: pointer;
}
.posts>ul>li:not(:first-child){
    background: rgb(245,245,245);
    border: 1px solid rgb(225,225,225);
    border-radius: 5px;
    padding: 10px;
    position: relative;
}
.posts>ul>li:not(:first-child):hover{
    background: #f0f0f0;
}
.posts>ul>li:not(:first-child)>.reply_visit{
    width:70px;
    text-align: center;
    display: inline-block;
    vertical-align: super;
}
.posts>ul>li:not(:first-child)>.reply_visit>.reply_count{
    color:rgb(158, 120, 192);
    font-size:10px;
}
.posts>ul>li:not(:first-child)>.reply_visit>.visit_count{
    color:rgb(180,180,180);
    font-size: 10px;
}
.posts>ul>li:not(:first-child)>.post_top,
.posts>ul>li:not(:first-child)>.post_good{
    color: rgb(255,255,255);
    background: rgb(128,189,1);
    border-radius: 3px;
    padding: 0px 3px;
    margin-top:5px;
    vertical-align: super;
    font-size: 10px;
}
.posts>ul>li:not(:first-child)>.topiclist_tab{
    background: rgb(229, 229, 229);
    color: rgb(153, 153, 153);
    border-radius: 3px;
    padding: 0px 3px;
    vertical-align: super;
    font-size: 10px;
}
.posts>ul>li:not(:first-child)>a>.title{
    display: inline-block;
    margin: 0px 5px;
    vertical-align: super;
    font-size: 15px;
}
.posts>ul>li:not(:first-child)>a>.title:hover{
    cursor: pointer;
    text-decoration: underline;
}
.posts>ul>li:not(:first-child)>.last_reply{
    display: inline-block;
    position: absolute;
    left: 95%;
    vertical-align: super;
    font-size: 14px;
    color:rgb(119, 128, 135)
}
.posts>ul>li:not(:first-child)>.last_reply:hover{
    cursor: pointer;
}
</style>
