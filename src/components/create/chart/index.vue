<template>
    <div ref="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import * as echarts from 'echarts';
const chart = ref(null);
const store = useStore();
const state = reactive({
    myChart:computed({
        get:()=>store.state.create.myChart,
        set:(v)=>{
            store.state.create.myChart = v;
        }
    }),
})
onMounted(()=>{
    if(chart.value){
        state.myChart = echarts.init(chart.value,{
            notMerge: true, // 不合并之前的 option
            lazyUpdate: true // 手动调用 chart.setOption() 更新时才渲染
        });
        store.dispatch("create/setOption");
    }
})
</script>

<style scoped>

</style>