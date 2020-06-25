<template>
    <div class="task-manage_wrapper">
        <BusiAppHeader />
        <div class="content">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="任务id">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="任务名称">
                </el-table-column>
                <el-table-column
                    prop="orderType"
                    label="下单方式">
                </el-table-column>
                <el-table-column
                    prop="limitDay"
                    label="同一店铺限拍时限">
                </el-table-column>
                <el-table-column
                    prop="storeName"
                    label="店铺名称">
                </el-table-column>
                <el-table-column
                    prop="qq"
                    label="联系QQ">
                </el-table-column>
                <el-table-column
                    prop="days"
                    label="活动时间">
                </el-table-column>
                <el-table-column
                    prop="givePicUrl"
                    label="礼物图片">
                    <template slot-scope="scope">
                        <a :href="scope.row.givePicUrl" target="_blank">{{ scope.row.givePicUrl }}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="paiPicUrl"
                    label="任务图片">
                    <template slot-scope="scope">
                        <a :href="scope.row.paiPicUrl" target="_blank">{{ scope.row.paiPicUrl }}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="paiLinkUrl"
                    label="任务的链接">
                    <template slot-scope="scope">
                        <a :href="scope.row.paiLinkUrl" target="_blank">{{ scope.row.paiLinkUrl }}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="paiNum"
                    label="试用份数">
                </el-table-column>
                <el-table-column
                    prop="paiPrice"
                    label="下单价">
                </el-table-column>
                <el-table-column
                    prop="returnPrice"
                    label="返额">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    width="150"
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
                    :page-size="params.page_size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="params.total">
                    </el-pagination>
            </section>
            <!-- 弹窗 -->
            <el-dialog
                title="编辑任务"
                :visible.sync="visible"
                width="50%"
                :before-close="handleClose">
                <el-form 
                    :model="ruleForm" 
                    :rules="rules" 
                    ref="ruleForm" 
                    label-width="100px" 
                    class="demo-ruleForm">
                    <el-form-item label="活动天数" prop="days">
                        <el-input v-model="ruleForm.days"></el-input>
                    </el-form-item>
                    <el-form-item label="试用份数" prop="paiNum">
                        <el-input-number v-model="ruleForm.paiNum" :min="1" :max="20" label="请输入试用份数"></el-input-number>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
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
                    page_size: 10,
                    total: 0
                },
                ruleForm: {
                    id: '',
                    days: null, // 活动天数
                    paiNum: 1 // 份数
                },
                visible: false
            };
        },
        created() {
            this.loadData();
        },
        methods: {
            async loadData() {
                const res = await api.task.taskList(this.params);
                this.tableData = res.data.list;
            },
            handleCurrentChange(val) {
                this.params.page = val;
                this.loadData();
            },
            handleSizeChange(val) {
                this.params.page_size = val;
                this.loadData();
            },
            // 操作
            async handleDelete({ id }) {
                const res = await api.task.deleteTask(id);
                this.loadData();
            },
            handleEdit(row) {
                this.visible = true;
                this.ruleForm = row;
            },
            // 弹窗
             submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const res = await api.task.updateTask(this.ruleForm);
                    this.$notify({
                        title: '成功',
                        message: '编辑成功',
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
            resetForm() {
                this.$refs['ruleForm'].resetFields();
                this.visible = false;
            },
            handleClose() {
                this.resetForm();
            }
        }
    };
</script>

<style lang="scss" scoped>
.task-manage_wrapper {
    height: 100%;
    width: 100%;
    .pagination {
        margin-top: 20px; 
    }
    .content {
        width: 100%;
    }
}
</style>