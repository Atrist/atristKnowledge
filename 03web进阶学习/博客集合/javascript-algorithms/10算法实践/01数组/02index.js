/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let current;
    let tomorrow;
    let money = 0;
    // 表示是否持有
    let flag = false;
    // 表示持股的数量
    let numberOfStock = 0;
    for (let i = 0; i < prices.length; i++) {
        current = prices[i];
        tomorrow = prices[i + 1];
        // 判断是否持有
        if (flag) {
            // 为真,便持有
            // 持有就卖出
            // 如果今天的价格比明天的价格低,就可以买入
            if (current > tomorrow) {
                money += current - numberOfStock;
                flag = false;
            }
            // 如果,今天是最后一天,持有就卖出
            if (i === prices.length - 1) {
                money += current - numberOfStock;
                flag = false;
            }
        } else {
            // 为假,便不持有
            //便买入
            if (current < tomorrow) {
                // 经过测试,忽略了current本身为零的情况
                numberOfStock = current;
                flag = true;
            }
        }
    }
    return money;
}

let num = maxProfit([1, 2, 3, 4, 5]);
console.log(num);

num = maxProfit([7,6,4,3,1]);
console.log(num);

num = maxProfit([7,1,5,3,6,4]);
console.log(num);


num = maxProfit([2, 1, 2, 0, 1]);
console.log(num);