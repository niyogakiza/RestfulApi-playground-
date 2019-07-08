// Dependencies
const fs = require('fs')
const path = require('path')

// Container module
const lib = {}

//base directory of the data folder
lib.basedir = path.join(__dirname, '/../.data/')

// write data to file
lib.create = (dir, file, data, callback) => {
  // Open the file for writing
  fs.open(lib.basedir + dir + '/' + 'newFile.json', 'wx', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      const stringData = JSON.stringify(data)
      // write to file and close it
      fs.writeFile(fileDescriptor, stringData, err => {
        if (!err) {
          fs.close(fileDescriptor, err => {
            if (!err) {
              callback('Error closing an new file')
            } else {
              callback(false)
            }
          })
        } else {
          callback('Error writing to new file')
        }
      })
    } else {
      callback('Could not create new file, it may already exist')
    }
  })
}

// Read data from the file
lib.read = (dir, file, callback) => {
  fs.readFile(lib.basedir + dir + '/' + file + '.json', 'utf8', (err, data) => {
    callback(err, data)
  })
}

// update data inside the file
lib.update = (dir, file, data, callback) => {
  // open the file
  fs.open(lib.basedir + dir + '/' + file + '.json', 'r+', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      const stringData = JSON.stringify(data)
      // truncate the file
      fs.truncate(fileDescriptor, err => {
        if (!err) {
          // write to the file and close it
          fs.writeFile(fileDescriptor, stringData, err => {
            if (!err) {
              fs.close(fileDescriptor, err => {
                if (!err) {
                  callback(false)
                } else {
                  callback('Error closing existing file')
                }
              })
            } else {
              callback('Error writing to existing file')
            }
          })
        } else {
          callback('Error truncating file')
        }
      })
    } else {
      callback('Could not open the file for updating, it may not exist yet')
    }
  })
}

// Delete a file
lib.delete = (dir, file, callback) => {
  // unlink the file
  fs.unlink(lib.basedir + dir + '/' + file + '.json', err => {
    if (!err) {
      callback(false)
    } else {
      callback(err)
    }
  })
}

module.exports = lib
