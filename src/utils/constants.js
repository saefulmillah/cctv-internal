export const HKTOLL_URL = "http://119.252.164.226:6660/";
export const SSL_HKTOLL_URL = "https://apps.hk-opt.com/";
export const ANT_URL = "http://119.252.164.226:5021/";
export const LOC_ANT_URL = "http://192.168.66.24:5080/";
export const SSL_ANT_URL = "https://broadcast1.hk-opt.com/";
export const API_URL = "http://localhost:3330/";
const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
const d = new Date()
let bulan = month[d.getMonth()]
let tahun = d.getFullYear()
export const MonthYear = bulan + ' ' + tahun 