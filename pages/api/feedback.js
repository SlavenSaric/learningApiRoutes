import fs from 'fs'
import path from 'path'

export function buildFeedBackPath(){
    return path.join(process.cwd(), 'data', 'feedback.json')
}

export function extractFeedback(filePath){
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData)
    return data
}

function handler(req, res){
    if(req.method === 'POST'){
        const email = req.body.email
        const text = req.body.text

        const newFeedBack = {
            id: new Date().toISOString(),
            email: email,
            text: text
        }
        //store in a data base
        const filePath = buildFeedBackPath()
        const data = extractFeedback(filePath)
        data.push(newFeedBack)
        fs.writeFileSync(filePath, JSON.stringify(data))
        res.status(201).json({message: 'Success!', feedback: newFeedBack})
        
    }else{
        const filePath = buildFeedBackPath()
        const data = extractFeedback(filePath)
        res.status(200).json({feedback: data})

    }
}

export default handler