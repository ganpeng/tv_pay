<template>
    <div class="index-container">
        <svg-icon v-if="!error" class-name="loading-svg" icon-class="loading"/>
        <span class="error-message" v-else>{{error}}</span>
    </div>
</template>
<script>
export default {
    name: 'Index',
    data() {
        return {
            error: ''
        };
    },
    async created() {
        try {
            // type的两种类型是：SINGLE_PAY | VIP
            //  单纯登录的url是：http://order.tianchiapi.com?uuid=d6EscX0dv8yP+E4C68Qe6IXqX/BWS0z5mNb2cn7QGSbZWkH7rGYKZSCPWS+9RJh7;
            //  未登录支付的url是：http://order.tianchiapi.com?uuid=d6EscX0dv8yP+E4C68Qe6IXqX/BWS0z5mNb2cn7QGSbZWkH7rGYKZSCPWS+9RJh7&type=VIP&id=5d284fb2e5dad9811ac71703
            //  登录了支付的url是：http://order.tianchiapi.com?token=3Ko546wLZ6FQOaTsWKQURhQi6tw3b2zW&type=SINGLE_PAY&id=5d284fb2e5dad9811ac71703

            //  三种方式的状态：1(已经登录直接支付), 2(先登录再支付), 3(只登陆不支付);

            let {uuid, token, type, id} = this.$route.query;

            if (token && id) {
                //  已经登录直接支付
                console.log('已经登录直接支付');
                let option = {status: 1, uuid, token, type, id};
                let queryString = JSON.stringify(option);
                let openid = localStorage.getItem('openid');
                localStorage.setItem('queryString', queryString);
                if (!openid) {
                    this.getOpenId();
                    return false;
                } else {
                    alert('直接支付');
                    return false;
                }
            }

            if (id && uuid) {
                // 未登录必须先登录再支付
                console.log('先登录再支付');
                let option = {status: 2, uuid, token, type, id};
                let queryString = JSON.stringify(option);
                localStorage.setItem('queryString', queryString);
                let openid = localStorage.getItem('openid');
                if (!openid) {
                    this.getOpenId();
                    return false;
                } else {
                    this.$router.push({name: 'Phone'});
                }
            }

            if (!id && !token && uuid) {
                //  只登录不支付
                console.log('只登录不支付');
                let option = {status: 3, uuid, token, type, id};
                let queryString = JSON.stringify(option);
                localStorage.setItem('queryString', queryString);
                this.$router.push({name: 'Phone'});
                return false;
            }

            this.error = '请使用扫码方式访问';
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        getOpenId() {
            let returnUrl = `${process.env.VUE_APP_ROOT}/openid`
            location.href = `${process.env.VUE_APP_ORDER_API_ROOT}/v1/trade/order/wxpay/getUserCode?returnUrl=${encodeURIComponent(returnUrl)}`;
        }
    }
}
</script>
<style lang="scss" scoped>
.index-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .loading-svg {
        width: 80px;
        height: 80px;
        fill: #ccc;
    }
}
</style>
