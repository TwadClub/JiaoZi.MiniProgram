function formatTime  (date,format) {
  let newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()
  const hour = newDate.getHours()
  const minute = newDate.getMinutes()
  const second = newDate.getSeconds()

  return [year, month, day].map(formatNumber).join(format) + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function phoneCheck(phone) {
  return new RegExp("^1[3|4|5|7|8][0-9]{9}$").test(phone);
} 

module.exports = {
  formatTime: formatTime,
  phoneCheck: phoneCheck
}
