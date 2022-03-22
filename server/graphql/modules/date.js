const {createModule, gql} = require('graphql-modules');

module.exports.dateModule = createModule({
    id: 'date_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            scalar Date
        `
    ]
});