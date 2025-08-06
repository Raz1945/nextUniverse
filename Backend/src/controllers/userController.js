import dotenv from 'dotenv';
dotenv.config({ path: './src/config/.env' }); 

import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/userSchema.js';
import Planet from '../models/userPlanetSchema.js';
import { createUserPlanet } from '../services/planetService.js';

// Crear un nuevo usuario
const register = async (req, res) => {
  try {
    const { userName, password, email } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Encriptar la contraseña
    const encryptedPassword = await hashPassword(password);

    // Crear un nuevo usuario con los datos proporcionados
    const newUser = new User({
      email,
      userName,
      password: encryptedPassword,
    });

    // Guardar el nuevo usuario en la base de datos
    const result = await newUser.save();

    // Obtener el ID del usuario recién creado
    const userId = result._id;

    // Crear el Planeta inicial asociado a este usuario
    await createUserPlanet(userId);
    
    // Responder con el usuario creado
    res.status(201).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Registration failed', error: error.message });
  }
};

// Función para hashear la contraseña
async function hashPassword(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

// Iniciar sesión de usuario
const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Buscar al usuario en la base de datos
    const user = await User.findOne({ userName });

    // Verificar si el usuario existe y si la contraseña es correcta
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid user or password' });
    }

    // Obtener los roles del usuario desde tu base de datos
    const userRoles = user.roles; //todo los roles se almacenan en la propiedad "roles" del objeto usuario

    // Generar un token JWT para el usuario, incluyendo los roles como parte del token
    const accessToken = jwt.sign(
      { id: user._id, roles: userRoles }, // Agrega los roles al objeto payload
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    // Responder con el token JWT
    res.status(200).json({
      accessToken,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        roles: user.roles,
        // ranking: user.ranking, // Todo modificar el modelo de usuario y agregar este campo
        // ...otros campos que quieras exponer
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// No funciona
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // console.log('User ID:', userId, 'typeof:', typeof userId);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Consulta para obtener el perfil del usuario excluyendo la contraseña
    const user = await User.findById(userId, '-password');

    // console.log('User Profile:', user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Convierte userId a ObjectId si es string
    const userIdObj =
      typeof userId === 'string' ? new mongoose.Types.ObjectId(userId) : userId;

    // Consulta para obtener información del planeta asociado al usuario
    const userPlanet = await Planet.findOne({ user_id: userIdObj });

    // console.log('User Planet:', userPlanet);

    // Combina la información del usuario y el planeta (puede ser null)
    const userProfileWithPlanet = {
      user: user.toObject(),
      Planet: userPlanet ? userPlanet.toObject() : null,
    };

    if (!userPlanet) {
      return res.status(404).json({ message: 'Planet not found for the user' });
    }

    res.status(200).json(userProfileWithPlanet);
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res
      .status(500)
      .json({ message: 'Failed to retrieve user info', error: error.message });
  }
};

// Actualizar los valores de los recursos
const updateResourceValue = async (req, res) => {
  try {
    const userId = req.user.id;
    const userIdObj = new mongoose.Types.ObjectId(userId);

    const {
      metalProduction,
      crystalProduction,
      deuteriumProduction,
      energyProduction,
    } = req.body;

    // console.log('valor de metal', metalProduction);

    // Actualiza el perfil del usuario en la base de datos
    const updatedUserPlanet = await Planet.findOneAndUpdate(
      { user_id: userIdObj },
      {
        $set: {
          'resources.metal': metalProduction,
          'resources.crystal': crystalProduction,
          'resources.deuterium': deuteriumProduction,
          'resources.energy': energyProduction,
        },
      }
    );

    // todo  ver el terma de si mostrar los datos 'profile'
    res.status(200).json({
      message: 'Production values saved successfully',
      profile: updatedUserPlanet,
    });
  } catch (error) {
    console.error('Error saving production values:', error);
    res.status(500).send('Internal Server Error');
  }
};

export { register, login, getUserProfile, updateResourceValue };
