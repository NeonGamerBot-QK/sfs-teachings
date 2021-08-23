const { writeFileSync, fstat } = require('fs');
var colors = require('colors')
/**
 *  @decrapted
 * @class
 */
module.exports = class Log extends require('events').EventEmitter {
    constructor(path) {
        super()
        this.path = path;
        this.filelogs = ''
        
        this.on('logcreate', (t,tt) => {
            console.log(t)
            this.filelogs += `\n${tt}\n`
            this.writeFile()
        })
       // setInterval(this.writeFile, 60 * 1000)
        this.execute()
    }
    writeFile() {
        qwriteFileSync(this.file, this.filelogs)
        this.emit('debug', `[DEBUG] wrote to ${this.path}`)
    }
    execute() {
        this?.emit('ready')
        console.log('LOGGER loaded', this.emit)
        this.file = this.path + `/${Date.now()}.log`
        writeFileSync(this.file, '')
        //this.writeFile()
    }
    log(text) {
        this?.emit('logcreate', '[LOG]'.green + ` ${text}`,`[LOG] ${text}`)
    }
    debug(text) {
        this?.emit('logcreate', `[DEBUG]`.white + ` ${text}`, `[DEBUG] ${text}`)
    }
    error = (err) => {
        err = require('util').inspect(err)
     this?.emit('logcreate', `[ERROR]`.red + ` ${err}`, `[ERROR]\n ${err}`)
    }
}