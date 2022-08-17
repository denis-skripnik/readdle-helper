const db = require('./@db.js');
const conf = require('../config.json');

async function getBlock(bn) {

    const client = await db.getClient();

    if (!client) {
        return;
    }

    try {

        const db = client.db(conf.db_name);

        let collection = db.collection('blocks');

        let query = {}

        let res = await collection.findOne(query);

        if (res) {
return res;
} else {
  res = {};
  res.last_block = bn;
  return res;
}
    } catch (err) {

return err;
    } finally {

        
    }
}

async function updateBlock(id) {

    const client = await db.getClient();

    if (!client) {
        return;
    }

    try {

        const db = client.db(conf.db_name);

        let collection = db.collection('blocks');

        let res = await collection.updateOne({}, {$set: {last_block: id}}, { upsert: true });

return res;
    } catch (err) {

        console.log(err);
    return err;
      } finally {


    }
}

module.exports.getBlock = getBlock;
module.exports.updateBlock = updateBlock;