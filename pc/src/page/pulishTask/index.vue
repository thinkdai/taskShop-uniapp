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
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系QQ" prop="linkQQ">
                <el-input v-model="ruleForm.linkQQ"></el-input>
            </el-form-item>
            <el-form-item label="活动天数" prop="activeDay">
                <el-input v-model="ruleForm.activeDay"></el-input>
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

    export default {
        components: {
            BusiAppHeader
        },
        data() {
            return {
                orderTypeList: ['淘宝', '天猫', '京东', '拼多多', '阿里巴巴'],
                shopList: [],
                ruleForm: {
                    orderType: 0, // 下单方式
                    shopTimeFlag: 0, // 限制同一店铺拍卖
                    selectShop: 0, // 选择店铺
                    linkQQ: '', // 联系QQ
                    activeDay: 15, // 活动天数
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
            };
        },
        created() {
            this.loadShopData();
        },
        methods: {
            async loadShopData() {
                const res = await api.task.shopList();
                this.shopList = res.data;
                console.log(this.shopList);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="scss" scoped>
.pulish-task_wrapper {
    width: 100%;
    height: 100%;
    .demo-ruleForm {
        background-color: #fff;
        padding: 24px 0;
    }
}
</style>