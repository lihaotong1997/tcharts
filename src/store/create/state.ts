import optionList from "./json/optionList.json";
const state = {
    myChart: null,//echarts实例
    option: {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ]
    },
    optionList:optionList,//可选参数
}
export default state;