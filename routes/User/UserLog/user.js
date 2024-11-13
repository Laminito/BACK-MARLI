const express = require("express");
const ctrlUser = require("../../../controllers/User/UserLog/User");
const auth = require("../../../midlewares/auth/auth");

const router = express.Router();

/**
 * @swagger
 * /user/tk-log:
 *   get:
 *     summary: Vérification de la connexion de l'utilisateur par token
 *     tags: [User]
 *     responses:
 *       200:
 *         description: L'utilisateur est connecté
 *       401:
 *         description: Non autorisé ou token invalide
 */
router.get('/tk-log', auth, ctrlUser.tk_log);

/**
 * @swagger
 * /user/add-review:
 *   post:
 *     summary: Ajout d'un avis client
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pseudo:
 *                 type: string
 *               stars:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Avis ajouté avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/add-review', ctrlUser.addReview);

/**
 * @swagger
 * /user/reviews:
 *   get:
 *     summary: Récupération de tous les avis clients
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: allreviews
 *         schema:
 *           type: boolean
 *         description: Indique si tous les avis (validés ou non) doivent être récupérés
 *     responses:
 *       200:
 *         description: Liste des avis clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   pseudo:
 *                     type: string
 *                   stars:
 *                     type: integer
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *       500:
 *         description: Erreur serveur
 */
router.get('/reviews', ctrlUser.getReviews);

/**
 * @swagger
 * /user/validation-review:
 *   patch:
 *     summary: Validation ou mise à jour du statut d'un avis client
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [valid, invalid]
 *         description: Statut de l'avis client
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: ID de l'avis client
 *     responses:
 *       200:
 *         description: Statut de l'avis mis à jour avec succès
 *       404:
 *         description: Avis non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.patch('/validation-review', auth, ctrlUser.validationReview);


module.exports = router;