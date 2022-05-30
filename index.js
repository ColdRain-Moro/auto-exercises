import { answer, getSubject } from "./api.js"
import { start, end } from "./config.js"
import fs from "fs"
import { delay } from "./utils.js"

(async function() {
    const datas = []
    const data = fs.readFileSync("data.txt").toString()
    let lineNum = 0
    data.split("\n").forEach(line => {
        lineNum++
        if (lineNum % 2 != 0) {
            datas.push({ chapter: line.toLowerCase().replace("\r", "") })
        } else {
            const answerText = line.trim().toUpperCase()
            datas[datas.length - 1].answers = [...answerText]
        }
    })
    const startIndex = datas.findIndex(item => item.chapter == start.toLowerCase())
    const endIndex = datas.findIndex(item => item.chapter == end.toLowerCase())
    const chapters = datas.slice(startIndex, endIndex + 1)
    console.log(chapters)
    for (let chapter of chapters) {
        const { chapter: chapterName, answers } = chapter
        console.log(chapterName)
        for (let i in answers) {
            const data = await getSubject(chapterName, i)
            const id = data.CQuestion.CQuestionID
            console.log(`正在完成题目 ${chapterName} - ${id}...`)
            await answer(id, answers[i])
            await delay(1000)
        }
    }
    console.log("done")
}())