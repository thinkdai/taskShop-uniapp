<template>
    <div class="task-manage_wrapper">
        <BusiAppHeader />
        <div class="content">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
            </el-table>
            <section class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
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
                await api.task.shopList();
            }
        }
    };
</script>

<style lang="scss" scoped>
.task-manage_wrapper {
    .pagination {
        margin-top: 20px; 
    }
}
</style>