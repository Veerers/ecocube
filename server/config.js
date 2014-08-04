/*jslint node:true*/
module.exports = {
    mongo: process.env.ECOCUBE_MONGO || 'ecocube',
    port: process.env.ECOCUBE_PORT || process.env.PORT || 3000
};
