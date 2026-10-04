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