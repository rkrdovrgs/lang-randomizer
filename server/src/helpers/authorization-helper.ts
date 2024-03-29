import * as jwt from 'express-jwt';
import * as jwksRsa from 'jwks-rsa';

// Authentication middleware. When used, the
// access token must exist and be verified against
// the Auth0 JSON Web Key Set
export const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://rkrdovrgs.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'https://rkrdovrgs.auth0.com/api/v2/',
    issuer: `https://rkrdovrgs.auth0.com/`,
    algorithms: ['RS256']
});