<template>
    <div class="get-message-container">
        <div class="logo">
            <h3>
                欢迎登录天驰TV
            </h3>
            <svg-icon class-name="logo-svg" icon-class="logo"/>
            <div class="linear-gradient-box"></div>
        </div>
    </div>    
</template>
<script>
export default {
    name: 'GetMessage'
}
</script>
<style lang="scss" scoped>
.logo {
    position: relative;
    width: 12.53rem;
    height: 1.8rem;
    line-height: 1.8rem;
    margin: 0 auto;
    margin-top: 3.6rem;
    h3 {
        position: relative;
        font-weight: bold;
        font-size: 1rem;
        text-indent: 0.48rem;
        z-index: 4;
    }
    .logo-svg {
        position: absolute;
        bottom: 0;
        right: 1rem;
        width: 2rem;
        height: 1.52rem;
        z-index: 4;
    }
    .linear-gradient-box {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 80%;
        height: 1rem;
        background: linear-gradient(to right,#39f1f9,#fff);
        z-index: 2;
    }
}
</style>
