<template>
    <div class="log-manage_wrapper">
        <BusiAppHeader />
        <div class="content">
            <div v-html="urlLog"></div>
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
                urlLog: ''
            };
        },
        created() {
            this.loadData();
        },
        methods: {
            async loadData() {
                const res = await api.log.logAPI();
                this.urlLog = res.replace(/^\[.*/i, '&nbsp');
            }
        }
    };
</script>

<style lang="scss" scoped>
.content {

}
</style>