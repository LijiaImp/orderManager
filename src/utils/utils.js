function getnum(num) {
    return num < 10 ? '0' + num : num
}

export const getDate = (time) => {

    let t = (typeof time == 'string' ? new Date(time) : time); //Date会自动把时间转化为当前时区的时间
    // 1. 取带时区的时间
    return t.getFullYear() + '-' + getnum((t.getMonth() + 1)) + '-' + getnum(t.getDate()) + ' ' + getnum(t.getHours()) + ':' + getnum(t.getMinutes()) + ':' + getnum(t.getSeconds())
}



/* 数字金额逢三加， 比如 123,464.23 */
export function numberToCurrency(value) {
    if (!value) return '0.00';
    // 将数值截取，保留两位小数
    value = value.toFixed(2);
    // 获取整数部分
    const intPart = Math.trunc(value);
    // 整数部分处理，增加,
    const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    // 预定义小数部分
    let floatPart = '.00';
    // 将数值截取为小数部分和整数部分
    const valueArray = value.toString().split('.');
    if (valueArray.length === 2) { // 有小数部分
        floatPart = valueArray[1].toString(); // 取得小数部分
        return intPartFormat + '.' + floatPart;
    }
    return intPartFormat + floatPart
}