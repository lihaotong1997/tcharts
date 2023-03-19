const actions = {
    setOption({ state }:any){
        console.log(state.option)
        state.myChart.setOption(state.option);
    }
}
export default actions;