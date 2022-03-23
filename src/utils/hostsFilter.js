export default function hostsFilter(hosts, has_house, has_fenced_yard, doesnt_own_dog, doesnt_own_cat) {

    if (has_house !== false) {
        hosts = hosts.filter((host) => {
            return host.has_house === true
        })
    }

    if (has_fenced_yard !== false) {
        hosts = hosts.filter((host) => {
            return host.has_fenced_yard === true
        })
    }

    if (doesnt_own_dog !== false) {
        hosts = hosts.filter((host) => {
            return host.doesnt_own_dog === true
        })
    }

    if (doesnt_own_cat !== false) {
        hosts = hosts.filter((host) => {
            return host.doesnt_own_cat === true
        })
    }

    return hosts
}