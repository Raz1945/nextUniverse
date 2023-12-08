const mongoose = require('mongoose');
const { Schema } = mongoose;
const installSchema = require('./installSchema');
const warehouseSchema = require('./warehouseSchema');
// todo --> Pensar un atributo para almacenar el estado de los rescursos, 

const userPlanetSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  ecoUniverse: Number,
  resources:{
    metal: Number,
    crystal: Number,
    deuterium: Number,
    energy: Number,
  },
  planets: [
    {
      _id: {
        type: Schema.Types.ObjectId,
      },
      name: String,
      tempMax: Number,
      tempMin: Number,
      diameter: Number,
      installation: {
        metalMine: installSchema,
        crystalMine: installSchema,
        deuteriumSynthesizer: installSchema,
        solarPowerPlant: installSchema,
        metalWarehouse: warehouseSchema,
        crystalWarehouse: warehouseSchema,
        deuteriumTank: warehouseSchema,
      },
      //...otros detalles del planeta
    },
    //...otros planetas
  ],
  technology: {
    energyTechnologyLevel: Number,
  },
});

const UserPlanet = mongoose.model('UserPlanet', userPlanetSchema);

module.exports = UserPlanet;
