const express = require("express");
const ctrlUser = require("../../controllers/FormNotif/FormNotif");

const router = express.Router();

/**
 * @swagger
 * /user/contact-us:
 *   post:
 *     summary: Envoi d'un message de contact
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titleMessage:
 *                 type: string
 *               motif:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               contenu:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message envoyé avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/contact-us', ctrlUser.contactUs);

/**
 * @swagger
 * /user/wanted:
 *   post:
 *     summary: Envoi d'une demande de bien recherché
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               localisation:
 *                 type: string
 *               typeBien:
 *                 type: string
 *               superficie:
 *                 type: number
 *               pieces:
 *                 type: integer
 *               budget:
 *                 type: number
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message envoyé avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/wanted', ctrlUser.wanted);

/**
 * @swagger
 * /user/selling:
 *   post:
 *     summary: Envoi d'une demande pour vendre un bien
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               localisation:
 *                 type: string
 *               typeBien:
 *                 type: string
 *               superficie:
 *                 type: number
 *               pieces:
 *                 type: integer
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message envoyé avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/selling', ctrlUser.selling);

module.exports = router;