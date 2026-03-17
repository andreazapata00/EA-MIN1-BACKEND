import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController.js';

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Usuarios
 *   description: API para la gestión de usuarios registrados en el sistema.
 */

/**
 * @openapi
 * /api/usuarios:
 *   get:
 *     summary: Obtiene la lista completa de usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios recuperada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/', usuarioController.getUsuarios);

/**
 * @openapi
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario específico por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de MongoDB del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/:id', usuarioController.getUsuario);

/**
 * @openapi
 * /api/usuarios:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/', usuarioController.createUsuario);

/**
 * @openapi
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualiza los datos de un usuario por su ID
 *     tags: [Usuarios]
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
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.put('/:id', usuarioController.updateUsuario);

/**
 * @openapi
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.delete('/:id', usuarioController.deleteUsuario);

export default router;
