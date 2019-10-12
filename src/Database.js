const fs = require('fs')
const showdown = require('showdown')

class Database {
    constructor(filePath) {
        this.filePath = filePath
        // Load file
        const dbjson = fs.readFile(filePath, (err, data) => {
            if(err) throw err;
            this.data = JSON.parse(data)
        })
        this.converter = new showdown.Converter()
    }

    Save(filePath) {
        const dbjson = JSON.stringify(this.data)
        fs.writeFile(filePath, dbjson, (err) => {
            if(err) throw err;
            return true
        })
    }

    eval(sentence) {
        return eval(sentence)
    }

    GetLibraryStatus() {
        const details = []
        for(let i = 0; i < this.data.library.details.length; i++) {
            const library = {
                name: this.data.library.details[i].name,
                notes: {
                    total: this.data.library.details[i].notes.total
                }
            }
            details.push(library)
        }
        return {
            total: this.data.library.total,
            details: details
        }
    }

    CreateLibrary(name) {
        const index = this.data.library.details.push({
            name: name,
            notes: {
                total: 0,
                details: []
            }
        }) - 1

        this.data.library.total+=1
        this.Save(this.filePath)
        return true
    }

    GetNoteStatus(libraryID){
        const total = this.data.library.details[libraryID].notes.total
        const details = this.data.library.details[libraryID].notes.details
        let status = {
                total: total,
                details: []
        }
        for(let i = 0; i < details.length; i++) {
            const noteStatus = {
                id: details[i].id,
                title: details[i].title
            }
            status.details.push(noteStatus)
        }

        return status
        
    }
    GetNoteContent(libraryID, noteID) {
        let content = ''
        content = this.data.library.details[libraryID].notes.details[noteID]
        return content
    }

    CreateNote(opts) {
        /**
         * opts(eg.)=
         * {
         *     libraryID: 0,
         *     title: 'mike and me',
         *     content: '# Mike is my best friend.'
         * }
         */
        const index = this.data.library.details[opts.libraryID].notes.details.push({
            title: opts.title,
            content: opts.content
        }) - 1
        this.data.library.details[opts.libraryID].notes[index].id = index
        this.data.library.details[opts.libraryID].notes.total += 1
        this.Save(this.filePath)

        return true
    }

    EditNote(opts) {
        // 
    }
}

module.exports = Database