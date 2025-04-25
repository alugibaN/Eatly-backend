import { editProfileData, getProfileData } from "@/controller/profile";
import { Router } from "express";

const profileRoter = Router()

profileRoter.get('/', getProfileData)
profileRoter.patch('/', editProfileData)
// profileRoter.delete('/', deletehProfile)


export default profileRoter