import { IOferta, OfertaModel } from '../models/ofertaModel.js';
import Historial, { ICanvi } from '../models/historialModel';

export const crearOferta = async (data: Partial<IOferta>): Promise<IOferta> => {
  return await new OfertaModel(data).save();
};

export const obtenerOfertaPorId = async (id: string): Promise<IOferta | null> => {
  return await OfertaModel.findById(id).lean();
};

// La comento per poder crear la nova funció.
/* export const actualizarOferta = async (id: string, data: Partial<IOferta>): Promise<IOferta | null> => {
  return await OfertaModel.findByIdAndUpdate(id, data, { new: true }).lean();
}; */

export const eliminarOferta = async (id: string): Promise<IOferta | null> => {
  return await OfertaModel.findByIdAndDelete(id).lean();
};

export const listarOfertas = async (): Promise<IOferta[]> => {
  return await OfertaModel.find().lean();
};

// Función per comparar dades de versió original i actualitzada
const obtenerCambios = (ofertaOriginal: any, ofertaActualizada: any) => {
  const canvis: ICanvi[] = [];

  for (const llave in ofertaActualizada) {
    // Evitamos comparar campos internos de MongoDB o que no hayan cambiado
    if (['id', '_id', '__v', 'createdAt', 'updatedAt'].includes(llave)) continue;

    const valorOriginal = ofertaOriginal[llave];
    const valorNuevo = ofertaActualizada[llave];

    // Convertimos ambos a String de forma segura para comparar.
    const strOriginal = JSON.stringify(valorOriginal);
    const strNuevo = JSON.stringify(valorNuevo);
      
    if (strOriginal !== strNuevo) {
      canvis.push({
        campo: llave,
        valorAnterior: valorOriginal,
        valorNuevo: valorNuevo
      });
    }
  }
  return canvis;
};

export const actualizarOferta = async (id: string, data: Partial<IOferta>): Promise<IOferta | null> => {
  try {
    const ofertaOriginal = await OfertaModel.findById(id).lean();

    if (!ofertaOriginal) {
      throw new Error('Oferta no encontrada');
    }

    const canvis = obtenerCambios(ofertaOriginal, data);
    
    console.log("Canvis detectats:", JSON.stringify(canvis, null, 2));

    // Guardar cambios en el historial
    if (canvis.length > 0) {
      await Historial.create({
        ofertaId: id,
        canvis: canvis
      });

      // Actualizar la oferta
      return await OfertaModel.findByIdAndUpdate(id, data, { new: true }).lean();
    } else {
      return ofertaOriginal; // No hay cambios, retornamos la oferta original
    }

  } catch (error) {
    console.error('Error al actualizar la oferta:', error);
    throw error;
  }
};
