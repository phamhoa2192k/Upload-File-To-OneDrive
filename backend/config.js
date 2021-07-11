const config = {
    auth: {
        clientId: process.env.OAUTH_APP_ID,
        authority: process.env.OAUTH_AUTHORITY,
        clientSecret: process.env.OAUTH_APP_SECRET
    },
    storage: {
        destination: function (req, file, cb) {
            cb(null, 'upload')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname)
        }
    }
}

module.exports = config