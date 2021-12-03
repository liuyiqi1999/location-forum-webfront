/*年-月-日 时:分*/
export function formatTime(time: string) {
  if (time) {
    let date = new Date(time);
    let year = date.getFullYear();
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    let month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minutes =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    // 拼接
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
  } else {
    return '';
  }
}
