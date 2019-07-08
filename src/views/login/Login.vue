<!-- 登录页面 -->
<template>
    <div id="login-container" class="login-container el-container">
        <div class="form-box" @keyup.enter="loginHandler">
            <svg-icon icon-class="login_log"/>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Login',
        data() {
            return {};
        },
        methods: {
            async loginHandler() {}
        }
};
</script>
<style lang="scss" scoped>
</style>
