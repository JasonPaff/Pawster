
export default function hostsFilter(
    hosts, doesBoarding, doesHouseSitting, doesDropInVisits, doesDayCare, doesDogWalking,
    canHostMultiplePets, canHostUnspayedFemales, hasChildren, hasOtherPets, isHomeFullTime,
    isSmoking, canHostSmallPet, canHostMediumPet, canHostLargePet, canHostGiantPet, doesCat, doesDog
    ) {
        
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
    
    if (canHostMultiplePets !== false) {
    hosts = hosts.filter((host) => {
        return host.canHostMultiplePets === true
        })
    }

    if (canHostUnspayedFemales !== false) {
        hosts = hosts.filter((host) => {
            return host.canHostUnspayedFemales === true
        })
    }

    if (hasChildren !== false) {
        hosts = hosts.filter((host) => {
            return host.hasChildren === true
        })
    }

    if (hasOtherPets !== false) {
        hosts = hosts.filter((host) => {
            return host.hasOtherPets === true
        })
    }

    if (isHomeFullTime !== false) {
        hosts = hosts.filter((host) => {
            return host.isHomeFullTime === true
        })
    }

    if (isSmoking !== false) {
        hosts = hosts.filter((host) => {
            return host.isSmoking === true
        })
    }

    if (canHostSmallPet !== false) {
        hosts = hosts.filter((host) => {
            return host.canHostSmallPet === true
        })
    }

    if (canHostMediumPet !== false) {
        hosts = hosts.filter((host) => {
            return host.canHostMediumPet === true
        })
    }

    if (canHostLargePet !== false) {
        hosts = hosts.filter((host) => {
            return host.canHostLargePet === true
        })
    }

    if (canHostGiantPet !== false) {
        hosts = hosts.filter((host) => {
            return host.canHostGiantPet === true
        })
    }

    if (doesCat !== false) {
        hosts = hosts.filter((host) => {
            return host.doesCat === true
        })
    }

    if (doesDog !== false) {
        hosts = hosts.filter((host) => {
            return host.doesDog === true
        })
    }

    return hosts
}

