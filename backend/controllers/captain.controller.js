import { BlacklistToken } from "../models/blacklistToken.model.js";
import { Captain } from "../models/captain.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshToken = async(captainId)=>{
    try {
        const captain = await Captain.findById(captainId)
        const accessToken = await captain.generateAccessToken()
        const refreshToken = await captain.generateRefreshToken()

        captain.refreshToken=refreshToken
        await captain.save({validateBeforeSave:false})

        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,"error occur while generating access and refrshtoken")
    }
}

const registerCaptain = asyncHandler(async (req, res) => {
    
    const { username, email, password, status, vehicle, location } = req.body;

    if ([email, username, password, status, vehicle, location].some(field => !field || (typeof field === "string" && field.trim() === ""))) {
        throw new ApiError(400, "All fields are required");
    }
    
    
    
    const existingCaptain = await Captain.findOne({ 
        $or: [{ email: email.toLowerCase() }, { username }]
    });
    
    if (existingCaptain) {
        throw new ApiError(400, "Captain with this email or username already exists");
    }
    

    const captain = await Captain.create({
        email,
        username: username.toLowerCase(),
        password,
        status,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        },
        location: {
            lat: location.lat,
            lng: location.lng
        }
    });

    console.log("res",captain);
    
    const createdCaptain=await Captain.findById(captain._id).select(
        "-password -refreshToken"
    )
    if(!createdCaptain)
    {
        throw new ApiError(500,"something went wrong while creating captain")
    }
    
    return res.status(201).json(
        new ApiResponse(200,createdCaptain,"captain register successfully")
    )

});

const loginCaptain=asyncHandler(async(req,res)=>{

    const {email,password}=req.body

    if(!email )
    {
        throw new ApiError(400,"Email are required")
    }

    if(!password)
    {
        throw new ApiError(400,"Password is required")
    }

    const captain=await Captain.findOne({email})

    if(!captain)
    {
        throw new ApiError(404,"captain does not exist")
    }

    const validPassword=captain.isPasswordCorrect(password)

    if(!validPassword)
    {
        throw new ApiError(402,"incorrect password")
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(captain._id)

    const loggedinCaptain=await Captain.findById(captain._id).select(
        "-password -refreshToken"
    )

    const option={
        httpOnly:true,
        secure:true
    }

    return res
        .status(200)
        .cookie("accessToken",accessToken,option)
        .cookie("refreshToken",refreshToken,option)
        .json(
            new ApiResponse(
                200,
                {
                    captain:loggedinCaptain,accessToken,refreshToken
                },
                "user loggedin succesfully"
            )
        )



})

const logoutCaptain=asyncHandler(async(req,res)=>{

    const option={
        httpOnly:true,
        secure:true
    }
    
    const accessToken=req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ","")

    await BlacklistToken.create({token:accessToken})


    return  res
    .status(200)
    .clearCookie("accessToken",option)
    .clearCookie("refreshToken",option)
    .json(new ApiResponse(200,{},"captain logout successfully"))
})

const getCaptainProfile=asyncHandler(async(req,res)=>{
    
    return res
        .status(200)
        .json(
            new ApiResponse(200,req.captain,"current used fetched successfully")
        )  
})

export { registerCaptain,generateAccessAndRefreshToken,loginCaptain,logoutCaptain,getCaptainProfile};
