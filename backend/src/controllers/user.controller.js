import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


        // Generate Access & RefereshToken, if password true, when loging
const generateAccessAndRefereshToken = async (userId) => {
    try {
        const user = await User.findById(userId)

        if (!user) {
            throw new ApiError(404, "User not found")
        }

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    }
    catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token")
    }
};

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

        // Loging
const loginUser = asyncHandler(async (req, res) => {
    // 1) get user details from frontend
    const { username, email, password } = req.body

    // 2) Validation - not empty
    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }
    else if (!password) {
        throw new ApiError(400, "password is required")
    }

    // 3) check if user already exists or not and find the user
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    // 4) password check
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password")
    }

    // 5) if password true, genarat access and referesh token
    const { accessToken, refreshToken } = await generateAccessAndRefereshToken(user._id)

    // 6) send cookie
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )
});

        // LogOut
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out Successfully"))
});

        // Change Current Password
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "oldPassword and newPassword are required")
    }
    if (newPassword.length < 6) {
        throw new ApiError(400, "newPassword must be at least 6 characters")
    }

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Password changed Successfully"
            )
        )
});

        // get Current User
const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "current user fetched successfully"))
});

        // update Account Details
const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body
    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))
});


export {
    registerUser, 
    loginUser,
    logoutUser,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails
}

