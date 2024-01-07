const mongoose = require('mongoose');
const { Schema } = mongoose;
const installSchema = require('./installSchema');
const warehouseSchema = require('./warehouseSchema');


const userPlanetSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  ecoUniverse: Number,
  // otras caracteristicas del universo
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

        //* Se utiliza el mismo schema que para los recuros ya que se piensa en un futuro agregarle un item para aumentar temporalmente la produccion (eficiencia)
        robotFactory: installSchema, 
        nanobotFactory: installSchema, //* requiere computerTechnologyLevel 10 y robotFactory 10
      },
      //...otros detalles del planeta
    },
    //...otros planetas
  ],
  technology: {
    energyTechnologyLevel: Number,
    computerTechnologyLevel: Number,
  },
});

const UserPlanet = mongoose.model('UserPlanet', userPlanetSchema);

module.exports = UserPlanet;
