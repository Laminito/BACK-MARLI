const express = require("express");
const ctrlUserImages = require("../../../controllers/Bien/GestionImages/GestionImages");
const auth = require("../../../midlewares/auth/auth");

const multer = require("multer");
const upload = multer({dest: "uploads/"});

const router = express.Router();

// routes gestion des images user

/**
 * @swagger
 * /images/{repertoire}/{key}:
 *   get:
 *     summary: Récupère une image d'utilisateur
 *     description: Retourne le flux de l'image stockée dans le répertoire spécifié.
 *     parameters:
 *       - in: path
 *         name: repertoire
 *         required: true
 *         schema:
 *           type: string
 *         description: Le répertoire où l'image est stockée.
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: La clé unique de l'image.
 *     responses:
 *       200:
 *         description: Image récupérée avec succès.
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Fichier non trouvé.
 */
router.get('/images/:repertoire/:key', ctrlUserImages.getImagesPath);

/**
 * @swagger
 * /update-image:
 *   put:
 *     summary: Met à jour une image d'un bien immobilier
 *     description: Met à jour l'image d'un bien immobilier dans la galerie.
 *     parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: Index de la galerie pour l'image à mettre à jour.
 *       - in: query
 *         name: ref
 *         required: true
 *         schema:
 *           type: string
 *         description: La référence du bien.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image mise à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 imagePath:
 *                   type: string
 *       400:
 *         description: Erreur de validation ou de mise à jour.
 */
router.put('/update-image', auth, upload.single("image"), ctrlUserImages.updateImagesBien);

/**
 * @swagger
 * /medias/{repertoire}/{key}:
 *   delete:
 *     summary: Supprime une image d'un bien immobilier
 *     description: Supprime l'image d'un bien immobilier spécifique de la galerie.
 *     parameters:
 *       - in: path
 *         name: repertoire
 *         required: true
 *         schema:
 *           type: string
 *         description: Le répertoire où l'image est stockée.
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: La clé unique de l'image.
 *       - in: query
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: Index de l'image dans la galerie.
 *       - in: query
 *         name: ref
 *         required: true
 *         schema:
 *           type: string
 *         description: La référence du bien.
 *     responses:
 *       200:
 *         description: Image supprimée avec succès.
 *       404:
 *         description: Bien non trouvé.
 */
router.delete('/medias/:repertoire/:key', auth, ctrlUserImages.deleteImageBien);

/**
 * @swagger
 * /wanted-image:
 *   post:
 *     summary: Ajoute une image pour un avis de recherche
 *     description: Téléverse une image pour un nouvel avis de recherche.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Image ajoutée avec succès.
 *       500:
 *         description: Erreur serveur.
 */
router.post('/wanted-image', auth, upload.single("image"), ctrlUserImages.imageWanted);

/**
 * @swagger
 * /get-wanteds:
 *   get:
 *     summary: Récupère tous les avis de recherche
 *     description: Retourne une liste des avis de recherche existants.
 *     responses:
 *       200:
 *         description: Liste des avis de recherche récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Erreur serveur.
 */
router.get('/get-wanteds', ctrlUserImages.getWanted);

/**
 * @swagger
 * /delete-wanted:
 *   delete:
 *     summary: Supprime une image d'avis de recherche
 *     description: Supprime une image spécifique d'un avis de recherche.
 *     parameters:
 *       - in: query
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: La clé unique de l'image à supprimer.
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'identifiant de l'avis de recherche.
 *     responses:
 *       200:
 *         description: Image supprimée avec succès.
 *       401:
 *         description: Échec de suppression.
 */
router.delete('/delete-wanted', auth, ctrlUserImages.deleteWanted);

module.exports = router;