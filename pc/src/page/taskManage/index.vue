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
                </el-table-column>
                <el-table-column
                    prop="paiPicUrl"
                    label="任务图片">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="任务名称">
                </el-table-column>
                <el-table-column
                    prop="paiLinkUrl"
                    label="任务的链接">
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
                }
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