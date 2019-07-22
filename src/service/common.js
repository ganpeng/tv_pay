import _ from 'lodash';
import qs from 'querystring';

/**
 * 获取手机验证码
 */
export const getVerifyCode = (phoneNum) => {
    return fetch(`${process.env.VUE_APP_SMS_API}/v1/sms/code?phoneNum=${phoneNum}`, {
        method: 'POST'
    });
};

/**
 * 手机扫码登录
 */
export const loginTVApp = ({mobile, uuid, smsCode}) => {
    return fetch(`${process.env.VUE_APP_SMS_API}/v1/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({mobile, uuid, smsCode})
    });
};

/**
 * 下单接口
 */
export const submitOrder = (params) => {
    let paramsStr = qs.stringify(_.pickBy(params, (item) => {
        return item !== '' && item !== undefined;
    }));

    if (params.token) {
        return fetch(`${process.env.VUE_APP_SMS_API}/v1/trade/order/wxpay/webpay?${paramsStr}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-tianchi-client': '{"platform":"android|ios","version":"v1.0.1","caNo":"00000000","stbNo":"bfabe19e45f147ff","mobile":"18612334455","userId":33721}',
                'x-tianchi-token': params.token
            }
        });
    } else {
        return fetch(`${process.env.VUE_APP_SMS_API}/v1/trade/order/wxpay/webpay?${paramsStr}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-tianchi-client': '{"platform":"android|ios","version":"v1.0.1","caNo":"00000000","stbNo":"bfabe19e45f147ff","mobile":"18612334455","userId":33721}'
            }
        });

    }
};
