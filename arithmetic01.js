/**
 *
 #01 背包问题
 给你一个可装载重量为 W 的背包和 N 个物品，
 每个物品有重量和价值两个属性。
 其中第i个物品的重量为 wt [i】，价值为 vaL [i】，现在让你用这个背
 包装物品，最多能装的价值是多少？

 举个简单的例子，输入如下：

 N=3 (3 个物品）, W=4（背包容量 4)
 wt= [2,1,3]
 val= [4,2,3]


 算法返回 6, 选择前两件物品装进背包，总重量 3 小于 W，可以获得最大价值 6。

 明确【状态】和【选择】
 明确 dp 数组的定义
 三、状态转移方程怎么写？
 四、把伪代码转换为代码
 */

/**
 *
 * @param W 可装载重量
 * @param N 物品数量
 * @param wt 重量数组
 * @param val  价值数组
 */
function calculate(W, N, wt = [], val = []) {
  let dp = new Array(N + 1).fill(new Array(W + 1).fill(0))
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= W; j++) {
      if (j - wt[i - 1] > 0) {
        dp[i][j] = Math.max(
          dp[i - 1][j],
          dp[i - 1][j - wt[i - 1]] + val[i - 1]
        )
      } else {
        dp[i][j] = dp[i - 1][j]
      }
    }
  }
  return dp[N][W];
  // console.log(dp);
}

const wt = [2, 1, 3]
val = [4, 2, 3]
console.log(calculate(4, 3, wt, val));
