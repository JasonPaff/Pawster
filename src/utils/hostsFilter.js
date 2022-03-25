export default function hostsFilter(hosts, has_house, has_fenced_yard, doesnt_own_dog, doesnt_own_cat, doesBoarding, doesHouseSitting, doesDropInVisits, doesDayCare, doesDogWalking) {

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
    
    if (doesBoarding !== false) {
        hosts = hosts.filter((host) => {
            return host.doesBoarding === true
        })
    }

    if (doesHouseSitting !== false) {
        hosts = hosts.filter((host) => {
            return host.doesHouseSitting === true
        })
    }

    if (doesDropInVisits !== false) {
        hosts = hosts.filter((host) => {
            return host.doesDropInVisits === true
        })
    }

    if (doesDayCare !== false) {
        hosts = hosts.filter((host) => {
            return host.doesDayCare === true
        })
    }

    if (doesDogWalking !== false) {
        hosts = hosts.filter((host) => {
            return host.doesDogWalking === true
        })
    }



    return hosts
}