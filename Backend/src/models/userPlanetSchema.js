// Importación de módulos en formato ESM
import mongoose from 'mongoose';
const { Schema } = mongoose;

import Install from './installSchema.js';
import Warehouse from './warehouseSchema.js';

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
      // ID del planeta actual
      _id: {
        type: Schema.Types.ObjectId,
      },
      name: String,
      tempMax: Number,
      tempMin: Number,
      diameter: Number,
      visualPlanetId: Number, // ID para la visualización del planeta
      installation: {
        metalMine: { type: Install.schema },
        crystalMine: { type: Install.schema },
        deuteriumSynthesizer: { type: Install.schema },
        solarPowerPlant: { type: Install.schema },
        metalWarehouse: { type: Warehouse.schema },
        crystalWarehouse: { type: Warehouse.schema },
        deuteriumTank: { type: Warehouse.schema },

        //* Se utiliza el mismo schema que para los recuros ya que se piensa en un futuro agregarle un item para aumentar temporalmente la produccion (eficiencia)
        robotFactory: { type: Install.schema }, 
        nanobotFactory: { type: Install.schema }, //* requiere computerTechnologyLevel 10 y robotFactory 10
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


export default mongoose.model('Planet', userPlanetSchema);
