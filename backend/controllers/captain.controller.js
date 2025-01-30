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
    
    
    
    const existingCaptain = await Captain.findOne({ $or: [{ email }, { username }] });

    if (existingCaptain) {
        throw new Error("Captain with this email or username already exists");
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

export { registerCaptain,generateAccessAndRefreshToken};
