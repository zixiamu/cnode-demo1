<template>
    <div class="header clearfix">
            <router-link :to="{name:'root'}">
                <img src="../assets/cnodejs_light.svg" alt="" title="返回首页">
            </router-link>
        <ul>
            <li><a href="#">首页</a></li>
            <li><a href="#">新手入门</a></li>
            <li><a href="#">API</a></li>
            <li><a href="#">关于</a></li>
            <li><a href="#">注册</a></li>
            <li><a href="#">登陆</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:'Header'
    }
</script>


<style scoped>
    .header{
        background: rgb(68,68,68);
        height: 50px;
    }
    img{
        max-width: 120px;
        height: 50px;
        margin-left: 250px;
    }
    img:hover{
        cursor: pointer;
    }
    ul{
        list-style: none;
        float: right;
        margin-top: 4px;
        margin-right: 240px;
    }
    li{
        display: inline-block;
        padding: 10px;
    }
    a{
        text-decoration: none;
        color:#ccc;
        font-size: 14px;
        text-shadow: none;
    }
    a:hover{
        color: #fff;
    }
    .clearfix::after{
        content: '';
        display: block;
        clear:both;
    }
</style>
