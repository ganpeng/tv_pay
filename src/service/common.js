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
