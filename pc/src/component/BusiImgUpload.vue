<template>
    <!-- 图片上传的组件 -->
    <div class="image-upload">
        <el-input v-model="input" :placeholder="placeholder" @input="inputValue"></el-input>
        <el-button type="primary" @click="handleClick">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        <input ref="input" type="file" class="el-upload__input" @change="handleChange">
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'ImageUpload',
        props: {
            imgUrl: {
                type: String,
                default: null
            },
            placeholder: {
                type: String,
                default: '请输入内容'
            }
        },
        data() {
            return {
                input: '',
                actionURL: 'api/apiPc/upload/img'
            };
        },
        watch: {
            imgUrl: {
                immediate: true,
                handler(newVal) {
                    this.input = newVal;
                }
            }
        },
        methods: {
            inputValue() {
                this.$emit('update:imgUrl', this.input);
            },
            handleClick() {
                // 打开上传文件
                this.$refs.input.click();
            },
            handleChange(ev) {
                //获取到文件
                const files = ev.target.files[0];
                if (!files) return;
                // 上传
                const before = this.beforeUpload(files);
                if (!before) return;
                this.xhrUpload(files);
            },
            // 上传之前的类型校验
            beforeUpload(files) {
                //限制上传的代码格式与大小
                const fileSize = files.size; 
                const size = fileSize / 1024;

                if (size > 2000) {  
                    this.$message({
                        showClose: true,
                        message: '附件不能大于2M',
                        type: 'error'
                    });
                    return false;
                }

                //限制上传的文件格式
                const name = files.name;
                const fileName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
                if ( fileName !="jpg"  
                    && fileName !="jpeg" 
                    && fileName !="pdf" 
                    && fileName !="png" 
                    && fileName !="dwg" 
                    && fileName !="gif" ) {
                    this.$message({
                        showClose: true,
                        message: '请选择图片格式文件上传(jpg,png,gif,dwg,pdf,gif等)！',
                        type: 'error'
                    });
                    return false;
                }
                return true;
            },
            // 上传服务器
            async xhrUpload(files) {
                // 创建form对象,将文件内容添加到form对象中
                const param = new FormData();
                // 通过append向form对象添加数据
                param.append('file', files, files.name);

                const header = Object.assign({
                    'Content-Type': 'multipart/form-data'
                });

                const res = await axios.request({
                    url: this.actionURL,
                    method: 'post',
                    data: param, 
                    headers: header
                });
                // 将数据添加到输入框
                this.input = res.data.data.url;
                this.$emit('update:imgUrl', this.input);
            }
        }
    };
</script>

<style lang="scss" scoped>
.image-upload {
    display: flex;
}
</style>
