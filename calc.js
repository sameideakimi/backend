// @ts-check
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function sumAll() {
  // for 이용
  //   for (let i = 0; i < arr.length; i++) {
  //     sum = sum + arr[i];
  //   }

  // 메소드
  const sum = arr.reduce((acc, num) => acc + num, 0);
  return sum;
}

module.exports = {
  arr,
  sumAll,
};
