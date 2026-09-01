import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


// Register
const registerUser = asyncHandler(async (req, res) => {
    // 1) get user details from frontend
    const { fullName, email, username, password } = req.body

    // 2) Validation - not empty
    if (!fullName || !fullName.trim()) {
        throw new ApiError(400, "fullName is required")
    }
    else if (!username || !username.trim()) {
        throw new ApiError(400, "username is required")
    }
    else if (!email || !email.trim()) {
        throw new ApiError(400, "email is required")
    }
    else if (!password || password.length < 6) {
        throw new ApiError(400, "password must be at least 6 characters")
    }

    // 3) check if user already exists or not:
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    // 4) create user object put into DB
    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase()
    })

    // 5) remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    
    // 6) check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // 7) return response
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered Successfully")
    )
});




export {registerUser}

