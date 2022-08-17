async function load(author, data, type) {
console.log('Type is', type);
console.log(`Data:
${JSON.stringify(data)}

Author: ${author}`)
}
module.exports.load = load;