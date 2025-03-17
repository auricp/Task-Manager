import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
    try {

        // protect this request and tell me the decision (should it be accepted or denied)
        // requested param means how many tokens we take away per request
        const decision = await aj.protect(req, { requested: 1})

        // logic for denying the request
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ error: 'Rate limit exceeded'});
            }

            if (decision.reason.isBot()) {
                return res.status(403).json({ error: 'Bot detected'});
            }
        }

        // otherwise go to the next step
        next();
    } catch (error) {
        console.log(`Arcjet Middleware Error ${error}`)
    }
}

export default arcjetMiddleware;