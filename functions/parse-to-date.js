function parse(y, m, d, h, mm, s) {
  var yy = y + (y == 1 ? " ano" : " anos");
  var me = m + (m == 1 ? " mês" : " meses");
  var dd = d + (d == 1 ? " dia" : " dias");
  var hh = h + (h == 1 ? " hora" : " horas");
  var mmm = mm + (mm == 1 ? " minuto" : " minutos");
  var ss = s + (s == 1 ? " segundo" : " segundos");

  if (!y) {
    yy = "";
    if (!m) {
      me = "";

      if (!d) {
        dd = "";

        if (!h) {
          hh = "";

          if (!mm) {
            mmm = "";

            if (!s) {
              ss = "";
            }
          }
        }
      }
    }
  }

  const parse_array = [yy, me, dd, hh, mmm, ss];

  return parse_array.filter(i => i.trim() !== "").join(", ");
}

function parseMs(ms) {
  
  const moment = require('moment-timezone')

const hora_atual = moment(Date.now()).tz('America/Sao_Paulo')

const data = moment(ms).tz('America/Sao_Paulo')

const diferenca = hora_atual.diff(data)

const time = moment.duration(diferenca)._data
  
  var y = time.years
  var m = time.months
  var d = time.days
  var h = time.hours
  var mm = time.minutes
  var s = time.seconds
  
  var yy = y + (y == 1 ? " ano" : " anos");
  var me = m + (m == 1 ? " mês" : " meses");
  var dd = d + (d == 1 ? " dia" : " dias");
  var hh = h + (h == 1 ? " hora" : " horas");
  var mmm = mm + (mm == 1 ? " minuto" : " minutos");
  var ss = s + (s == 1 ? " segundo" : " segundos");

  if (!y) {
    yy = "";
    if (!m) {
      me = "";

      if (!d) {
        dd = "";

        if (!h) {
          hh = "";

          if (!mm) {
            mmm = "";

            if (!s) {
              ss = "";
            }
          }
        }
      }
    }
  }

  const parse_array = [yy, me, dd, hh, mmm, ss];

  return parse_array.filter(i => i.trim() !== "").join(", ");
}

function parseDate(ms){
  const moment = require('moment-timezone')
  moment.locale('pt-br')
  
  
  const res = moment(ms).tz('America/Sao_Paulo').format('LLLL')

  return res
  }


module.exports = { parse, parseMs, parseDate };
