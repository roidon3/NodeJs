const { Schema ,model } = require("mongoose");
const{createHmac,randomBytes}=require("crypto")
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImgUrl:{
        type:String,
        default:"/images/userAvatar.png"
    },
    role:{
        type:String,
        enum:["Admin","user"],
        default:"user"
    }
  },
  { timestamps: true },
);
userSchema.pre("save", async function () {

    const user = this;

    if (!user.isModified("password")) {
        return;
    }
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;
});

const User = model("user", userSchema);

module.exports = User;

// Hashing: Transforms a password into a one-way value.
// Salt: A random, per-password value that makes identical passwords produce different hashes.
// Why store the salt? So we can recompute the hash during signin.
// Does the salt need to be secret? No.
// Does the salt replace password hashing? No — it's used alongside the hashing algorithm.