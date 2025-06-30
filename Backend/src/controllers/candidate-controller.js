// @ts-nocheck
const Candidate = require("../models/candidate-model");
const mongoose = require("mongoose");
const path = require('path');
const fs = require('fs');

const IMAGES_BASE_URL = process.env.IMAGES_BASE_URL || '/images';

const createCandidate = async (req, res) => {
   try {
      const { fullName, age, description, slogan, party } = req.body;
      let imageUrl = req.body.image;

      if (req.file) {
         imageUrl = `${IMAGES_BASE_URL}/${req.file.filename}`;
      } else if (!imageUrl) {
          imageUrl = `${IMAGES_BASE_URL}/default-candidate.png`;
      }

      if (!fullName) {
         return res.status(400).json({ message: "Le nom complet du candidat est obligatoire." });
      }
      if (!age) {
         return res.status(400).json({ message: "L'âge du candidat est obligatoire." });
      }

      const newCandidate = await Candidate.create({
         fullName,
         age,
         image: imageUrl,
         description,
         slogan,
         party,
      });

      res.status(201).json(newCandidate);
   } catch (error) {
      if (req.file) {
          const filePath = path.join(__dirname, '..', '..', process.env.UPLOAD_IMAGE_DIR, req.file.filename);
          fs.unlink(filePath, (err) => {
              if (err) console.error("Erreur lors de la suppression du fichier uploadé après échec de création:", err);
          });
      }
      res.status(400).json({
         message: "Erreur lors de la création du candidat",
         error: error.message,
      });
   }
};

const getAllCandidates = async (req, res) => {
   try {
      const candidates = await Candidate.find();
      res.status(200).json(candidates);
   } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
   }
};

const getCandidateById = async (req, res) => {
   try {
      const candidate = await Candidate.findById(req.params.id);
      if (!candidate) {
         return res.status(404).json({ message: "Candidat non trouvé." });
      }
      res.status(200).json(candidate);
   } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
   }
};

const updateCandidate = async (req, res) => {
   try {
      const candidateId = req.params.id;
      const existingCandidate = await Candidate.findById(candidateId);

      if (!existingCandidate) {
         return res.status(404).json({ message: "Candidat non trouvé." });
      }

      const updateData = { ...req.body };
      let newImageUrl = req.body.image;

      if (req.file) {
          newImageUrl = `${IMAGES_BASE_URL}/${req.file.filename}`;

          if (existingCandidate.image && existingCandidate.image.startsWith(IMAGES_BASE_URL)) {
              const oldFilename = path.basename(existingCandidate.image);
              const oldFilePath = path.join(__dirname, '..', '..', process.env.UPLOAD_IMAGE_DIR, oldFilename);
              fs.unlink(oldFilePath, (err) => {
                  if (err) console.error("Erreur lors de la suppression de l'ancienne image :", err);
              });
          }
      } else if (req.body.image === '') {
          if (existingCandidate.image && existingCandidate.image.startsWith(IMAGES_BASE_URL)) {
              const oldFilename = path.basename(existingCandidate.image);
              const oldFilePath = path.join(__dirname, '..', '..', process.env.UPLOAD_IMAGE_DIR, oldFilename);
              fs.unlink(oldFilePath, (err) => {
                  if (err) console.error("Erreur lors de la suppression de l'ancienne image lors de la mise à vide:", err);
              });
          }
          newImageUrl = `${IMAGES_BASE_URL}/default-candidate.png`;
      }
      
      updateData.image = newImageUrl;

      const updatedCandidate = await Candidate.findByIdAndUpdate(
         candidateId,
         updateData,
         {
            new: true,
            runValidators: true,
         }
      );

      res.status(200).json(updatedCandidate);
   } catch (error) {
      if (req.file) {
          const filePath = path.join(__dirname, '..', '..', process.env.UPLOAD_IMAGE_DIR, req.file.filename);
          fs.unlink(filePath, (err) => {
              if (err) console.error("Erreur lors de la suppression du fichier uploadé après échec de la MAJ :", err);
          });
      }
      res.status(400).json({
         message: "Erreur lors de la mise à jour du candidat",
         error: error.message,
      });
   }
};

const deleteCandidate = async (req, res) => {
   try {
      const candidateId = req.params.id;
      const candidate = await Candidate.findById(candidateId);

      if (!candidate) {
         return res.status(404).json({ message: "Candidat non trouvé." });
      }

      if (candidate.image && candidate.image.startsWith(IMAGES_BASE_URL)) {
          const filename = path.basename(candidate.image);
          const filePath = path.join(__dirname, '..', '..', process.env.UPLOAD_IMAGE_DIR, filename);
          fs.unlink(filePath, (err) => {
              if (err) console.error("Erreur lors de la suppression de l'image du candidat :", err);
          });
      }

      await Candidate.findByIdAndDelete(candidateId);

      res.status(200).json({ message: "Candidat supprimé avec succès." });
   } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
   }
};

const addVoteToCandidate = async (req, res) => {
   try {
      const candidateId = req.params.id;
      const voterId = req.voter._id;

      if (!voterId) {
         return res.status(401).json({
            message: "Authentification requise. Vous devez être connecté pour voter.",
         });
      }

      const voter = req.voter;

      if (voter.hasVoted) {
         return res.status(403).json({ message: "Action non autorisée. Vous avez déjà voté." });
      }

      const updatedCandidate = await Candidate.findByIdAndUpdate(
         candidateId,
         { $inc: { votes: 1 } },
         { new: true }
      );

      if (!updatedCandidate) {
         return res.status(404).json({ message: "Candidat non trouvé." });
      }

      voter.hasVoted = true;
      voter.dateLastVoted = new Date();
      await voter.save();

      res.status(200).json({
         message: "Votre vote a été enregistré avec succès !",
         candidate: updatedCandidate,
      });
   } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
   }
};

module.exports = {
   createCandidate,
   getAllCandidates,
   getCandidateById,
   updateCandidate,
   deleteCandidate,
   addVoteToCandidate,
};