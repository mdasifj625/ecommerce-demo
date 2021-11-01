const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
// Creating User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name.']
    },
    photo: {
        type: String,
        default: 'abc.jpg'
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    verified: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone no.'],
        unique: true
    },
    phoneOtp: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This only works on save and create
            validator: function (el) {
                return el === this.password;
            },
            message: 'Password must be same'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    confirmEmailToken: String,
    otpExpires: Date
});


// This middleware will run before saving the data to the database
userSchema.pre('save', async function (next) {
    // if password is not modified then skip encryption and continue with rest of the code
    if (!this.isModified('password')) return next();

    // Encrypt and and store the password
    this.password = await bcrypt.hash(this.password, 12);

    // Set the confirm password to undefined because we no longer need this
    this.passwordConfirm = undefined;

    next();

});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;

    next();
});

userSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
});


// Create instance method that will check password is correct or not
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

// Instance method the check if user has changed password after token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        // console.log(changedTimeStamp, JWTTimestamp);

        return JWTTimestamp < changedTimeStamp;
    }

    // False means password not changed
    return false;
};

// Instance method to generate random reset token
userSchema.methods.createRandomToken = function (type) {
    const randomToken = crypto.randomBytes(32).toString('hex');

    if (type === 'reset') {

        this.passwordResetToken = crypto
            .createHash('sha256')
            .update(randomToken)
            .digest('hex');

        this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    } else {
        this.confirmEmailToken = crypto
            .createHash('sha256')
            .update(randomToken)
            .digest('hex');
    }

    return randomToken;
};

// Create Model out of Schema
const User = mongoose.model('User', userSchema);

module.exports = User;