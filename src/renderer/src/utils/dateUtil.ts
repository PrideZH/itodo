export const SECONDS = 1000
export const MINUTES = SECONDS * 60
export const HOURS = MINUTES * 60

/**
 * 时间格式化
 * @param date 时间
 * @param format 格式化字符
 * @returns 格式化字符
 */
 export const dateFormat = (date: Date, format: string): string => {
  if (typeof(date) === 'string') {
    date = new Date(date);
  } else {
    date = new Date(date.getTime());
  }
  var year = '' + date.getFullYear();
  var month =('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  var hour = ('0' + date.getHours()).slice(-2);
  var minute = ('0' + date.getMinutes()).slice(-2);
  var second = ('0' + date.getSeconds()).slice(-2);

  const strAry: string[] = format.split('');
  for (let i: number = strAry.length - 1; i >= 0; i--) {
    switch (strAry[i]) {
      case 's':
        strAry[i] = second.length === 0 ? '' : second.slice(-1);
        second = second.slice(0, -1);
        break;
      case 'm':
        strAry[i] = minute.length === 0 ? '' : minute.slice(-1);
        minute = minute.slice(0, -1);
        break;
      case 'h':
        strAry[i] = hour.length === 0 ? '' : hour.slice(-1);
        hour = hour.slice(0, -1);
        break;
      case 'd':
        strAry[i] = day.length === 0 ? '' : day.slice(-1);
        day = day.slice(0, -1);
        break;
      case 'M':
        strAry[i] = month.length === 0 ? '' : month.slice(-1);
        month = month.slice(0, -1);
        break;
      case 'y':
        strAry[i] = year.length === 0 ? '' : year.slice(-1);
        year = year.slice(0, -1);
        break;
    }
  }
  return strAry.join('');
}
