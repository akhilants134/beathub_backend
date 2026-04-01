const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

/**
 * Phase 2: Schema & Middleware Implementation
 */

// Define the Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

/**
 * Pre-save Hook: Security Hook for Password Hashing
 * 
 * Logic:
 * 1. Checks if the password field has been modified or is new.
 * 2. If modified, hashes the password using bcrypt with a salt factor of 10.
 * 3. Handles errors and ensures consistent hashing.
 */
userSchema.pre('save', async function(next) {
  // Constraint 1: Regular function (needed for 'this' context pointing to the document)
  
  // Constraint 2: Efficiency - Only hash if password is modified or new
  // This prevents re-hashing an already hashed password during other updates.
  if (!this.isModified('password')) {
    // In some Mongoose versions, next is passed; in others (on async), it might be an options object.
    return (typeof next === 'function') ? next() : Promise.resolve();
  }

  try {
    // Constraint 3: Security - Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    // Constraint 4: Call next() to continue or return if async
    if (typeof next === 'function') next();
  } catch (error) {
    // Constraint 4: Error Handling
    if (typeof next === 'function') next(error);
    else throw error;
  }
});

// Create User model
const User = mongoose.model('User', userSchema);

/**
 * Phase 3: Logic Verification (Test Script)
 */
async function verifySecurityHook() {
  try {
    // Connect to database
    const connString = process.env.MONGO_URI || 'mongodb://localhost:27017/beathub_practice';
    await mongoose.connect(connString);
    console.log('Connected to MongoDB successfully.');

    // Cleanup existing test data
    await User.deleteMany({ email: 'test@innovate.com' });

    console.log('\n--- Test 1: New User (Password should be hashed) ---');
    const newUser = new User({
      username: 'InnovateDev',
      email: 'test@innovate.com',
      password: 'plaintext_password_123'
    });
    
    await newUser.save();
    console.log('User saved. Hashed Password:', newUser.password);
    const firstHash = newUser.password;
    if (firstHash.startsWith('$2b$')) {
        console.log('✅ Success: New password hashed.');
    }

    console.log('\n--- Test 2: Update Username (Password should NOT be re-hashed) ---');
    newUser.username = 'UpdatedInnovateDev';
    await newUser.save();
    console.log('Username updated. Password after update:', newUser.password);
    if (newUser.password === firstHash) {
        console.log('✅ Success: Password remains unchanged after username update.');
    } else {
        console.log('❌ Failure: Password was re-hashed unnecessarily!');
    }

    console.log('\n--- Test 3: Change Password (Password SHOULD be re-hashed) ---');
    const oldHash = newUser.password;
    newUser.password = 'new_plaintext_password_456';
    await newUser.save();
    console.log('Password changed. New Hashed Password:', newUser.password);
    if (newUser.password !== oldHash && newUser.password.startsWith('$2b$')) {
        console.log('✅ Success: New password has been hashed.');
    } else {
        console.log('❌ Failure: Password was not re-hashed.');
    }

    // Close connection
    await mongoose.connection.close();
    console.log('\nVerification complete. Database connection closed.');
  } catch (err) {
    console.error('\nError during verification:', err.message);
    process.exit(1);
  }
}

// Run the verification script
verifySecurityHook();
