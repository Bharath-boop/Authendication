import userModel from "../Model/user.js"
import auth from "../utils/auth.js"
import Auth from '../utils/auth.js'
const getAllUsers = async (req, res) => {
    try {
        const user = await userModel.find()
        res.status(200).send({
            message: "users data sessefully fatching",
            user
        })

    } catch (error) {
        res.status(500).send({
            message: "internal server error",
            error: error.message
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.params.id })
        res.status(200).send({
            message: "users data sessefully fatching",
            user
        })

    } catch (error) {
        res.status(500).send({
            message: "internal server error",
            error: error.message
        })
    }
}

const createUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })

        if (!user) {
            req.body.password = await Auth.createhash(req.body.password)
            let newUser = await userModel.create(req.body)
            res.status(200).send({
                message: "add data seccesfull"
            })
        }
        else {
            res.status(400).send({
                message: `this ${req.body.email} alreay exect`
            })

        }

    } catch (error) {
        res.status(500).send({
            message: `internal sever error`,
            error: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (user) {
            if (await auth.hashcompare(req.body.password, user.password)) {
                const token=await auth.gentoken({
                    name:user.name,
                    email:user.email,
                    role:user.role
                })
                res.status(200).send({
                    message: `Login sucessfull`,
                    token
                   
                })
            }
            else {
                res.status(400).send({
                    message: `Incorrect password`,

                })
            }

        }
        else {
            res.status(400).send({
                message: `this ${req.body.email} not exect`
            })
        }

    } catch (error) {
        res.status(500).send({
            message: `internal sever error`,
            error: error.message
        })
    }
}

export default {
    getAllUsers,
    getUserById,
    createUser,
    login
}