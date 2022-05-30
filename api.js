import axios from "axios";
import { cookie } from "./config.js";
import { jsonText2Obj } from "./utils.js";
import fetch from "node-fetch"

export async function getChapters() {
    const res = await axios({
        method: "POST",
        url: "http://10.16.14.2/ctas/ajaxpro/CExam.CPractice,App_Web_tzfdzrj8.ashx",
        headers: {
            "Cookie": cookie,
            "X-AjaxPro-Method": "GetJSONChapterList",
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Length": "0",
            "Content-Type": "text/plain; charset=UTF-8",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53"
        }
    })
    return jsonText2Obj(res.data)
}

export async function getSubject(chapter, index) {
    const res = await fetch("http://10.16.14.2/ctas/ajaxpro/CExam.CPractice,App_Web_tzfdzrj8.ashx", {
        method: "POST",
        headers: {
            "Cookie": cookie,
            "X-AjaxPro-Method": "GetJSONTest",
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Length": "0",
            "Content-Type": "text/plain; charset=UTF-8",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53"
        },
        body: JSON.stringify({
            strTestParam: `<cTest><cProgram>${chapter}</cProgram><cQuestionIndex>${index}</cQuestionIndex></cTest>`
        })
    })
    const data = await res.text()
    return jsonText2Obj(data)
}

export async function answer(id, answer) {
    // 判断正误
    const res = await fetch("http://10.16.14.2/ctas/ajaxpro/CExam.CPractice,App_Web_tzfdzrj8.ashx", {
        method: "POST",
        headers: {
            "Cookie": cookie,
            "X-AjaxPro-Method": "IsOrNotTrue",
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Length": "0",
            "Content-Type": "text/plain; charset=UTF-8",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53"
        },
        body: JSON.stringify({
            strTestParam: `<cTestParam><cQuestion>${id}</cQuestion><cUserAnswer>${answer}</cUserAnswer></cTestParam>`
        })
    })
    const data = await res.text()
    console.log(data)
    const trueAnswer = data.substring(0, 1) == "1"
    if (!trueAnswer) {
        console.log("题目" + id + "的答案不对呢，怎么会是呢")
    }
    // 打log
    const logRes = await fetch("http://10.16.14.2/ctas/ajaxpro/CExam.CPractice,App_Web_tzfdzrj8.ashx", {
        method: "POST",
        headers: {
            "Cookie": cookie,
            "X-AjaxPro-Method": "WriteLog",
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Length": "0",
            "Content-Type": "text/plain; charset=UTF-8",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53"
        },
        body: JSON.stringify({
            strTestParam: `<cTestParam><cQuestion>${id}</cQuestion><cUserAnswer>${answer}</cUserAnswer></cTestParam>`
        })
    })
    console.log(await logRes.text())
}