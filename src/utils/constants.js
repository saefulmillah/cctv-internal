export const HKTOLL_URL = "https://apps.hk-opt.com/";
export const ANT_URL = "http://192.168.66.24:5080/";
export const API_URL = "http://localhost:3330/";
const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
const d = new Date()
let bulan = month[d.getMonth()]
let tahun = d.getFullYear()
export const MonthYear = bulan + ' ' + tahun 