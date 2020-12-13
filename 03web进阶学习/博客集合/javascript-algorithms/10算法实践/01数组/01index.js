/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    let demo = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (demo === nums[i])
            nums[i] = null;
        else {
            demo = nums[i];
        }
    }
    let lengths = 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i]) {
            nums[lengths] = nums[i];
            lengths++;
        }
    }
    nums.length = lengths;
    return nums;
};

nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
nums = [1, 1, 2];
numsLog = removeDuplicates(nums);
console.log(numsLog);