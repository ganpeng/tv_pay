<template>
    <div class="input-message-container">
        <h3 class="input-message-title">输入验证码</h3>
        <p class="message-send-prompt">验证码已发送至 <span class="phone-num">{{splitPhone}}</span></p>
        <div class="input-code-filed">
            <vue-input-code
                span-size="20px"
                type="number"
                :number="4"
                height="50px"
                span-color="#000"
                input-color="#000"
                input-size="24px"
                :code="code"
                :get-input="getInput"
                :success="success">
            </vue-input-code>
        </div>
        <div class="text-wrapper">
            <p @click="getCodeHandler" :class="['resent-code', show && 'active']">
                {{getCodeText}}
            </p>
            <span v-if="errorMessage" class="code-error">{{errorMessage}}</span>
        </div>
        <message-box ref="messageBox" :enterHandler="loginFailedHandler"></message-box>
        <toast ref="toast" :text="text"></toast>
    </div>
</template>
<script>
import _ from 'lodash';
import MessageBox from '../components/MessageBox';
import Toast from '../components/Toast';
export default {
    name: 'VerificationCode',
    components: {MessageBox, Toast},
    data() {
        return {
            //  验证码相关
            code: [],
            phone: '',
            errorMessage: '',
            //  倒计时相关
            timer: null,
            count: '',
            show: true,
            //  加载圆圈
            loading: null,
            //  Toast文字
            text: ''
        };
    },
    beforeRouteEnter(to, from, next) {
        if (from.name !== 'Phone') {
            next(vm => { vm.$router.replace('Phone'); });
        } else {
            next();
        }
    },
    async created() {
        let {phone} = this.$route.query;
        this.phone = phone || '';
        if (localStorage.getItem('send')) {
            localStorage.removeItem('send');
            this.getCodeHandler();
        }
    },
    computed: {
        getCodeText() {
            if (this.show) {
                return '重新获取验证码';
            } else {
                return `${this.count}s 后重新获取验证码`;
            }
        },
        splitPhone() {
            return this.phone.replace(/(\d{3})(\d{0,4})/, '$1 $2 ');
        }
    },
    methods: {
        async getCodeHandler() {
            try {
                if (this.show) {
                    this.getCode();
                    this.errorMessage = '';
                    console.log('获取验证码的请求开始了');
                    let response = await this.$service.getVerifyCode(this.phone);
                    let res = await response.json();
                    console.log('获取验证码的请求结束了');
                    if (res && res.code !== 0) {
                        this.errorMessage = res.message;
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },
        getCode(){
            this.show = false;
            const TIME_COUNT = 60;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.show = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000)
            }
        },
        getInput() {},
        async success() {
            try {
                let option = JSON.parse(localStorage.getItem('queryString'));
                let mobile = this.phone;
                let smsCode = this.code.join('');
                let uuid = _.get(option, 'uuid');
                let status = _.get(option, 'status');

                if (mobile) {
                    if (status === 2) {
                        this.loginAndPay(mobile, smsCode, uuid);
                    }

                    if (status === 3) {
                        this.login(mobile, smsCode, uuid);
                    }
                } else {
                    this.text = '手机号不能为空';
                    this.$refs.toast.showHandler();
                }
            } catch (err) {
                console.log(err);
            }
        },
        async login(mobile, smsCode, uuid) {
            try {
                this.loading = this.$loading.show();
                console.log('登录的请求开始了');
                let response = await this.$service.loginTVApp({mobile, smsCode, uuid});
                let res = await response.json();
                console.log('登录的请求结束了');
                if (res && res.code === 0) {
                    this.$router.replace({name: 'LoginSuccess'});
                } else {
                    this.text = res.message;
                    this.$refs.toast.showHandler();
                }
            } catch (err) {
                console.log(err);
            }  finally {
                this.loading.hide();
            }
        },
        async loginAndPay(mobile, smsCode, uuid) {
            try {
                this.loading = this.$loading.show();
                let loginResponse = await this.$service.loginTVApp({mobile, smsCode, uuid});
                let res = await loginResponse.json();
                if (res && res.code === 0) {
                    let token = res.data.token;
                    let openId = localStorage.getItem('openid');
                    let option = JSON.parse(localStorage.getItem('queryString'));
                    let {type, id, uuid} = option;
                    let orderResponse = await this.$service.submitOrder({openId, type, productId: id, uuid, token});
                    let orderRes = await orderResponse.json();
                    if (orderRes && orderRes.code === 0) {
                        let payResponse = await this.payHandler(orderRes.data);
                        if (payResponse.err_msg == "get_brand_wcpay_request:ok") {
                            this.$router.replace({name: 'PaymentSuccess'});
                        }
                    } else {
                        this.text= orderRes.message;
                        this.$refs.toast.showHandler();
                        // this.$router.replace({name: 'BoughtBefore'});
                    }
                } else {
                    this.text = res.message;
                    this.$refs.toast.showHandler();
                }
            } catch (err) {
                console.log(err);
            } finally {
                this.loading.hide();
            }
        },
        pay() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve('success');
                }, 3000);
            });
        },
        loginFailedHandler() {
            this.$router.replace({name: 'Phone'});
        },
        showMessageBoxHandler() {
            this.$refs.messageBox.showHandler();
        },
        payHandler(config) {
            function onBridgeReady() {
                return new Promise((resolve) => {
                    WeixinJSBridge.invoke('getBrandWCPayRequest', {
                        appId: config.appId,
                        timeStamp: config.timeStamp,
                        nonceStr: config.nonceStr,
                        package: config.package,
                        signType: config.signType,
                        paySign: config.paySign
                    }, res => resolve(res));
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
                return onBridgeReady();
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.input-message-container {
    width: 12.53rem;
    margin: 0 auto;
    .input-message-title {
        margin-top: 4rem;
        font-size: 32px;
        line-height: 32px;
        color: #000;
        margin-bottom: 1rem;
    }
    .message-send-prompt {
        color: #333;
        font-size: 16px;
        line-height: 16px;
    }
    .input-code-filed {
        margin-top: 1rem;
    }
    .text-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1.3rem;
        .resent-code {
            color: #333;
            font-size: 14px;
            line-height: 14px;
            &.active {
                color: #00ABFF;
            }
        }
        .code-error {
            color: #FD0000;
            font-size: 14px;
        }
    }
}
</style>
<style lang="scss">
.vue_input_code .input > span {
    border: none;
    border-bottom: 1px solid #000;
    font-weight: normal;
    & + span {
        margin-left: 0.4rem;
    }
}
.vue_input_code .input > span:last-child {
    border-right: none;
    border-radius: 0;
}
.vue_input_code .input > span.first {
    border-radius: 0;
}

.vue_input_code .input > div input {
    caret-color: #00ABFF;
    font-size: 0.72rem!important;
}
</style>

