class Logger {
  static info(...messages) { // 34
    console.log('\x1b[34m[i] -', ...messages, '\x1b[0m');
  }

  static error(...messages) {
    console.log('\x1b[31m[!] -', ...messages, '\x1b[0m');
  }
  static warn(...messages) {
    console.log('\x1b[33m[!] -', ...messages, '\x1b[0m');
  }
  static done(...messages) {
    console.log('\x1b[32m[=] -', ...messages, '\x1b[0m');
  }
  static process(...messages) {
    console.log('\x1b[35m[%] -', ...messages, '\x1b[0m');
  }
  static fileInfo(id, name, sheets) {
    console.log('\x1b[35m------------------------------------------------------------------------\x1b[0m');
    console.log('\x1b[32m[-] - ID:      \x1b[34m', id, '\x1b[0m');
    console.log('\x1b[32m[-] - Filename:\x1b[34m', name, '\x1b[0m');
    console.log('\x1b[32m[-] - Sheets:  \x1b[34m', sheets, '\x1b[0m');
    console.log('\x1b[35m------------------------------------------------------------------------\x1b[0m');
  }
}

module.exports = Logger;
