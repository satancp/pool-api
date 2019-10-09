const SYSTEM_ERROR = {
    code: 10000,
    msg: 'Internal Server Error'
};

const PARAMETER_ERROR = {
    code: 10001,
    msg: 'Parameters Invalid'
};

const NO_ACCESS_TO_THIS_OPERATION = {
    code: 10002,
    msg: 'No Access To It'
};

const ACCOUNT_BANNED = {
    code: 10003,
    msg: 'Account Has Been Banned'
};

const USER_NOT_EXIST = {
    code: 10004,
    msg: 'This User Does Not Exist'
};

const LOGININFO_MISMATCH = {
    code: 10005,
    msg: 'Login Info Mismatch'
};

const SHOULD_LOGIN = {
    code: 10006,
    msg: 'You Should Login First'
};

const EMAIL_EXIST = {
    code: 10007,
    msg: 'Email Exists'
};

const ACCOUNT_RETRIEVE_FAILED = {
    code: 10008,
    msg: 'Failed To Retrieve Account Info'
};

const ACCOUNT_NEED_TOPUP = {
    code: 10009,
    msg: 'You Need Topup The Account'
};

const MOBILES_EXCEED_LIMIT = {
    code: 10010,
    msg: 'The Mobiles Exceed Limit'
};

const WAIT_FOR_MESSAGE = {
    code: 10011,
    msg: 'The Message Is Still On The Way, Please Try Again Later'
};

const GET_MESSAGE_FAILED = {
    code: 10012,
    msg: 'Failed To Get Message'
};

module.exports = {
    SYSTEM_ERROR,
    PARAMETER_ERROR,
    NO_ACCESS_TO_THIS_OPERATION,
    ACCOUNT_BANNED,
    USER_NOT_EXIST,
    LOGININFO_MISMATCH,
    SHOULD_LOGIN,
    EMAIL_EXIST,
    ACCOUNT_RETRIEVE_FAILED,
    ACCOUNT_NEED_TOPUP,
    MOBILES_EXCEED_LIMIT,
    WAIT_FOR_MESSAGE,
    GET_MESSAGE_FAILED
};
