<template>
    <el-form class="form" :model="form">
        <template v-for="(item,index) in form" :key="index">
            <div class="form-box" v-if="item.show">
                <el-form-item class="form-item" :label="item.name">
                    <el-switch v-if="item.type === 0" v-model="item.value" @change="item.set"/>
                    <el-input-number v-if="item.type === 1" v-model="item.value" @change="item.set" :min="0" :step="1" step-strictly/>
                    <el-input v-if="item.type === 2" v-model="item.value" @input="item.set" placeholder="请输入" />
                    <el-select v-if="item.type === 3" v-model="item.value" @change="item.set">
                        <el-option v-for="(item1,index1) in item.option" :key="index1" :label="item1.label" :value="item1.value" />
                    </el-select>
                    <el-color-picker v-if="item.type === 4" v-model="item.value" @change="item.set"/>
                    <template v-for="(item1,index1) in item.option" :key="index1">
                        <span v-if="item.type === 5">&nbsp;{{ item1.name }}：</span>
                        <el-input-number v-if="item.type === 5" v-model="item.value[index1]" @change="item.set(item.value)" :min="0" :step="1" step-strictly/>
                    </template>
                </el-form-item>
                <div class="tips">{{ item.tips }}</div>
            </div>
        </template>
    </el-form>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useStore } from 'vuex';
const store = useStore();
const state = reactive({
    option:computed({
        get:()=>store.state.create.option,
        set:(v)=>{
            store.state.create.option = v;
        }
    }),
})
let form = reactive({
    show:computed(()=>{
        return {
            type:0,
            show:true,
            name:"显示",
            tips:"是否显示 x 轴。",
            value:state.option.xAxis.show !== undefined ?  state.option.xAxis.show : true,
            set:(v:any)=>set('show',v,undefined)
        }
    }),
    gridIndex:computed(()=>{
        return {
            type:1,
            show:true,
            name:"网格索引",
            tips:"x 轴所在的 网格 的索引，默认位于第一个 网格。",
            value:state.option.xAxis.gridIndex !== undefined ?  state.option.xAxis.gridIndex : 0,
            set:(v:any)=>set('gridIndex',v,undefined)
        }
    }),
    alignTicks:computed(()=>{
        return {
            type:0,
            show:true,
            name:"对齐刻度",
            tips:"在多个 x 轴为数值轴的时候，可以开启该配置项自动对齐刻度。只对'数值轴'和'对数轴'类型的轴有效。",
            value:state.option.xAxis.alignTicks !== undefined ?  state.option.xAxis.alignTicks : false,
            set:(v:any)=>set('alignTicks',v,undefined)
        }
    }),
    name:computed(()=>{
        return {
            type:2,
            show:true,
            name:"名称",
            tips:"坐标轴名称。",
            value:state.option.xAxis.name !== undefined ?  state.option.xAxis.name : "",
            set:(v:any)=>set('name',v,undefined)
        }
    }),
    nameLocation:computed(()=>{
        return {
            type:3,
            show:true,
            name:"名称位置",
            tips:"坐标轴名称显示位置。",
            value:state.option.xAxis.nameLocation !== undefined ?  state.option.xAxis.nameLocation : "end",
            option:[
                {label:"开始",value:"start"},
                {label:"中间",value:"middle"},
                {label:"居中",value:"center"},
                {label:"终止",value:"end"},
            ],
            set:(v:any)=>set('nameLocation',v,undefined)
        }
    }),
    nameTextStyle:computed(()=>{
        return {
            type:0,
            show:true,
            name:"名称文本样式",
            tips:"坐标轴名称的文字样式。",
            value :state.option.xAxis.nameTextStyle !== undefined ?  true : false,
            set:(v:any)=>setObeject('nameTextStyle',v)
        }
    }),
    nameTextStyleColor:computed(()=>{
        return { 
            type:4,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(字体颜色)",
            tips:"坐标轴名称的颜色，默认取轴线的线条样式中的颜色",
            value: getNameTextStyleColor() ? getNameTextStyleColor() : "",
            set:(v:any)=>set('nameTextStyle',v,'color')
        }
    }),
    nameTextStyleFontStyle:computed(()=>{
        return {
            type:3,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(字体风格)",
            tips:"坐标轴名称文字字体的风格。",
            value: state.option.xAxis?.nameTextStyle?.fontStyle !== undefined ?  state.option.xAxis.nameTextStyle.fontStyle : "normal",
            option:[
                {label:"典型",value:"normal"},
                {label:"斜体",value:"italic"},
                {label:"间接",value:"oblique"},
            ],
            set:(v:any)=>set('nameTextStyle',v,'fontStyle')
        }
    }),
    nameTextStyleFontWeight:computed(()=>{
        return {
            type:3,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(字体粗细)",
            tips:"坐标轴名称文字字体的粗细。",
            value: state.option.xAxis?.nameTextStyle?.fontWeight !== undefined ?  state.option.xAxis.nameTextStyle.fontWeight : "normal",
            option:[
                {label:"典型",value:"normal"},
                {label:"粗体1",value:"bold"},
                {label:"粗体2",value:"bolder"},
                {label:"细体",value:"lighter"},
            ],
            set:(v:any)=>set('nameTextStyle',v,'fontWeight')
        }
    }),
    nameTextStyleFontFamily:computed(()=>{
        return {
            type:3,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(字体系列)",
            tips:"坐标轴名称文字的字体系列。",
            value: state.option.xAxis?.nameTextStyle?.fontFamily !== undefined ?  state.option.xAxis.nameTextStyle.fontFamily : "sans-serif",
            option:[
                {label:"字体1",value:"sans-serif"},
                {label:"字体2",value:"monospace"},
                {label:"字体3",value:"Arial"},
                {label:"字体4",value:"Courier New"},
                {label:"字体5",value:"Microsoft YaHei"},
            ],
            set:(v:any)=>set('nameTextStyle',v,'fontFamily')
        }
    }),
    nameTextStyleFontSize :computed(()=>{
        return {
            type:1,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(字体大小)",
            tips:"坐标轴名称文字的字体大小。",
            value: state.option.xAxis?.nameTextStyle?.fontSize !== undefined ?  state.option.xAxis.nameTextStyle.fontSize : 12,
            set:(v:any)=>set('nameTextStyle',v,'fontSize')
        }
    }),
    nameTextStyleAlign:computed(()=>{
        return {
            type:3,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(水平对齐方式)",
            tips:"文字水平对齐方式，默认自动。",
            value: state.option.xAxis?.nameTextStyle?.align !== undefined ?  state.option.xAxis.nameTextStyle.align : "",
            option:[
                {label:"自动",value:""},
                {label:"左",value:"left"},
                {label:"居中",value:"center"},
                {label:"右",value:"right"},
            ],
            set:(v:any)=>set('nameTextStyle',v,'align')
        }
    }),
    nameTextStyleVerticalAlign:computed(()=>{
        return {
            type:3,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(垂直对齐方式)",
            tips:"文字垂直对齐方式，默认自动。",
            value: state.option.xAxis?.nameTextStyle?.verticalAlign !== undefined ?  state.option.xAxis.nameTextStyle.verticalAlign : "",
            option:[
                {label:"自动",value:""},
                {label:"上",value:"top"},
                {label:"居中",value:"middle"},
                {label:"下",value:"bottom"},
            ],
            set:(v:any)=>set('nameTextStyle',v,'verticalAlign')
        }
    }),
    nameTextStyleLineHeight :computed(()=>{
        return {
            type:1,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(行高)",
            tips:"行高。",
            value: state.option.xAxis?.nameTextStyle?.lineHeight !== undefined ?  state.option.xAxis.nameTextStyle.lineHeight : 1,
            set:(v:any)=>set('nameTextStyle',v,'lineHeight')
        }
    }),
    nameTextStyleBackgroundColor :computed(()=>{
        return {
            type:4,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(背景颜色)",
            tips:"文字块背景色。",
            value: state.option.xAxis?.nameTextStyle?.backgroundColor !== undefined ?  state.option.xAxis.nameTextStyle.backgroundColor : '',
            set:(v:any)=>set('nameTextStyle',v,'backgroundColor')
        }
    }),
    nameTextStyleBorderColor:computed(()=>{
        return {
            type:4,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(边框颜色)",
            tips:"文字块边框颜色。",
            value: state.option.xAxis?.nameTextStyle?.borderColor !== undefined ?  state.option.xAxis.nameTextStyle.borderColor : '',
            set:(v:any)=>set('nameTextStyle',v,'borderColor')
        }
    }),
    nameTextStyleBorderWidth:computed(()=>{
        return {
            type:1,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(边框宽度)",
            tips:"文字块边框宽度。",
            value: state.option.xAxis?.nameTextStyle?.borderWidth !== undefined ?  state.option.xAxis.nameTextStyle.borderWidth : 0,
            set:(v:any)=>set('nameTextStyle',v,'borderWidth')
        }
    }),
    nameTextStyleBrderType:computed(()=>{
        return {
            type:3,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(边框类型)",
            tips:"文字块边框描边类型。",
            value: state.option.xAxis?.nameTextStyle?.borderType !== undefined ?  state.option.xAxis.nameTextStyle.borderType : "solid",
            option:[
                {label:"实线",value:"solid"},
                {label:"虚线",value:"dashed"},
                {label:"点线",value:"dotted"},
            ],
            set:(v:any)=>set('nameTextStyle',v,'borderType')
        }
    }),
    nameTextStyleBorderDashOffset:computed(()=>{
        return {
            type:1,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(边框虚线偏移量)",
            tips:"用于设置虚线的偏移量，可搭配边框类型虚线，实现灵活的虚线效果。",
            value: state.option.xAxis?.nameTextStyle?.borderDashOffset !== undefined ?  state.option.xAxis.nameTextStyle.borderDashOffset : 0,
            set:(v:any)=>set('nameTextStyle',v,'borderDashOffset')
        }
    }),
    nameTextStyleBorderRadius :computed(():any=>{
        return {
            type:5,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(圆角)",
            tips:"文字块的圆角。",
            value: state.option.xAxis?.nameTextStyle?.borderRadius  !== undefined ?  state.option.xAxis.nameTextStyle.borderRadius  : [0, 0, 0, 0],
            option:[
                {name:"左上"},
                {name:"右上"},
                {name:"右下"},
                {name:"左下"},
            ],
            set:(v:any)=>set('nameTextStyle',v,'borderRadius')
        }
    }),
    nameTextStylePadding :computed(():any=>{
        return {
            type:5,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(内边距)",
            tips:"文字块的内边距。",
            value: state.option.xAxis?.nameTextStyle?.padding  !== undefined ?  state.option.xAxis.nameTextStyle.padding  : [0, 0, 0, 0],
            option:[
                {name:"上"},
                {name:"右"},
                {name:"下"},
                {name:"左"},
            ],
            set:(v:any)=>set('nameTextStyle',v,'padding')
        }
    }),
    nameTextStyleShadowColor:computed(():any=>{
        return {
            type:4,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(背景阴影颜色)",
            tips:"文字块的背景阴影颜色。",
            value: state.option.xAxis?.nameTextStyle?.shadowColor  !== undefined ?  state.option.xAxis.nameTextStyle.shadowColor  : "",
            set:(v:any)=>set('nameTextStyle',v,'shadowColor')
        }
    }),
    nameTextStyleShadowBlur:computed(():any=>{
        return {
            type:1,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(背景阴影长度)",
            tips:"文字块的背景阴影长度。",
            value: state.option.xAxis?.nameTextStyle?.shadowBlur  !== undefined ?  state.option.xAxis.nameTextStyle.shadowBlur  : 0,
            set:(v:any)=>set('nameTextStyle',v,'shadowBlur')
        }
    }),
    nameTextStyleShadowOffsetX:computed(():any=>{
        return {
            type:1,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(背景阴影 X 偏移)",
            tips:"文字块的背景阴影 X 偏移。",
            value: state.option.xAxis?.nameTextStyle?.shadowOffsetX  !== undefined ?  state.option.xAxis.nameTextStyle.shadowOffsetX  : 0,
            set:(v:any)=>set('nameTextStyle',v,'shadowOffsetX')
        }
    }),
    nameTextStyleShadowOffsetY:computed(():any=>{
        return {
            type:1,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(背景阴影 Y 偏移)",
            tips:"文字块的背景阴影 Y 偏移。",
            value: state.option.xAxis?.nameTextStyle?.shadowOffsetY  !== undefined ?  state.option.xAxis.nameTextStyle.shadowOffsetY  : 0,
            set:(v:any)=>set('nameTextStyle',v,'shadowOffsetY')
        }
    }),
    nameTextStyleWidth:computed(():any=>{
        return {
            type:1,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(宽度)",
            tips:"文本显示宽度。",
            value: state.option.xAxis?.nameTextStyle?.width  !== undefined ?  state.option.xAxis.nameTextStyle.width  : 0,
            set:(v:any)=>set('nameTextStyle',v,'width')
        }
    }),
    nameTextStyleHeight:computed(():any=>{
        return {
            type:1,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(高度)",
            tips:"文本显示高度。",
            value: state.option.xAxis?.nameTextStyle?.height  !== undefined ?  state.option.xAxis.nameTextStyle.height  : 0,
            set:(v:any)=>set('nameTextStyle',v,'height')
        }
    }),
    nameTextStyleTextBorderColor:computed(():any=>{
        return {
            type:4,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(描边颜色)",
            tips:"文字本身的描边颜色。",
            value: state.option.xAxis?.nameTextStyle?.textBorderColor  !== undefined ?  state.option.xAxis.nameTextStyle.textBorderColor  : "",
            set:(v:any)=>set('nameTextStyle',v,'textBorderColor')
        }
    }),
    nameTextStyleTextBorderWidth:computed(():any=>{
        return {
            type:1,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(描边宽度)",
            tips:"文字本身的描边宽度。",
            value: state.option.xAxis?.nameTextStyle?.textBorderWidth  !== undefined ?  state.option.xAxis.nameTextStyle.textBorderWidth  : 0,
            set:(v:any)=>set('nameTextStyle',v,'textBorderWidth')
        }
    }),
    nameTextStyleTextBorderType:computed(():any=>{
        return {
            type:3,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(描边类型)",
            tips:"文字本身的描边类型",
            value: state.option.xAxis?.nameTextStyle?.textBorderType  !== undefined ?  state.option.xAxis.nameTextStyle.textBorderType  : "solid",
            option:[
                {label:"实线",value:"solid"},
                {label:"虚线",value:"dashed"},
                {label:"点线",value:"dotted"},
            ],
            set:(v:any)=>set('nameTextStyle',v,'textBorderType')
        }
    }),
    nameTextStyleTextBorderDashOffset:computed(():any=>{
        return {
            type:1,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(描边虚线偏移量)",
            tips:"用于设置虚线的偏移量，可搭配边框类型虚线，实现灵活的虚线效果。",
            value: state.option.xAxis?.nameTextStyle?.textBorderDashOffset  !== undefined ?  state.option.xAxis.nameTextStyle.textBorderDashOffset  : 0,
            set:(v:any)=>set('nameTextStyle',v,'textBorderDashOffset')
        }
    }),
    nameTextStyleTextShadowColor:computed(():any=>{
        return {
            type:4,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(阴影颜色)",
            tips:"文字本身的阴影颜色。",
            value: state.option.xAxis?.nameTextStyle?.textShadowColor  !== undefined ?  state.option.xAxis.nameTextStyle.textShadowColor  : "",
            set:(v:any)=>set('nameTextStyle',v,'textShadowColor')
        }
    }),
    nameTextStyleTextShadowBlur:computed(():any=>{
        return {
            type:1,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(阴影长度)",
            tips:"文字本身的阴影长度。",
            value: state.option.xAxis?.nameTextStyle?.textShadowBlur  !== undefined ?  state.option.xAxis.nameTextStyle.textShadowBlur  : 0,
            set:(v:any)=>set('nameTextStyle',v,'textShadowBlur')
        }
    }),
    nameTextStyleTextShadowOffsetX:computed(():any=>{
        return {
            type:1,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(阴影 X 偏移)",
            tips:"文字本身的阴影 X 偏移。",
            value: state.option.xAxis?.nameTextStyle?.textShadowOffsetX  !== undefined ?  state.option.xAxis.nameTextStyle.textShadowOffsetX  : 0,
            set:(v:any)=>set('nameTextStyle',v,'textShadowOffsetX')
        }
    }),
    nameTextStyleTextShadowOffsetY:computed(():any=>{
        return {
            type:1,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(阴影 Y 偏移)",
            tips:"文字本身的阴影 Y 偏移。",
            value: state.option.xAxis?.nameTextStyle?.textShadowOffsetY  !== undefined ?  state.option.xAxis.nameTextStyle.textShadowOffsetY  : 0,
            set:(v:any)=>set('nameTextStyle',v,'textShadowOffsetY')
        }
    }),
    nameTextStyleOverflow:computed(():any=>{
        return {
            type:3,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(文本超出)",
            tips:"文字超出宽度是否截断或者换行。配置宽度时有效",
            value: state.option.xAxis?.nameTextStyle?.overflow  !== undefined ?  state.option.xAxis.nameTextStyle.overflow  : "none",
            option:[
                {label:"默认",value:"none"},
                {label:"截断",value:"truncate"},
                {label:"换行",value:"break"},
                {label:"换行（强制单词内换行）",value:"breakAll"},
            ],
            set:(v:any)=>set('nameTextStyle',v,'overflow')
        }
    }),
    nameTextStyleEllipsis:computed(():any=>{
        return {
            type:2,
            show:!!state.option.xAxis.nameTextStyle,
            name:"名称文本样式(截断)",
            tips:"在文本超出配置为截断的时候，可以通过该属性配置末尾显示的文本。",
            value: state.option.xAxis?.nameTextStyle?.ellipsis  !== undefined ?  state.option.xAxis.nameTextStyle.ellipsis  : "...",
            set:(v:any)=>set('nameTextStyle',v,'ellipsis')
        }
    }),
})
const set = (code:string,value:any,childCode:any)=>{
    if(childCode){
        state.option.xAxis[code][childCode] = value;
    }else{
        state.option.xAxis[code] = value;
    }
}
const setObeject = (code:string,value:any)=>{
    if(value){
        state.option.xAxis[code] = {};
    }else{
        state.option.xAxis[code] = undefined;
    }
}
const getNameTextStyleColor = ()=>{
    if(state.option.xAxis?.nameTextStyle?.color !== undefined){
        return state.option.xAxis.nameTextStyle.color;
    }else if(state.option.xAxis?.axisLine?.lineStyle?.color !== undefined){
        return state.option.xAxis.axisLine.lineStyle.color;
    }else{
        return false;
    }
}
</script>

<style scoped lang="scss">
.form{
    padding: 18px 18px 0 18px;
    .form-box{
        margin-bottom: 18px;
        padding-bottom: 18px;
        border-bottom: 1px solid var(--el-border-color);
        .form-item{
            margin-bottom: 0;
        }
        .tips{
            margin-top: 10px;
            font-size: 12px;
            line-height: 20px;
            color: #999999;
        }
    }
}
</style>