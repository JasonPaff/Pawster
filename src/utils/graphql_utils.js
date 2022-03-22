export default function getGqlString(doc) {
    return doc.loc && doc.loc.source.body;
}