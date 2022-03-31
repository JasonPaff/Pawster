export default function classNameJoiner(...classes) {
    return classes.filter(Boolean).join(' ');
}