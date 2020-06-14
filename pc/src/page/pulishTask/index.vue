<template>
    <div class="pulish-task_wrapper">
        <BusiAppHeader />
        <el-form 
            :model="ruleForm" 
            :rules="rules" 
            ref="ruleForm" 
            label-width="150px" 
            class="demo-ruleForm">
            <el-form-item>
                <div class="fz-20 fb-600 black-color mar-left-100">活动信息</div>
            </el-form-item>
            <el-form-item label="下单方式" prop="orderType">
                <el-radio 
                    v-for="(item, index) in orderTypeList" 
                    :key="index" 
                    v-model="ruleForm.orderType" 
                    :label="index">{{ item }}</el-radio>
            </el-form-item>
            <el-form-item label="限拍同一店铺" prop="shopTimeFlag">
                <el-radio v-model="ruleForm.shopTimeFlag" :label="0">15天限拍同一店铺</el-radio>
                <el-radio v-model="ruleForm.shopTimeFlag" :label="1">15天限拍我的店铺</el-radio>
            </el-form-item>
            <el-form-item label="选择店铺" prop="selectShop">
                <el-select v-model="ruleForm.selectShop" placeholder="请选择活动区域">
                    <el-option 
                        v-for="item in shopList" 
                        :key="item.id" 
                        :label="item.shopName" 
                        :value="item.id"></el-option> 
                </el-select>
            </el-form-item>
            <el-form-item label="联系QQ" prop="linkQQ">
                <el-input v-model="ruleForm.linkQQ" placeholder="请输入联系QQ"></el-input>
            </el-form-item>
            <el-form-item label="活动天数" prop="activeDay">
                <el-input v-model="ruleForm.activeDay" placeholder="请输入活动天数"></el-input>
            </el-form-item>
            <el-form-item>
                <div class="fz-20 fb-600 black-color mar-left-100">商品信息</div>
            </el-form-item>
            <el-form-item label="试用品名称" prop="taskName">
                <el-input v-model="ruleForm.taskName" placeholder="请输入试用品名称"></el-input>
            </el-form-item>
            <el-form-item label="试用品图片" prop="giftPhoto">
                <el-input v-model="ruleForm.giftPhoto" placeholder="请输入试用品图片"></el-input>
            </el-form-item>
            <el-form-item label="商品链接" prop="taskUrl">
                <el-input v-model="ruleForm.taskUrl" placeholder="请输入商品链接"></el-input>
            </el-form-item>
            <el-form-item label="商品图片" prop="taskPhoto">
                <el-input v-model="ruleForm.taskPhoto" placeholder="请输入商品链接"></el-input>
            </el-form-item>
            <el-form-item>
                <div class="fz-20 fb-600 black-color mar-left-100">价格与费用</div>
            </el-form-item>
            <el-form-item label="试用份数" prop="giftNum">
                <el-input v-model="ruleForm.giftNum" placeholder="请输入试用份数"></el-input>
            </el-form-item>
            <el-form-item label="下单价格" prop="orderPrice">
                <el-input v-model="ruleForm.orderPrice" placeholder="请输入下单价格"></el-input>
            </el-form-item>
            <el-form-item label="返金" prop="returnPrice">
                <div class="fz-16 black-color">全额返金</div>
            </el-form-item>
            <el-form-item>
                <div class="fz-20 fb-600 black-color mar-left-100">备注</div>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <div class="edit_container">
                    <quill-editor 
                        v-model="ruleForm.remark" 
                        ref="myQuillEditor" 
                        :options="editorOption" >
                    </quill-editor>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import BusiAppHeader from '@component/BusiAppHeader.vue';
    import api from "@API/index";
    import { quillEditor } from "vue-quill-editor"; //调用编辑器
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';

    export default {
        components: {
            BusiAppHeader,
            quillEditor 
        },
        data() {
            return {
                orderTypeList: ['淘宝', '天猫', '京东', '拼多多', '阿里巴巴'],
                shopList: [],
                editorOption: {},
                ruleForm: {
                    orderType: 0, // 下单方式
                    shopTimeFlag: 0, // 限制同一店铺拍卖
                    selectShop: null, // 选择店铺
                    linkQQ: '392064881', // 联系QQ
                    activeDay: null, // 活动天数
                    taskName: '试用品名称', // 试用品名称
                    giftPhoto: '试用品图片', // 试用品图片
                    taskUrl: '商品链接', // 商品链接
                    taskPhoto: '商品图片', // 商品图片
                    giftNum: null, // 试用份数
                    orderPrice: null, // 下单价
                    returnPrice: null, // 返金
                    remark: '下单前核对店铺和商品主图，必须完成加购收藏等注意事项的操作！货到以后，必须本人确认收货，必须在旺旺上给商家留言说：本人已签收快递，很满意！' // 备注
                },
                rules: {
                    orderType: [
                        { required: true, message: '请选择下单方式', trigger: 'change' }
                    ],
                    shopTimeFlag: [
                        { required: true, message: '请选择是否限制同一店铺拍卖', trigger: 'change' }
                    ],
                    selectShop: [
                        { required: true, message: '请选择店铺', trigger: 'change' }
                    ],
                    linkQQ: [
                        { required: true, message: '请输入联系QQ', trigger: 'blur' }
                    ],
                    activeDay: [
                        { required: true, message: '请输入活动天数', trigger: 'blur' }
                    ],
                    taskName: [
                        { required: true, message: '请输入试用品名称', trigger: 'blur' }
                    ],
                    giftPhoto: [
                        { required: true, message: '请输入试用品图片', trigger: 'blur' }
                    ],
                    taskUrl: [
                        { required: true, message: '请输入商品链接', trigger: 'blur' }
                    ],
                    taskPhoto: [
                        { required: true, message: '请输入商品图片', trigger: 'blur' }
                    ],
                    giftNum: [
                        { required: true, message: '请输入试用份数', trigger: 'blur' }
                    ],
                    // remark: [
                    //     { required: true, message: '请输入备注', trigger: 'blur' }
                    // ],
                    // returnPrice: [
                    //     { required: true, message: '请输入返金', trigger: 'blur' }
                    // ],
                }
            };
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
        },
        created() {
            this.loadShopData();
        },
        methods: {
            async loadShopData() {
                const res = await api.task.shopList();
                this.shopList = res.data;
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    // 返金的处理
                    this.ruleForm.returnPrice = this.ruleForm.orderPrice;
                    const res = await api.task.createTask(this.ruleForm);
                    this.resetForm(formName);
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.orderType = 0; // 下单方式
                this.shopTimeFlag = 0; // 限制同一店铺拍卖
                this.selectShop = null; // 选择店铺
                this.linkQQ = ''; // 联系QQ
                this.activeDay = null; // 活动天数
                this.taskName = ''; // 试用品名称
                this.giftPhoto = ''; // 试用品图片
                this.taskUrl = ''; // 商品链接
                this.taskPhoto = ''; // 商品图片
                this.giftNum = null; // 试用份数
                this.orderPrice = null; // 下单价
                this.returnPrice = null; // 返金
                this.remark = '下单前核对店铺和商品主图，必须完成加购收藏等注意事项的操作！货到以后，必须本人确认收货，必须在旺旺上给商家留言说：本人已签收快递，很满意！'; // 备注
            }
        }
    }
</script>

<style lang="scss">
.pulish-task_wrapper {
    width: 100%;
    height: 100%;
    .demo-ruleForm {
        background-color: #fff;
        padding: 24px 0;
        padding-right: 30px;
    }
}
.edit_container  {
    width: 800px;
    //输入框
    .ql-container {
        height: 400px;
    }
}
</style>