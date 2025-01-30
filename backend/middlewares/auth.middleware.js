import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import jwt from 'jsonwebtoken'
import {User} from '../models/user.model.js'
import { BlacklistToken } from '../models/blacklistToken.model.js'
import { Captain } from '../models/captain.model.js'

export const verifyJWTuser=asyncHandler(async(req,_,next)=>{
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
    
        if(!token)
        {
            throw new ApiError(401,"unauthorize request")
        }
        
        const isblacklisted=await BlacklistToken.findOne({token})

        if(isblacklisted)
        {
            throw new ApiError(401,"unauthorize request")
        }

        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user)
        {
            throw new ApiError(401,"invalid accessToken")
        }
    
        req.user=user
        next()
    } catch (error) {
        throw new ApiError(401,error?.message)
    }
    
})

export const verifyJWTcaptain=asyncHandler(async(req,_,next)=>{
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
    
        if(!token)
        {
            throw new ApiError(401,"unauthorize request")
        }
        
        const isblacklisted=await BlacklistToken.findOne({token})

        if(isblacklisted)
        {
            throw new ApiError(401,"unauthorize request")
        }

        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const captain=await Captain.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!captain)
        {
            throw new ApiError(401,"invalid accessToken")
        }
    
        req.captain=captain
        next()
    } catch (error) {
        throw new ApiError(401,error?.message)
    }
    
})