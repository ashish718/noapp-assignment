let db = require('../config/database.js')
let contactDetail = require('../models/contactSchema')

module.exports.saveContact = async (arr) =>{
  try {
    let contactPromise = await arr.map(async (item, i) => {
      contactDetail.findOne({$and:[{phone:item.phone},{email:item.email}]}, function (err, data) {
            if (data) {
              item.updated_at = Date()
              console.log('contact found in DB');
              return contactDetail.findOneAndUpdate({$and:[{phone:item.phone},{email:item.email}]}, {"$set":item}, { returnNewDocument: true })
                .then(updatedDocument => {
                    console.log(`Successfully updated document:`, updatedDocument)
                    return updatedDocument
                })
                .catch(err => { return err;})
            } else {
              console.log('contact !found in DB');
              item.created_at = Date()
              item.updated_at = Date()
              const contactData = new contactDetail(item);
              console.log(contactData);
              contactData.save(function (err, data) {
                if (!err) {
                  console.log(`data store to DB`, data);
                  return data;
                } else {
                  console.log(err);
                  return err
                }
              });
            }
      });
    });
  return Promise.all(contactPromise);
  } catch (e) {
    return e;
  }
}

module.exports.fetchContact = async() => {
  try {
    return contactDetail.find({}, (err, result) => {
      if (err) {
        return err;
      }
      console.log(result);
      return result;
    });
  } catch (e) {
    return e;
  }
}
