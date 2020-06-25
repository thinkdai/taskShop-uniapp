<template>
    <div class="task-manage_wrapper">
        <BusiAppHeader />
        <div class="content">
            <section class="shop-tool-btn">
                <el-button type="primary" @click="addShop">添加商铺</el-button>
            </section>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="商铺ID"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="shopName"
                    label="商铺名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="shopUrl"
                    label="商铺链接">
                    <template slot-scope="scope">
                        <a :href="scope.row.shopUrl" target="_blank">{{ scope.row.shopUrl }}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="shopOwner"
                    label="掌柜"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
                        <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <section class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="params.page"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="params.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="params.total">
                    </el-pagination>
            </section>
            <!-- 弹窗 -->
            <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">
                <el-form 
                    :model="ruleForm" 
                    :rules="rules" 
                    ref="ruleForm" 
                    label-width="100px" 
                    class="demo-ruleForm">
                    <el-form-item label="商铺名称" prop="shopName">
                        <el-input v-model="ruleForm.shopName"></el-input>
                    </el-form-item>
                    <el-form-item label="商铺链接" prop="shopUrl">
                        <el-input v-model="ruleForm.shopUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="掌柜" prop="shopOwner">
                        <el-input v-model="ruleForm.shopOwner"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">取消</el-button>
                    </el-form-item>
                    </el-form>
            </el-dialog>
        </div>
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
                tableData: [],
                params: {
                    page: 1,
                    pageSize: 10,
                    total: 0
                },
                dialogVisible: false,
                ruleForm: {
                    id: '',
                    shopName: '',
                    shopUrl: '',
                    shopOwner: ''
                },
                rules: {
                    shopName: [
                        { required: true, message: '请填写商铺名称', trigger: 'blur' }
                    ],
                    shopUrl: [
                        { required: true, message: '请填写商铺链接', trigger: 'blur' }
                    ],
                    shopOwner: [
                        { required: true, message: '请填写掌柜', trigger: 'blur' }
                    ]
                }
            };
        },
        computed: {
            title() {
                return '创建商铺';
            }
        },
        created() {
            this.loadData();
        },
        methods: {
            async loadData() {
                const res = await api.shop.shopList(this.params);
                const { page, total, list } = res.data;
                this.tableData = list;
                this.params.page = page;
                this.params.total = total;
            },
            handleClose() {
                this.dialogVisible = false;
                this.$refs['ruleForm'].resetFields();
            },
            // 新增
            addShop() {
                this.dialogVisible = true;
            },
            // 编辑删除
            async handleDelete({ id }) {
                await api.shop.deleteShop(id);
                this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success',
                    duration: 1500
                });
                this.loadData();
            },
            handleEdit(row) {
                this.ruleForm = row;
                this.dialogVisible = true;
            },
            // 表单创建
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let res;
                    !this.ruleForm.id && (res = await api.shop.createShop(this.ruleForm));
                    this.ruleForm.id && (res = await api.shop.updateShop(this.ruleForm));
                    this.$notify({
                        title: '成功',
                        message: this.ruleForm.id ? '编辑成功' : '新增成功',
                        type: 'success'
                    });
                    this.handleClose();
                    this.loadData();
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.handleClose();
            },
            // 分页
            handleSizeChange(val) {
                this.params.pageSize = val;
                this.loadData();
            },
            handleCurrentChange() {
                this.params.page = val;
                this.loadData();
            }
        }
    };
</script>

<style lang="scss" scoped>
.task-manage_wrapper {
    width: 100%;
    height: 100%;
    .pagination {
        margin-top: 20px; 
    }
    .shop-tool-btn {
        margin-bottom: 20px;
    }
}
</style>