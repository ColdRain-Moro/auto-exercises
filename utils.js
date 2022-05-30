/**
 * 反序列化接口返回的json text
 * @param {string} jsonText 接口返回的json text
 * @returns {object} 反序列化后的对象
 */
export function jsonText2Obj(jsonText) {
    return JSON.parse(jsonText.substring(1, jsonText.length - 4).replace (/\s+/g,"").replace(/\\\"/g, "\""))
}

export async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function htmlDecode(str) {
    let s = '';
    if(str.length === 0) {
        return '';
    }
    s = str.replace(/&amp;/g, '&');
    s = s.replace(/&lt;/g,'<');
    s = s.replace(/&gt;/g,'>');
    s = s.replace(/&nbsp;/g,' ');
    s = s.replace(/&#39;/g,'\'');
    s = s.replace(/&quot;/g,'\"');
    return s;
}