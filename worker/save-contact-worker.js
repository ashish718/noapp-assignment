const {parentPort} = require('worker_threads')
let {saveContact} = require('../service/contactService')


parentPort.on('message', async(data)=> {
  return new Promise(resolve =>{
    resolve(saveContact(data))
  });
})
