const mongoose = require('mongoose');
const {createHmac, randomBytes} = require('node:crypto');

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String
  },
  password: {
    type: String,
    required: true,
  },
  profileImageURL: {
    type: String,
    required: true,
    default: "https://api.dicebear.com/9.x/initials/svg?seed=Prashant%20Jha"
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User"
  }
});

userSchema.pre("save", function (next) {

  const user = this;
  if(!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({email});
  if(!user) throw new Error('User not found!');

  const salt = user.salt;
  const hashedPassword = user.password;

  const userProvidedHash = createHmac("sha256", salt).update(password).digest("hex");

  if(hashedPassword !== userProvidedHash) throw new Error('Incorrect Password!');

  return {...user, password:undefined, salt:undefined};

})


const User = mongoose.model('user', userSchema);

module.exports = User;