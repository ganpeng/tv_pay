<template>
    <div class="login-success-container">
        <svg-icon class-name="login-success-svg" icon-class="loginsuccess"/>
        <svg-icon class-name="logobtm-svg" icon-class="logobtm"/>
    </div>
</template>
<script>
export default {
    name: 'LoginSuccess'
}
</script>
<style lang="scss" scoped>
.login-success-container {
    .login-success-svg {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 8.7rem;
    }
    .logobtm-svg {
        position: absolute;
        bottom: 2.87rem;
        left: 50%;
        transform: translateX(-50%);
        width: 4.78rem;
        height: 2.45rem;
    }
}
</style>
