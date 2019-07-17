<template>
    <div class="payment-success-container">
        <img class="payment-success-img" src="../assets/img/paid@2x.png" alt="">
        <svg-icon class-name="logobtm-svg" icon-class="logobtm"/>
    </div>
</template>
<script>
export default {
    name: 'PaymentSuccess'
}
</script>
<style lang="scss" scoped>
.payment-success-container {
    .payment-success-img {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: auto;
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
