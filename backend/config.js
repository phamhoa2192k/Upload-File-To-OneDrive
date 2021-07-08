const msalConfig = {
	auth: {
		clientId: process.env.OAUTH_APP_ID,
		authority: process.env.OAUTH_AUTHORITY,
		clientSecret: process.env.OAUTH_APP_SECRET
	},
	system: {
		loggerOptions: {
			loggerCallback(loglevel, message, containsPii) {
				console.log(message);
			},
			piiLoggingEnabled: false,
			logLevel: msal.LogLevel.Verbose,
		}
	}
};

module.exports = msalConfig