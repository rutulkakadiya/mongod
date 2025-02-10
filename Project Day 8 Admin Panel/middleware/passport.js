const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const schema = require("../model/adminSchema")

passport.use("local",
    new localStrategy({ usernameField: 'email' }, async (email, password, done) => {
        let admin = await schema.findOne({ email: email })

        if (!admin) {
            return (null, false)
        }

        if (admin.password == password) {
            return done(null, admin)
        } else {
            return done(null, false);
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (userId, done) => {
    let admin = await schema.findById(userId)
    done(null, admin);
})

passport.checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect("/");
    }
}

passport.AuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next()
}

module.exports = passport;