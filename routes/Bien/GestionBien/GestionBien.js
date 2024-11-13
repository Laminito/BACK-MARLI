const express = require("express");
const ctrlUser = require("../../../controllers/Bien/GestionBien/GestionBien");
const auth = require("../../../midlewares/auth/auth");

const router = express.Router();

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Créer un nouveau bien
 *     tags: [Biens]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom du bien
 *                 example: "Appartement T3"
 *               prix:
 *                 type: number
 *                 description: Prix du bien
 *                 example: 100000
 *     responses:
 *       201:
 *         description: Bien créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ref:
 *                   type: string
 *                   description: Référence unique du bien
 *       500:
 *         description: Erreur serveur
 */
router.post('/create', auth, ctrlUser.createNewBien);

/**
 * @swagger
 * /update:
 *   patch:
 *     summary: Mettre à jour un bien existant
 *     tags: [Biens]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: ref
 *         schema:
 *           type: string
 *         required: true
 *         description: Référence unique du bien
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom mis à jour du bien
 *     responses:
 *       200:
 *         description: Bien mis à jour avec succès
 *       404:
 *         description: Bien non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.patch('/update', auth, ctrlUser.updateBien);

/**
 * @swagger
 * /delete:
 *   delete:
 *     summary: Supprimer un bien
 *     tags: [Biens]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: ref
 *         schema:
 *           type: string
 *         required: true
 *         description: Référence unique du bien
 *     responses:
 *       200:
 *         description: Bien supprimé avec succès
 *       404:
 *         description: Bien non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/delete', auth, ctrlUser.deleteBien);

/**
 * @swagger
 * /get-one:
 *   get:
 *     summary: Récupérer un bien spécifique
 *     description: Récupère les détails d'un bien spécifique basé sur sa référence.
 *     parameters:
 *       - in: query
 *         name: ref
 *         required: true
 *         description: Référence du bien à récupérer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bien trouvé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ref:
 *                   type: string
 *                   description: La référence du bien.
 *                 status:
 *                   type: string
 *                   description: Le statut du bien.
 *       404:
 *         description: Bien non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/get-one', ctrlUser.getBien);

/**
 * @swagger
 * /all-biens:
 *   get:
 *     summary: Récupérer tous les biens
 *     description: Récupère tous les biens avec pagination, tri et filtres.
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Numéro de la page (par défaut = 1)
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: pageSize
 *         description: Nombre de biens par page (par défaut = 10)
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: triPar
 *         description: Ordre de tri des biens (`croissant` ou `decroissant`).
 *         schema:
 *           type: string
 *           enum: [croissant, decroissant]
 *       - in: query
 *         name: bienId
 *         description: Filtre par référence unique du bien.
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         description: Filtre par statut du bien.
 *         schema:
 *           type: string
 *       - in: query
 *         name: typeBien
 *         description: Filtre par type de bien (insensible à la casse).
 *         schema:
 *           type: string
 *       - in: query
 *         name: budgets
 *         description: Filtre pour un budget maximum.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: localisation
 *         description: Filtre par localisation (insensible à la casse).
 *         schema:
 *           type: string
 *       - in: query
 *         name: superficie
 *         description: Filtre pour la superficie minimale.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des biens récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 biens:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ref:
 *                         type: string
 *                       status:
 *                         type: string
 *                       typeBien:
 *                         type: string
 *                 hasMore:
 *                   type: boolean
 *                   description: Indique s'il reste plus de biens à récupérer.
 *       500:
 *         description: Erreur serveur
 */
router.get('/all-biens', ctrlUser.getAllBien);

module.exports = router;