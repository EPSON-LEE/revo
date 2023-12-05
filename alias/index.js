const path = require('path')
const moduleAlias = require('module-alias')

moduleAlias.addAliases({
    '@src': path.join(__dirname, '../src'),
    '@utils': path.join(__dirname, '../src/utils'),
    '@config': path.join(__dirname,  '../config'),
    '@modules': path.join(__dirname,  '../src/modules'),
})

moduleAlias()