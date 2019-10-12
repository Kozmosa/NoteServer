const express = require('express')
const path = require('path')
const Database = require('./src/Database')
const showdown = require('showdown')

const app = express()
const Converter = new showdown.Converter()
let db = new Database(path.join(__dirname, './data/data.json'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/library/status', (req, res) => {
    // Status of libraries
    const result = db.GetLibraryStatus()
    console.log('Get library status, response: ' + result)
    res.json(result)
})

app.get('/api/library/create', (req, res) => {
    // Create library
    const name = req.query.name
    const result = db.CreateLibrary(name)
    res.json({
        code: 200,
        result: result
    })
})

app.get('/api/note/status', (req, res) => {
    // Status of notes
    const result = db.GetNoteStatus(req.query.libraryID)
    res.json({
        code: 200,
        msg: 'success',
        status: result
    })
})

app.get('/api/note/content', (req, res) => {
    let result = db.GetNoteContent(req.query.libraryID, req.query.noteID)
    console.log(result)
    if(req.query.type === 'markdown') {
        res.json({
            code: 200,
            msg: 'success',
            type: 'markdown',
            content: result.content
        })
        return 0
    }
    result.content = Converter.makeHtml(result.content)
    console.log(result)
    res.json({
        code: 200,
        msg: 'success',
        content: result
    })
})

app.get('/api/note/create', (req, res) => {
    // Create Note
    const opts = {
        libraryID: req.query.libraryID,
        title: req.query.title,
        content: req.query.content
    }

    const result = db.CreateNote(opts)
    if(result){
        res.json({
            code: 200,
            msg: 'success'
        })
    } else {
        res.json({
            code: 500,
            msg: 'failure'
        })
    }
})

app.get('/api/note/edit', (req, res) => {
    // Edit note
})

app.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/view.html'))
})

app.get('/edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/editor.html'))
})

console.log('Server initialize ok')

app.listen(8081, () => {
    console.log('Server running on port 8081.')
})