const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/Users')
const { generateJWT } = require('../helpers/jwt')

const createUser = async( req, res = response ) => {
    try {
        const { email, password } = req.body
        
        let user = await User.findOne({ email: email })

        if ( user ) {
            return res.status(400).json({
                status: 400,
                message: 'Este correo ya esta registrado',
            })
        }
        
        user = new User( req.body )
        
        // Encrypt password 
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync( password, salt )

        await user.save()

        // Generate JWT
        const token = await generateJWT( user.id, user.name );
    
        res.status(201).json({
            status: 201,
            message: 'Registro exitoso',
            user: {
                uid: user.id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                document: user.document,
                numberPhone: user.numberPhone,
                token: token
            },
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error interno de servidor',
        })      
    }
}

const loginUser = async( req, res = response ) => {
    try {
        const { email, password } = req.body
    
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: 'No hay ningún usuario registrado con este Email',
            })
        }
        
        // Verificar password
        const validatePassword = await bcrypt.compareSync( password, user.password )

        if (!validatePassword) {
            return res.status(400).json({
                status: 400,
                message: 'Contraseña incorrecta',
            })    
        }

        const token = await generateJWT( user.id, user.name );
        
        res.status(200).json({
            status: 200,
            message: 'Login exitoso',
            user: {
                uid: user.id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                document: user.document,
                numberPhone: user.numberPhone,
                token: token
            },
        })
        
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Por favor hable con el administrador',
        })   
    }
}

module.exports = {
    createUser,
    loginUser
}