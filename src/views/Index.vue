<template>
    <div class="index-container">
        <svg-icon class-name="loading-svg" icon-class="loading"/>
    </div>
</template>
<script>
export default {
    name: 'Index',
    created() {
        setTimeout(() => {
            //  VerificationCode
            this.$router.push({name: 'Phone'});
        }, 3000);
    }
}
</script>
<style lang="scss" scoped>
.index-container {
    position: relative;
    height: 100%;
    .loading-svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        fill: #ccc;
    }
}
</style>
