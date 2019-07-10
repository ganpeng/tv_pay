<template>
    <div class="bought-before-container">
        <div class="center-container">
            <svg-icon class-name="bought-success-svg" icon-class="img_login"/>
            <p>您已购买该节目</p>
            <p>请在TV端观看</p>
        </div>
        <svg-icon class-name="logobtm-svg" icon-class="logobtm"/>
    </div>
</template>
<script>
export default {
    name: 'BoughtBefore'
}
</script>
<style lang="scss" scoped>
.bought-before-container {
    .center-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        .bought-success-svg {
            width: 100%;
            height: 2.06rem;
        }
        p {
            font-size: 16px;
            line-height: 16px;
            text-align: center;
            margin-top: 0.6rem;
        }
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
