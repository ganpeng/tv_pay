import service from './config';

/**
 * 获取手机验证码
 */
export const getVerifyCode = (phoneNum) => {
    return service.post(`/v1/sms/code?phoneNum=${phoneNum}`);
};

/**
 * 手机扫码登录
 */
export const loginTVApp = ({token, mobile, caNo, smsCode}) => {
    return service.post('/v1/auth/login', {token, mobile, caNo, smsCode});
};
