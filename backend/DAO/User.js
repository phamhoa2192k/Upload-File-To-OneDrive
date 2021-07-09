var mongoose = require('mongoose');

let url = process.env.MONGODB_URL

mongoose.connect(url);

var User = mongoose.model('user', {
	"authority": {
	  "type": "String"
	},
	"uniqueId": {
	  "type": "String"
	},
	"tenantId": {
	  "type": "String"
	},
	"scopes": {
	  "type": [
	    "String"
	  ]
	},
	"account": {
	  "homeAccountId": {
	    "type": "String"
	  },
	  "environment": {
	    "type": "String"
	  },
	  "tenantId": {
	    "type": "String"
	  },
	  "username": {
	    "type": "String"
	  },
	  "localAccountId": {
	    "type": "String"
	  },
	  "name": {
	    "type": "String"
	  },
	  "idTokenClaims": {
	    "aud": {
	      "type": "String"
	    },
	    "iss": {
	      "type": "String"
	    },
	    "iat": {
	      "type": "Number"
	    },
	    "nbf": {
	      "type": "Number"
	    },
	    "exp": {
	      "type": "Number"
	    },
	    "name": {
	      "type": "String"
	    },
	    "oid": {
	      "type": "String"
	    },
	    "preferred_username": {
	      "type": "String"
	    },
	    "rh": {
	      "type": "String"
	    },
	    "sub": {
	      "type": "String"
	    },
	    "tid": {
	      "type": "String"
	    },
	    "uti": {
	      "type": "String"
	    },
	    "ver": {
	      "type": "String"
	    }
	  }
	},
	"idToken": {
	  "type": "String"
	},
	"idTokenClaims": {
	  "aud": {
	    "type": "String"
	  },
	  "iss": {
	    "type": "String"
	  },
	  "iat": {
	    "type": "Number"
	  },
	  "nbf": {
	    "type": "Number"
	  },
	  "exp": {
	    "type": "Number"
	  },
	  "name": {
	    "type": "String"
	  },
	  "oid": {
	    "type": "String"
	  },
	  "preferred_username": {
	    "type": "String"
	  },
	  "rh": {
	    "type": "String"
	  },
	  "sub": {
	    "type": "String"
	  },
	  "tid": {
	    "type": "String"
	  },
	  "uti": {
	    "type": "String"
	  },
	  "ver": {
	    "type": "String"
	  }
	},
	"accessToken": {
	  "type": "String"
	},
	"fromCache": {
	  "type": "Boolean"
	},
	"expiresOn": {
	  "type": "Date"
	},
	"extExpiresOn": {
	  "type": "Date"
	},
	"familyId": {
	  "type": "String"
	},
	"tokenType": {
	  "type": "String"
	},
	"state": {
	  "type": "String"
	},
	"cloudGraphHostName": {
	  "type": "String"
	},
	"msGraphHost": {
	  "type": "String"
	}
      });

module.exports = User