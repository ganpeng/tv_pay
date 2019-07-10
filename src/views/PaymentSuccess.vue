<template>
    <div class="payment-success-container">
        <svg-icon class-name="payment-success-svg" icon-class="paid"/>
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
    .payment-success-svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 8.2rem;
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
