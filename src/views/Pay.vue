<template>
    <div class="pay"></div>
</template>
<script>
export default {
    name: 'Pay',
    created() {
        function onBridgeReady(){
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId":"wx1ef44a42cfebe73c",     //公众号名称，由商户传入
                    "timeStamp":"1563449182",         //时间戳，自1970年以来的秒数
                    "nonceStr":"JBdtFazk5eXhlyUg", //随机串
                    "package":"prepay_id=wx1819262226175104b5be96541804097600",
                    "signType":"MD5",         //微信签名方式：
                    "paySign":"63554ED3EF669CE76E9326CAF59C923B62928D8D539BDC0F9A9546A95A676573" //微信签名
                },
                function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok" ){
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                    //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    } else {
                        alert('支付失败');
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
    }
}
</script>
