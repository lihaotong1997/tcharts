<template>
    <div class="tool">
        <div class="head">
            <el-select v-model="select" @change="setOption" placeholder="请选择想要添加的参数">
                <el-option
                    v-for="item in state.optionList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                    :disabled="hasCode(item.code)"
                />
            </el-select>
        </div>
        <div class="container">
            <template v-for="item in state.optionList" :key="item.code">
                <div class="item" v-if="state.option[item.code]">
                    <div class="title" :class="{active:item.show}">
                        <div class="title-head">
                            <div class="title-head-name">{{ item.name }}</div>
                            <el-button size="small" text type="primary" @click="deleteItem(item)">删除</el-button>
                            <el-button size="small" text v-if="item.show" @click="item.show = false" type="primary">收起</el-button>
                            <el-button size="small" text v-else @click="item.show = true" type="primary">展开</el-button>
                        </div>
                        <div class="title-tips">
                            {{ item.tips }}
                        </div>
                    </div>
                    <div v-if="item.show">
                        <xAxis v-if="item.code == 'xAxis'"></xAxis>
                        <yAxis v-if="item.code == 'yAxis'"></yAxis>
                        <series v-if="item.code == 'series'"></series>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { ElMessage, ElMessageBox } from 'element-plus';
import _ from 'lodash';
import xAxis from "./xAxis/index.vue";
import yAxis from "./yAxis/index.vue";
import series from "./series/index.vue";
const store = useStore();
const select = ref("");
const state = reactive({
    option:computed({
        get:()=>store.state.create.option,
        set:(v)=>{
            store.state.create.option = v;
        }
    }),
    optionList:computed(()=>store.state.create.optionList),
    myChart:computed(()=>store.state.create.myChart),
})
watch(state.option,(n,o)=>{
    try {
        store.dispatch("create/setOption");
    } catch (error) {
        ElMessage({
            type: 'error',
            message: '参数错误',
        })
    }
})
const hasCode = (code:string)=>{
    return !!state.option[code];
}
const deleteItem = (target:any)=>{
    ElMessageBox.confirm("确定要删除吗？","提示",{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(()=>{
        const old = state.option[target.code];
        delete state.option[target.code];
        try {
            store.dispatch("create/setOption");
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
        } catch (error) {
            ElMessage({
                type: 'error',
                message: '删除此属性图标将出现问题！',
            })
            state.option[target.code] = old;
        }
    }).catch(()=>{})
    
}
const setOption = (code:any)=>{
    state.option[code] = {};
}
</script>

<style scoped lang="scss">
.tool{
    display: flex;
    flex-direction: column;
    border-right: 1px var(--el-border-color) var(--el-border-style);
    .head{
        display: flex;
        height: 40px;
        align-items: center;
        padding: 0 20px;
        border-bottom: 1px var(--el-border-color) var(--el-border-style);
    }
    .container{
        padding:20px;
        min-height: 0;
        flex: 1;
        overflow: auto;
        .item{
            border: 1px var(--el-border-color) var(--el-border-style);
            margin-bottom: 10px;
            .title{
                &.active{
                    border-bottom: 1px var(--el-border-color) var(--el-border-style);
                }
                .title-head{
                    height: 40px;
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                    .title-head-name{
                        min-width: 0;
                        flex: 1;
                    }
                }
                .title-tips{
                    font-size: 12px;
                    padding: 0 20px;
                    line-height: 20px;
                    color: #999999;
                }
            }
        }
    }
}
</style>