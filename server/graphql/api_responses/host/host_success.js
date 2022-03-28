module.exports.hostFoundSuccess = (host) => {
    return {
        success: true,
        message: `host account found for ${host.userId}`,
        host: host
    };
};

module.exports.hostsFoundSuccess = (hosts) => {
    return {
        success: true,
        message: `host accounts found`,
        hosts: hosts
    };
};

module.exports.hostCreatedSuccess = (host) => {
    return {
        success: true,
        message: `host account created for ${host.userId}`,
        host: host
    };
};

module.exports.hostUpdatedSuccess = (userId, host) => {
    return {
        success: true,
        message: `host account updated for ${userId}`,
        host: host
    };
};

module.exports.hostDeletedSuccess = (host) => {
    return {
        success: true,
        message: `host account for ${host.userId} deleted`,
        host: host
    };
};