<template>
    <div class="container">
        <tool id="tool"></tool>
        <chart id="chart"></chart>
    </div>
</template>

<script setup lang="ts">
import chart from "../chart/index.vue";
import tool from "../tool/index.vue";
</script>

<style scoped lang="scss">
.container{
    display: flex;
    height: 100%;
}
#tool,#chart{
    min-width: 0;
    flex: 1%;
}
</style>