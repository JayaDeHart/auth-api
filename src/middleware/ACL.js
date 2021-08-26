//Take in a parameter to determine route's level of access
//Determine user's level of access
//Allow or Deny user access

module.exports = (capability) => {
    return (req, res, next) => {
        try {
            if (req.user.capabilities.includes(capability)) {
                next()
            } else {
                next('access denied')
            }
        } catch (e) {
            next('invalid login')
        }
    }
}