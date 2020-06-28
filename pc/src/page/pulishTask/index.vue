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
            <el-form-item label="限拍同一店铺" prop="limitDay">
                <el-radio v-model="ruleForm.limitDay" :label="0">15天限拍同一店铺</el-radio>
                <el-radio v-model="ruleForm.limitDay" :label="1">15天限拍我的店铺</el-radio>
            </el-form-item>
            <el-form-item label="选择店铺" prop="storeId">
                <el-select v-model="ruleForm.storeId" placeholder="请选择活动区域">
                    <el-option 
                        v-for="item in shopList" 
                        :key="item.id" 
                        :label="item.shopName" 
                        :value="item.id"></el-option> 
                </el-select>
            </el-form-item>
            <el-form-item label="联系QQ" prop="qq">
                <el-input v-model="ruleForm.qq" placeholder="请输入联系QQ"></el-input>
            </el-form-item>
            <el-form-item label="活动天数" prop="days">
                <el-input v-model="ruleForm.days" placeholder="请输入活动天数"></el-input>
            </el-form-item>
            <el-form-item>
                <div class="fz-20 fb-600 black-color mar-left-100">商品信息</div>
            </el-form-item>
            <el-form-item label="试用品名称" prop="title">
                <el-input v-model="ruleForm.title" placeholder="请输入试用品名称"></el-input>
            </el-form-item>
            <el-form-item label="试用品图片" prop="givePicUrl">
                <!-- <el-input v-model="ruleForm.givePicUrl" placeholder="请输入试用品图片"></el-input> -->
                <BusiImgUpload :imgUrl.sync="ruleForm.givePicUrl" placeholder="请输入试用品图片" />
            </el-form-item>
            <el-form-item label="商品链接" prop="paiLinkUrl">
                <el-input v-model="ruleForm.paiLinkUrl" placeholder="请输入商品链接"></el-input>
            </el-form-item>
            <el-form-item label="商品图片" prop="paiPicUrl">
                <!-- <el-input v-model="ruleForm.givePicUrl" placeholder="请输入商品链接"></el-input> -->
                <BusiImgUpload :imgUrl.sync="ruleForm.paiPicUrl" placeholder="请输入试用品图片" />
            </el-form-item>
            <el-form-item>
                <div class="fz-20 fb-600 black-color mar-left-100">价格与费用</div>
            </el-form-item>
            <el-form-item label="试用份数" prop="paiNum">
                <el-input v-model="ruleForm.paiNum" placeholder="请输入试用份数"></el-input>
            </el-form-item>
            <el-form-item label="下单价格" prop="paiPrice">
                <el-input v-model="ruleForm.paiPrice" placeholder="请输入下单价格"></el-input>
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
    import BusiImgUpload from '@component/BusiImgUpload.vue';
    import api from "@API/index";
    import { quillEditor } from "vue-quill-editor"; //调用编辑器
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';

    export default {
        components: {
            BusiAppHeader,
            quillEditor,
            BusiImgUpload
        },
        data() {
            return {
                orderTypeList: ['淘宝', '天猫', '京东', '拼多多', '阿里巴巴'],
                shopList: [],
                editorOption: {},
                ruleForm: {
                    // days: "15",
                    // givePicUrl: "https://www.taobao.com/",
                    // limitDay: 0,
                    // orderType: 0,
                    // paiLinkUrl: "https://www.taobao.com/",
                    // paiNum: "5",
                    // givePicUrl: "https://www.taobao.com/",
                    // paiPrice: "100",
                    // qq: "392064881",
                    // remark: "下单前核对店铺和商品主图，必须完成加购收藏等注意事项的操作！货到以后，必须本人确认收货，必须在旺旺上给商家留言说：本人已签收快递，很满意！",
                    // returnPrice: "100",
                    // storeId: 2,
                    // title: "测试使用",
                    orderType: 0, // 下单方式
                    limitDay: 0, // 限制同一店铺拍卖
                    storeId: null, // 选择店铺
                    qq: '', // 联系QQ
                    days: null, // 活动天数
                    title: '', // 试用品名称
                    givePicUrl: '', // 试用品图片
                    paiLinkUrl: '', // 商品链接
                    givePicUrl: '', // 试用商品图片
                    paiPicUrl: '', // 拍卖商品图片
                    paiNum: null, // 试用份数
                    paiPrice: null, // 下单价
                    returnPrice: null, // 返金
                    remark: '下单前核对店铺和商品主图，必须完成加购收藏等注意事项的操作！货到以后，必须本人确认收货，必须在旺旺上给商家留言说：本人已签收快递，很满意！' // 备注
                },
                rules: {
                    orderType: [
                        { required: true, message: '请选择下单方式', trigger: 'change' }
                    ],
                    limitDay: [
                        { required: true, message: '请选择是否限制同一店铺拍卖', trigger: 'change' }
                    ],
                    storeId: [
                        { required: true, message: '请选择店铺', trigger: 'change' }
                    ],
                    qq: [
                        { required: true, message: '请输入联系QQ', trigger: 'blur' }
                    ],
                    days: [
                        { required: true, message: '请输入活动天数', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '请输入试用品名称', trigger: 'blur' }
                    ],
                    givePicUrl: [
                        { required: true, message: '请输入试用品图片', trigger: 'blur' }
                    ],
                    paiLinkUrl: [
                        { required: true, message: '请输入商品链接', trigger: 'blur' }
                    ],
                    givePicUrl: [
                        { required: true, message: '请输入商品图片', trigger: 'blur' }
                    ],
                    paiNum: [
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
                this.shopList = res.data.list;
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    // 返金的处理
                    this.ruleForm.returnPrice = this.ruleForm.paiPrice;
                    const res = await api.task.createTask(this.ruleForm);
                    this.resetForm(formName);
                    // 跳转到任务列表
                    this.$router.push({ path: '/taskManage' })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.ruleForm.orderType = 0; // 下单方式
                this.ruleForm.limitDay = 0; // 限制同一店铺拍卖
                this.ruleForm.storeId = null; // 选择店铺
                this.ruleForm.qq = ''; // 联系QQ
                this.ruleForm.days = null; // 活动天数
                this.ruleForm.title = ''; // 试用品名称
                this.ruleForm.givePicUrl = ''; // 试用品图片
                this.ruleForm.paiLinkUrl = ''; // 商品链接
                this.ruleForm.givePicUrl = ''; // 商品图片
                this.ruleForm.paiNum = null; // 试用份数
                this.ruleForm.paiPrice = null; // 下单价
                this.ruleForm.returnPrice = null; // 返金
                this.ruleForm.remark = '下单前核对店铺和商品主图，必须完成加购收藏等注意事项的操作！货到以后，必须本人确认收货，必须在旺旺上给商家留言说：本人已签收快递，很满意！'; // 备注
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