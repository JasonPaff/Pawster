module.exports.hostFoundSuccess = (host) => {
    return {
        success: true,
        message: `host account found for ${host.userId}`,
        host: host
    };
};

module.exports.hostCreatedSuccess = (host) => {
    return {
        success: true,
        message: `host account created for ${host.userId}`,
        host: host
    };
};

module.exports.hostUpdatedSuccess = (host) => {
    return {
        success: true,
        message: `host account updated for ${host.userId}`,
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