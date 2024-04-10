const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/Users')
const { generateJWT } = require('../helpers/jwt')

const createUser = async( req, res = response ) => {
    try {
        const { email, password } = req.body
        
        let user = await User.findOne({email: email})
        if ( user ) {
            return res.status(400).json({
                ok: false,
                message: 'Este correo ya esta registrado',
            })
        }
        
        user = new User(req.body)
        
        // Encrypt password 
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync( password, salt )

        await user.save()

        // Generar JWT
        const token = await generateJWT( user.id, user.name);
    
        res.status(201).json({
            ok: true,
            message: 'Register success',
            uid: user.id,
            name: user.name,
            token: token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Por favor hable con el administrador',
        })      
    }
}

const loginUser = async( req, res = response ) => {
    try {
        const { email, password} = req.body
    
        const user = await User.findOne({email: email})
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'No hay ningún usuario registrado con este Email',
            })
        }
        
        // Verificar password
        const validatePassword = await bcrypt.compareSync( password, user.password)

        if (!validatePassword) {
            return res.status(400).json({
                ok: false,
                message: 'Password Incorrecto',
            })    
        }

        const token = await generateJWT( user.id, user.name);
        
        res.status(200).json({
            ok: true,
            message: 'Login',
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Por favor hable con el administrador',
        })   
    }
}

module.exports = {
    createUser,
    loginUser
}