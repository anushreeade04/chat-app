


// import bcrypt from "bcryptjs";
// import generateToken from "../lib/utils.js";
// import User from "../models/User.js";
// import cloudinary from "../lib/cloudinary.js"


// //Signup a new user
// export const signup = async (req,res)=>{
//     const { fullName, email, password, bio} = req.body;

//     try {
//         if (!fullName || !email || !password || !bio){
//             return res.json({success:false, messgae : "Missing details"})
//         }

//         const user = User

//         if (user){
//             return res.json({success :  false, message : "Account already exists"})
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password.salt);

//         const newUser = await User.create({
//             fullName, email, password : hashedPassword, bio
//         });

//         const token = generateToken(newUser._id)

//         res.json({success:true, userData : newUser, token, message : "Account created successfully"})
//     } catch (error) {
//         console.log(error.message)
//         res.json({success: false, message: error.message})

        
//     }
// }

// //User login 

// export const login = async (req, res) => {
//     try {
//         const { email, password} = req.body;

//         const userData = await User.findOne({email})

//         const isPasswordcorrect = await bcrypt.compare(process, userData.password);

//         if (!isPasswordcorrect){
//             return res.json({success:false, message : "Invalid credentials"})
//         }

//         const token = generateToken(newUser._id)

//         res.json({success:true, userData, token, message : "Account created successfully"})
//     } catch (error) {
//         console.log(error.message);
//         res.json({success:false, message: error.message})
//     }
    
// }


// //To update user profile details

// export const updateProfile = async(req, res)=>{
//     try {
//         const {profilePic, bio, fullName} = req.body;

//         const userId = req.user._id;

//         let updatedUser;

//         if(!profilePic){
//             updatedUser=await User.findByIdAndUpdate(userId, {bio, fullName}, {new: true})
//         }
//         else{
//             const upload = await cloudinary.uploader.upload(profilePic);

//             updatedUser = await User.findByIdAndUpdate(userId, {profilePic: upload.secure_url, bio, fullName}, {new:true});

//         }
//         res.json({success:true, user:updatedUser})
//     } catch(error){
//         console.log(error.message);
//         res.json({success:false, message:error.message});
//     }


// }

import bcrypt from "bcryptjs";
import generateToken from "../lib/utils.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";

// Signup a new user
export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;

    try {
        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Missing details" });
        }

        // Fix: this was always truthy
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "Account already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); // Fix: was password.salt (wrong)

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            bio
        });

        const token = generateToken(newUser._id);

        res.json({
            success: true,
            userData: newUser,
            token,
            message: "Account created successfully"
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// User login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Fix: wrong arguments
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(user._id);

        res.json({
            success: true,
            userData: user,
            token,
            message: "Logged in successfully"
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Update profile
export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullName } = req.body;
        const userId = req.user._id;

        let updatedUser;

        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { bio, fullName },
                { new: true }
            );
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    profilePic: upload.secure_url,
                    bio,
                    fullName
                },
                { new: true }
            );
        }

        res.json({ success: true, user: updatedUser });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
