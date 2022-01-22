import { Strategy as GitHubStrategy } from "passport-github2";
import passport from "passport";
import express from "express";

const app = express.Router();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
      callbackURL: "http://127.0.0.1:3000/auth/github/callback",
    },
    function (accessToken: string, refreshToken: string, profile: { id: number }, done: (err: Error, user: User): void) {
      User.findOrCreate({ githubId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  function (req, res) {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  }
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

export default app;
