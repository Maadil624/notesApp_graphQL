const { userLoginModel, addUserModal } = require('../dbmodels/userModels.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const rejisterController = async (parent, args) => {
    try {
        // console.log('req.body register', args)
        const { name, email, password } = args.input
        // validate
        if (!name) {
            return { sucess: false, message: "please provide the name" }
        }
        if (!password) {
            return { sucess: false, message: "please provide the password" }
        }
        if (!email) {
            return { sucess: false, message: "please provide the e-mail" }
        }
        // email validation of exixting
        const extuser = await userLoginModel.findOne({ email })
        // console.log("extuser", extuser)
        if (extuser) {
            return {
                sucess: true,
                message: "email is already there",
                extuser
            }
        }
        const newuser = {
            name: name,
            email: email,
            password: bcrypt.hashSync(password, 10)
            // :bcrypt.hashSync(password)
        }
        const user = await userLoginModel.create(newuser)
        // console.log("user", user)
        return {
            sucess: true,
            message: "user created sucessfully.....",
            user
        }
    } catch (err) {
        console.log('err', err)
        return {
            sucess: false,
            message: "user control error",
            err,
        }
    }
}

const loginController = async (parent, args) => {
    try {
        const { email, password } = args.input
        // console.log('req.body login', args)
        // console.log(email, password)
        if (!email && !password) {
            return {
                sucess: false,
                message: "provide the login details"
            }
        }
        let userDetails = await userLoginModel.findOne({ email })

        // console.log("userDetails ", userDetails)
        // console.log(admin)
        if (userDetails == null || !userDetails) {
            return {
                sucess: false,
                message: "email or password is wrong"
            }
        } else {
            // password validation using bcrypt compare
            let validpass = await bcrypt.compare(password, userDetails.password)
            // console.log('validpass', validpass)
            const user = await userDetails && validpass
            // console.log(user)

            if (!user) {
                return {
                    sucess: false,
                    message: "email or password is wrong.."
                }
            }
            if (user) {
                const token = jwt.sign({ id: userDetails._id }, "logindata", { expiresIn: "60m" })
                return {
                    sucess: true,
                    message: "Login sucessfull..",
                    userDetails,
                    token
                }
            }
        }
        // const token=signt(user.email)
    }
    catch (err) {
        console.log("error at login controller...", err)
    }
}

const verifyUser = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(400).json({
            status: "false",
            message: "no token provided"
        })
    }
    try {
        const decoded = jwt.verify(token, 'hello')
        next()
    } catch (err) {
        return res.status(200).json({
            status: "false",
            message: err.message
        })
    }
}

module.exports = {
    rejisterController,
    loginController,
    verifyUser
}