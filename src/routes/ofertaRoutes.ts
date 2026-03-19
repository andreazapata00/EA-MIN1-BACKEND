import { Router } from 'express';
import * as ofertaController from '../controllers/ofertaController.js';
import { validate } from '../middlewares/validatorMiddleware.js';
import {
	createOfertaSchema,
	ofertaIdParamsSchema,
	updateOfertaSchema
} from '../validators/ofertaValidator.js';

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Ofertas
 *   description: API per a la gestió d'ofertes d'empresa publicades a la plataforma.
 */

/**
 * @openapi
 * /api/ofertas:
 *   get:
 *     summary: Obté la llista completa d'ofertes
 *     tags: [Ofertas]
 *     responses:
 *       200:
 *         description: Llista d'ofertes recuperada correctament
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Oferta'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/', ofertaController.getOfertas);

/**
 * @openapi
 * /api/ofertas/{id}:
 *   get:
 *     summary: Obté una oferta específica per ID
 *     tags: [Ofertas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de MongoDB de l'oferta
 *     responses:
 *       200:
 *         description: Oferta trobada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Oferta'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/:id', validate({ params: ofertaIdParamsSchema }), ofertaController.getOferta);

/**
 * @openapi
 * /api/ofertas:
 *   post:
 *     summary: Crea una nova oferta
 *     tags: [Ofertas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOferta'
 *     responses:
 *       201:
 *         description: Oferta creada correctament
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/', validate({ body: createOfertaSchema }), ofertaController.createOferta);

/**
 * @openapi
 * /api/ofertas/{id}:
 *   put:
 *     summary: Actualitza una oferta per ID
 *     tags: [Ofertas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOferta'
 *     responses:
 *       200:
 *         description: Oferta actualitzada correctament
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.put(
	'/:id',
	validate({
		params: ofertaIdParamsSchema,
		body: updateOfertaSchema
	}),
	ofertaController.updateOferta
);

/**
 * @openapi
 * /api/ofertas/{id}:
 *   delete:
 *     summary: Elimina una oferta per ID
 *     tags: [Ofertas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Oferta eliminada correctament
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.delete('/:id', validate({ params: ofertaIdParamsSchema }), ofertaController.deleteOferta);

export default router;
