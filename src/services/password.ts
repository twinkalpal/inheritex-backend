import * as bcrypt from "bcryptjs"
const saltRounds = 10;
const hashPassword=async (password:string)=>{
    const hashedPassword= await bcrypt.hash(password,saltRounds)
    return hashedPassword;
}

const matchPassword=async (password:string,comparePassword:string)=>{
    return await bcrypt.compare(password,comparePassword)
}
export {hashPassword,matchPassword}