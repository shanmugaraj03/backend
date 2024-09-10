import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Login = (req, res) => {
  const userLoggingIn = req.body;

  User.findOne({ email: userLoggingIn.email }).then((dbUser) => {
    if (!dbUser) {
      return res.status(400).json({ message: "No Account Found with this Email" });
    }

    // Compare the password using bcrypt
    bcrypt.compare(userLoggingIn.password, dbUser.password).then((isCorrect) => {
      if (isCorrect) {
        const payload = {
          id: dbUser._id,
          email: dbUser.email,
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: "864000000" },
          (err, token) => {
            if (err) {
              return res.status(500).json({ message: "Token generation error" });
            }
            return res.status(200).json({
              message: "Logged In Successfully",
              token: token,
              email: userLoggingIn.email,
            });
          }
        );
      } else {
        return res.status(400).json({ message: "Incorrect Password" });
      }
    });
  }).catch((error) => {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Database error" });
  });
};

export default Login;
