import express from "express";
import {
  publish,
  load,
  loadAll,
  loadArticle,
  loadArticleByUrl,
  removeArticle,
  getCategory,
  publishNews,
  getAllNews,
  publishReview,
  getAllReview,
  publishVideo,
  getAllVideo,
  getAllArticles,
  getAllMembers,
  upsertMember,
  getMember,
  removeMember,
  getAllKnowledgeItems,
  getKnowledgeItem,
  upsertKnowledgeItem,
  removeKnowledgeItem,
  trainPage,
  trainArticle,
  trainMember,
  trainKnowledgeItem,
  getAllAdmins,
  toggleAllowedAdmin,
  deleteAdmin
} from "../controllers/contentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/publish").post(protect, publish);
router.route("/load").get(load);
router.route("/loadall").get(loadAll);

router.route("/article/:id").get(loadArticle);
router.route("/article-by-url/:url").get(loadArticleByUrl);
router.route("/article/:id").delete(protect, removeArticle);
router.route("/category/:type").get(getCategory);

router.route("/news/:id").post(protect, publishNews);
router.route("/allnews").get(getAllNews);

router.route("/review/:id").post(protect, publishReview);
router.route("/allreview").get(getAllReview);

router.route("/video/:id").post(protect, publishVideo);
router.route("/allvideo").get(getAllVideo);

router.route("/allarticle").get(getAllArticles);

router.route("/allmember").get(getAllMembers);
router.route("/member/:id").post(protect, upsertMember);
router.route("/member/:id").get(getMember);
router.route("/member/:id").delete(protect, removeMember);

router.route("/allknowledgeitem").get(getAllKnowledgeItems);
router.route("/knowledgeitem/:id").post(protect, upsertKnowledgeItem);
router.route("/knowledgeitem/:id").get(getKnowledgeItem);
router.route("/knowledgeitem/:id").delete(protect, removeKnowledgeItem);

router.route("/bot/page/:id").post(protect, trainPage);
router.route("/bot/article/:id").post(protect, trainArticle);
router.route("/bot/member/:id").post(protect, trainMember);
router.route("/bot/knowledgeitem/:id").post(protect, trainKnowledgeItem);
router.route('/alladmin').get(protect, getAllAdmins);
router.route('/toggleAllowedAdmin').post(protect, toggleAllowedAdmin);
router.route('/deleteAdmin').post(protect, deleteAdmin);

export default router;
