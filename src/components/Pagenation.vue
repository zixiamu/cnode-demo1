<template>
    <div class="pagination">
        <button @click="changeBtn" class="home_page">首页</button>
        <button @click="changeBtn" class="prev">上一页</button>
        <button v-if="jduge" class="judge">......</button>
        <button v-for="btn in pagebtns" @click='changeBtn(btn)' :class="[{currentPage:btn===currentPage},'pagebtn']">
            {{btn}}
        </button>
        <button @click="changeBtn" class="next">下一页</button>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    name:'Pagenation',
    data(){
        return{
            pagebtns:[1,2,3,4,5,'......'],
            currentPage:1,
            jduge:false
        }
    },
    methods:{
        changeBtn(page){
            //点击上一页，下一页
            if(typeof page !== 'number'){
                switch(page.target.innerText){
                    case'上一页':{
                        $('button.currentPage').prev().click()
                        break
                    }
                    case'下一页':{
                        $('button.currentPage').next().click()
                        break
                    }
                    case'首页':{
                        this.pagebtns=[1,2,3,4,5,'......']
                        this.changeBtn(1)
                        break
                    }
                    default:break
                }
                return   
            }
            this.currentPage = page
            if(page>4){
                this.jduge = true
            }else{
                this.jduge = false
            }
            if(page === this.pagebtns[4]){
                this.pagebtns.shift();//移除第一个元素
                this.pagebtns.splice(4,0,this.pagebtns[3]+1)//添加最后一个
            }else if(page === this.pagebtns[0]&& page !== 1 ){
                this.pagebtns.unshift(this.pagebtns[0]-1)//先在第一个位置加一个
                this.pagebtns.splice(5,1)//移除最后一个数字

            }
            this.$emit('handleList',this.currentPage)
        }
    }
}
</script>

<style scoped>
.pagination>button{
    width: 130px;
    height: 40px;
    background: linear-gradient(to bottom, #4eb5e5 0%,#389ed5 100%); /* W3C */
    border: none;
    border-radius: 5px;
    position: relative;
    border-bottom: 4px solid #2b8bc6;
    color: #fbfbfb;
    font-weight: 600;
    font-family: 'Open Sans', sans-serif;
    text-shadow: 1px 1px 1px rgba(0,0,0,.4);
    font-size: 15px;
    text-align: center;
    text-indent: 5px;
    box-shadow: 0px 3px 0px 0px rgba(0,0,0,.2);
    cursor: pointer;
}
.pagination>button.currentPage{
    box-shadow: 0px 2px 0px 0px rgba(0,0,0,.5);
    top: 2px;
}
.pagination>button:active{
    box-shadow: 0px 2px 0px 0px rgba(0,0,0,.5);
    top: 1px;
}

.pagination>button.judge{
    width: 40px;
    text-align: center;
    text-indent:0;
}
.pagination>button.pagebtn{
    width: 40px;
    text-align: center;
    text-indent:0;
    margin: 3px;
}

</style>
