<template>
    <div class="open-id">
        openId
        <message-box ref="messageBox" :enterHandler="loginFailedHandler"></message-box>
        <toast ref="toast" :text="text"></toast>
    </div>
</template>
<script>
import _ from 'lodash';
import MessageBox from '../components/MessageBox';
import Toast from '../components/Toast';
export default {
    name: 'OpenId',
    components: {MessageBox, Toast},
    data() {
        return {
            loading: null,
            text: ''
        }
    },
    async created() {
        try {
            let {openid} = this.$route.query;
            if (!openid) {
                alert('获取用户授权openid失败');
                return false;
            } else {
                localStorage.setItem('openid', openid);
            }

            let optionString = localStorage.getItem('queryString');

            if (optionString) {
                let option = JSON.parse(optionString);
                let status = _.get(option, 'status');
                if (status === 1) {
                    this.submitOrder();
                } else if (status === 2) {
                    this.$router.replace({name: 'Phone'});
                }
            }
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        async submitOrder() {
            try {
                this.loading = this.$loading.show();
                let openId = localStorage.getItem('openid');
                let optionString = localStorage.getItem('queryString');
                let option = JSON.parse(optionString);
                let {token, type, id} = option;
                let orderResponse = await this.$service.submitOrder({openId, token, type, productId: id});
                let orderRes = await orderResponse.json();
                if (orderRes && orderRes.code === 0) {
                    this.payHandler(orderRes.data);
                } else {
                    this.text= orderRes.message;
                    this.$refs.toast.showHandler();
                    // this.$router.replace({name: 'BoughtBefore'});
                }
            } catch (err) {
                console.log(err);
            } finally {
                this.loading.hide();
            }
        },
        payHandler(config) {
            let that = this;
            function onBridgeReady() {
                WeixinJSBridge.invoke('getBrandWCPayRequest', config, res => {
                    if (res.err_msg === 'get_brand_wcpay_request:ok') {
                        that.$router.replace({name: 'PaymentSuccess'});
                    } else {
                        console.log('支付失败');
                    }
                });
            }

            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            }else{
                onBridgeReady();
            }
        },
        loginFailedHandler() {
            this.$router.replace({name: 'Phone'});
        }

    }
}
</script>
<style lang="scss" scoped>

</style>
