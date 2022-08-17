var conf = require('./config.json');
var viz = require('viz-js-lib');
viz.config.set('websocket',conf.api_node);

async function getOpsInBlock(bn) {
    return await viz.api.getOpsInBlockAsync(bn, false);
  }

  async function getProps() {
      return await viz.api.getDynamicGlobalPropertiesAsync();
      }

      async function getConfig() {
        return await viz.api.getConfigAsync();
        }
  
    async function getAccount(login) {
try {
    let res = await viz.api.getAccountsAsync([login]);
    if (Object.keys(res).length > 0) {
        return res[0];
    } else {
        return false;
    }
} catch(e) {
    return false;
}
        }
    
async function getCustomProtocolAccount(account, custom_protocol_id) {
return await viz.api.getAccountAsync(account, custom_protocol_id);
}

async function lookupAccounts(curr_acc) {
    return await viz.api.lookupAccountsAsync(curr_acc, 100);
}

async function getAccounts(accs) {
    return await viz.api.getAccountsAsync(accs);
}

async function send(operations, regular_wif) {
try {
    return await viz.broadcast.sendAsync({extensions: [], operations}, [regular_wif]);
} catch(e) {
    console.error(e);
    console.log('Операции: ', JSON.stringify(operations));
}
}

async function wifToPublic(key) {
    return viz.auth.wifToPublic(key);
}

async function workerVote(num, percent, login, key) {
    try {
      let result = await viz.broadcast.committeeVoteRequestAsync(key, login, num, percent);
return {status: "ok", data: result};
    } catch(e) {
    console.log(e);
    return {status: "error", data: e};
    }
    }
    
    async function verifyData(data, signature, VIZPUBKEY) {
        return viz.auth.signature.verifyData(data, viz.auth.signature.fromHex(signature),VIZPUBKEY);
    }
    
    async function getSubscriptionStatus(subscriber, account) {
        let active = false;
        try {
        let approveSubscribe = await viz.api.getPaidSubscriptionStatusAsync(subscriber, account);
    active = approveSubscribe.active;
        } catch(e) {
          console.log(JSON.stringify(e));
        }
    return active;    
    }

async function sendJson(wif, login, id, json) {
    return await viz.broadcast.customAsync(wif, [], [login], id, json);
}

async function award(wif, initiator, receiver, percent, memo, beneficiaries = []) {
var energy=percent * 100;
energy = parseInt(energy);
return await viz.broadcast.awardAsync(wif,initiator,receiver,energy,0,memo,beneficiaries);
}

async function getBlockSignature(block) {
    var b = await viz.api.getBlockAsync(block);
    if(b && b.witness_signature) {
        return b.witness_signature;
    } 
    throw "unable to retrieve signature for block " + block;
}

async function sendReblog(account, wif, author, block) {
    let data = {};
    let custom_data = await getCustomProtocolAccount(account, 'V');
    data.p =         custom_data.custom_sequence_block_num;
    data.d = {};
            data.d.t = '';
            data.d.s = `viz://@${author}/${block}`;
            await sendJson(wif, account, 'V', JSON.stringify(data));
}

module.exports.getOpsInBlock = getOpsInBlock;
module.exports.getProps = getProps;      
module.exports.getConfig = getConfig;
module.exports.getAccount = getAccount;
module.exports.getCustomProtocolAccount = getCustomProtocolAccount;
module.exports.lookupAccounts = lookupAccounts;
module.exports.getAccounts = getAccounts;
module.exports.send = send;
module.exports.wifToPublic = wifToPublic;
module.exports.workerVote = workerVote;
module.exports.verifyData = verifyData;
module.exports.getSubscriptionStatus = getSubscriptionStatus;
module.exports.sendJson = sendJson;
module.exports.award = award;
module.exports.sendReblog = sendReblog;