const conf = require("./config.json");
const methods = require("./methods");
require("./databases/@db.js").initialize({
    url: 'mongodb://localhost:27017',
    poolSize: 15
});
const helpers = require("./helpers");
const bdb = require("./databases/blocksdb");
const pdb = require("./databases/postsdb");
const LONG_DELAY = 12000;
const SHORT_DELAY = 3000;
const SUPER_LONG_DELAY = 1000 * 60 * 15;

async function processBlock(bn) {
    const block = await methods.getOpsInBlock(bn);
let ok_ops_count = 0;
    for(let tr of block) {
        const [op, opbody] = tr.op;
        switch(op) {
            case "custom":
            if (opbody.id === 'V') {
                let author = opbody.required_regular_auths[0];
                let data = JSON.parse(opbody.json);
                let text = data.t.t;
                if (data.t === 'p') {
                    text += `
${data.d.m}`;
                }
                let hashtags_pattern = /(|\b)#([^:;@#!.,?\r\n\t <>()\[\]]+)(|\b)/g;;
let tags =text.match(hashtags_pattern)
                .map(function(p){return p.substring(1, p.length)});
                const found = tags.some(r=> conf_tags.indexOf(r) >= 0);
if (found === true) {
await pdb.addPost(author, bn);
    let acc = await methods.getAccount(author);
if (acc !== false && conf.sandbox.type === 'shares' && parseFloat(acc.vesting_shares) > parseFloat(conf.sandbox.value) || conf.sandbox.type === 'whitelist' && conf.main.whitelist.indexOf(author) > -1 || conf.sandbox.allow === false && conf.main.whitelist.indexOf(author) > -1) {
await methods.sendReblog(conf.main.account, conf.main.regular_key, author, bn);
let modules = helpers.getModules();
if (typeof modules !== 'undefined') {
for (let name in modules) {
let module = modules[name];
if (module.indexOf('index.js') > -1) {
    const m = require(`${__dirname}/modules/${name}/index.js`);
    if (typeof m.load !== "undefined" && typeof m.load === "function") await m.load(author, data, 'main')
} // end if is yes index.js
} // end for modules.
} // end if yes modules.
} else if (acc !== false && conf.sandbox.allow === true && conf.sandbox.type === 'shares' && parseFloat(acc.vesting_shares) <= parseFloat(conf.sandbox.value) || conf.sandbox.allow === true && conf.sandbox.type === 'whitelist' && conf.main.whitelist.indexOf(author) === -1) {
    await methods.sendReblog(conf.sandbox.account, conf.sandbox.regular_key, author, bn);
}
} // end if found === true.
            }
            break;
                case "receive_award":
if (opbody.memo.indexOf('viz://@') > -1) {
    let post = opbody.memo.split('@');
let [author, block] = post.split('/');
let power = parseFloat(opbody.shares);
let content = await pdb.getPost(author, block);
if (content && Object.keys(content).length > 0) {
    power += content.power;
if (content.power === -1) return 0;
}

if (conf.popular.allow === true && power >= conf.popular.award_amount) {
    await methods.sendReblog(conf.popular.account, conf.popular.regular_key, author, block);
    await pdb.updatePost(author, block, -1);
    let modules = helpers.getModules();
    if (typeof modules !== 'undefined') {
    for (let name in modules) {
    let module = modules[name];
    if (module.indexOf('index.js') > -1) {
        const m = require(`${__dirname}/modules/${name}/index.js`);
        if (typeof m.load !== "undefined" && typeof m.load === "function") await m.load(author, data, 'popular')
    } // end if is yes index.js
    } // end for modules.
    } // end if yes modules.
} else {
    await pdb.updatePost(author, block, power);
}
}
break;
default:
                    //неизвестная команда
            }
        }
        return ok_ops_count;
    }

let PROPS = null;

let bn = 0;
let last_bn = 0;
let delay = SHORT_DELAY;

async function getNullTransfers() {
    PROPS = await methods.getProps();
            const block_n = await bdb.getBlock(PROPS.last_irreversible_block_num);
bn = block_n.last_block;

delay = SHORT_DELAY;
while (true) {
    try {
        if (bn > PROPS.last_irreversible_block_num) {
            // console.log("wait for next blocks" + delay / 1000);
            await helpers.sleep(delay);
            PROPS = await methods.getProps();
        } else {
            if(0 < await processBlock(bn)) {
                delay = SHORT_DELAY;
            } else {
                delay = LONG_DELAY;
            }
            bn++;
            await bdb.updateBlock(bn);
        }
    } catch (e) {
        console.log(e);
        await helpers.sleep(1000);
        }
    }
}

setInterval(() => {
    if(last_bn == bn) {

        try {
                process.exit(1);
        } catch(e) {
            process.exit(1);
        }
    }
    last_bn = bn;
}, SUPER_LONG_DELAY);

getNullTransfers()