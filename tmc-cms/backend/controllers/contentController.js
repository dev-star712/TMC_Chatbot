import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Homeherocontent from "../models/homeherocontentModel.js";
import Aboutushomebanners from "../models/aboutushomebannersModel.js";
import Article from "../models/articleModel.js";
import Newscategory from "../models/newscategoryModel.js";
import Reviewcategory from "../models/reviewcategoryModel.js";
import Videocategory from "../models/videocategoryModel.js";
import Teammember from "../models/teammemberModel.js";
import Knowledgebase from "../models/knowledgebaseModel.js";
import Content from "../models/contentModel.js";
import User from "../models/userModel.js";
import axios from "axios";

// Requiring ObjectId from mongoose npm package
const ObjectId = mongoose.Types.ObjectId;

// Validator function
const isValidObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
};

const arraysHaveSameElements = (arr1, arr2) => {
  // Check if the arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Check if each element in arr1 is included in arr2
  return arr1.every((element) => arr2.includes(element));
};

const publish = asyncHandler(async (req, res) => {
  if (req.query.page) {
    if (req.query.page === "0-0-0") {
      if (req.body.image) {
        const content = await Homeherocontent.findOne({});
        if (content) {
          await Homeherocontent.findByIdAndUpdate(content._id, {
            title: req.body.title,
            image: req.body.image,
            image_alt_text: req.body.image_alt_text,
            video_url: req.body.video_url,
            banner_subheading: req.body.banner_subheading,
            banner_text: req.body.banner_text,
            meta_title: req.body.meta_title,
            meta_description: req.body.meta_description,
          });
          if (content.bot) {
            await axios.post(`http://${process.env.BOT_API}/upsert_pinecone`, {
              text: `A hero video is ${req.body.video_url}.\n${req.body.banner_subheading}\n${req.body.banner_text}`,
              metadata: {
                category: "Home Hero",
                id: "0-0-0",
              },
            }, {
              headers: {
                Authorization: `${process.env.CHATBOT_KEY}`,
                "Content-Type": "application/json",
              },
            });
          }
        } else {
          await Homeherocontent.create({
            title: req.body.title,
            image: req.body.image,
            image_alt_text: req.body.image_alt_text,
            video_url: req.body.video_url,
            banner_subheading: req.body.banner_subheading,
            banner_text: req.body.banner_text,
            meta_title: req.body.meta_title,
            meta_description: req.body.meta_description,
          });
        }
      } else {
        res.status(400);
        throw new Error("Upload an image");
      }
    } else if (req.query.page === "0-0-1") {
      if (req.body.image) {
        if (req.body.image.length > 4) {
          res.status(400);
          throw new Error("You can upload up to 4 images");
        }
        const content = await Aboutushomebanners.findOne({});
        if (content) {
          await Aboutushomebanners.findByIdAndUpdate(content._id, {
            image: req.body.image,
            banner_paragraph1: req.body.banner_paragraph1,
            banner_paragraph2: req.body.banner_paragraph2,
          });
          if (content.bot) {
            await axios.post(`http://${process.env.BOT_API}/upsert_pinecone`, {
              text: `${req.body.banner_paragraph1}.\n${req.body.banner_paragraph2}`,
              metadata: {
                category: "About Us",
                id: "0-0-1",
              },
            }, {
              headers: {
                Authorization: `${process.env.CHATBOT_KEY}`,
                "Content-Type": "application/json",
              },
            });
          }
        } else {
          await Aboutushomebanners.create({
            image: req.body.image,
            banner_paragraph1: req.body.banner_paragraph1,
            banner_paragraph2: req.body.banner_paragraph2,
          });
        }
      } else {
        res.status(400);
        throw new Error("Upload one or more images");
      }
    } else {
      const contents = await Content.find({});
      console.log("####", req.body.title)
      if (
        Array.from({ length: contents.length }, (_, i) => i + 1)
          .map((i) => `0-${i}-0`)
          .includes(req.query.page)
      ) {
        const content = await Content.findOne({
          page: req.query.page.split("-")[1] * 1,
        });
        if (content) {
          await Content.findByIdAndUpdate(content._id, {
            content: req.body.content,
            title: req.body.title,
            meta_title: req.body.meta_title,
            meta_description: req.body.meta_description,
          });
          if (content.bot) {
            await axios.post(`http://${process.env.BOT_API}/upsert_pinecone`, {
              text: `${req.body.title}.\n${req.body.content}`,
              metadata: {
                category: req.body.title,
                id: `0-${content.page}-0`,
              },
            }, {
              headers: {
                Authorization: `${process.env.CHATBOT_KEY}`,
                "Content-Type": "application/json",
              },
            });
          }
        }
      } else {
        await Content.create({
          page: req.query.page.split("-")[1] * 1,
          title: req.body.title,
        });
      }
    }

    res.status(200).json({
      message: "Published successfully",
    });
  } else {
    res.status(400);
    throw new Error("Incorrect params");
  }
});

const load = asyncHandler(async (req, res) => {
  if (req.query.page) {
    if (req.query.page === "0-0-0") {
      const content = await Homeherocontent.findOne({});

      if (content) {
        res.status(200).json({
          title: content.title,
          image: content.image,
          image_alt_text: content.image_alt_text,
          video_url: content.video_url,
          banner_subheading: content.banner_subheading,
          banner_text: content.banner_text,
          meta_title: content.meta_title,
          meta_description: content.meta_description,
          bot: content.bot,
        });
      } else {
        res.status(200).json({});
      }
    } else if (req.query.page === "0-0-1") {
      const content = await Aboutushomebanners.findOne({});

      if (content) {
        res.status(200).json({
          image: content.image,
          banner_paragraph1: content.banner_paragraph1,
          banner_paragraph2: content.banner_paragraph2,
          bot: content.bot,
        });
      } else {
        res.status(200).json({});
      }
    } else {
      const contents = await Content.find({});
      if (
        Array.from({ length: contents.length }, (_, i) => i + 1)
          .map((i) => `0-${i}-0`)
          .includes(req.query.page)
      ) {
        const content = await Content.findOne({
          page: req.query.page.split("-")[1] * 1,
        });

        if (content) {
          res.status(200).json({
            title: content.title,
            content: content.content,
            meta_title: content.meta_title,
            meta_description: content.meta_description,
            bot: content.bot,
          });
        } else {
          res.status(200).json({});
        }
      }
    }
  } else {
    res.status(400);
    throw new Error("Incorrect params");
  }
});

const loadAll = asyncHandler(async (req, res) => {
  const contents = await Content.find({}, "_id title page");
  res.status(200).json({ contents });
});

const getCategory = asyncHandler(async (req, res) => {
  if (
    req.params.type &&
    ["news", "review", "video"].includes(req.params.type)
  ) {
    let categories;

    if (req.params.type === "news") categories = await Newscategory.find({});
    if (req.params.type === "review")
      categories = await Reviewcategory.find({});
    if (req.params.type === "video") categories = await Videocategory.find({});

    res.status(200).json({
      categories,
    });
  } else {
    res.status(400);
    throw new Error("Incorrect params");
  }
});

const loadArticle = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const article = await Article.findById(req.params.id);

    if (article) {
      res.status(200).json({
        article,
      });
    } else {
      res.status(400);
      throw new Error("There is no article with the id");
    }
  } else {
    res.status(400);
    throw new Error("Incorrect params");
  }
});

const loadArticleByUrl = asyncHandler(async (req, res) => {
  if (req.params.url) {
    const articles = await Article.find({ url: `/${req.params.url}` });

    if (articles.length > 0) {
      const featuredArticles = await Article.find({
        article_type: articles[0].article_type,
        featured: true,
        url: { $ne: `/${req.params.url}` },
      });
      res.status(200).json({
        article: articles[0],
        featuredArticles: featuredArticles.map((article) => {
          const { _id, title, url, image, synopsis, category, featured, date } =
            article;
          return {
            _id,
            title,
            url,
            image,
            synopsis,
            category: category.name,
            featured,
            date,
          };
        }),
      });
    } else {
      res.status(400);
      throw new Error("There is no article with the url");
    }
  } else {
    res.status(400);
    throw new Error("Incorrect params");
  }
});

const removeArticle = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (article) {
      if (article.bot)
        await axios.post(`http://${process.env.BOT_API}/delete_pinecone`, {
          metadata: {
            id: article.id,
          },
        }, {
          headers: {
            Authorization: `${process.env.CHATBOT_KEY}`,
            "Content-Type": "application/json",
          },
        });

      res.status(200).json({
        article,
      });
    } else {
      res.status(400);
      throw new Error("There is no article with the id");
    }
  } else {
    res.status(400);
    throw new Error("Incorrect params");
  }
});

//news
const publishNews = asyncHandler(async (req, res) => {
  if (req.params.id) {
    if (req.body.image) {
      if (req.params.id === "news") {
        if (!req.body.url) {
          throw new Error("Not found url");
        } else {
          const duplicated_contents = await Article.find({
            url: req.body.url,
          });
          if (duplicated_contents.length > 0) {
            throw new Error("Url duplicated!");
          }
        }
        let category;
        if (isValidObjectId(req.body.category)) {
          category = await Newscategory.findById(req.body.category);
          if (!category)
            category = await Newscategory.create({ name: req.body.category });
        } else {
          if (!req.body.category) {
            res.status(400);
            throw new Error("Not found Category");
          }
          category = await Newscategory.create({ name: req.body.category });
        }

        const content = await Article.create({
          image: req.body.image,
          title: req.body.title,
          url: req.body.url,
          canonical_url: req.body.canonical_url,
          date: req.body.date,
          synopsis: req.body.synopsis,
          featured: req.body.featured,
          article_type: "news",
          category: category._id,
          content: req.body.content,
          // video_url: req.body.video_url,
          meta_title: req.body.meta_title,
          meta_description: req.body.meta_description,
        });

        res.status(200).json({
          message: "Published successfully",
          pageId: content._id,
        });
      } else {
        if (!req.body.url) {
          throw new Error("Not found url");
        } else {
          const duplicated_contents = await Article.find({
            url: req.body.url,
            _id: { $ne: req.params.id },
          });
          if (duplicated_contents.length > 0) {
            throw new Error("Url duplicated!");
          }
        }
        const content = await Article.findById(req.params.id);
        if (content) {
          let category;
          if (isValidObjectId(req.body.category)) {
            category = await Newscategory.findById(req.body.category);
            if (!category)
              category = await Newscategory.create({ name: req.body.category });
          } else {
            if (!req.body.category) {
              res.status(400);
              throw new Error("Not found Category");
            }
            category = await Newscategory.create({ name: req.body.category });
          }

          await Article.findByIdAndUpdate(content._id, {
            image: req.body.image,
            title: req.body.title,
            url: req.body.url,
            canonical_url: req.body.canonical_url,
            date: req.body.date,
            synopsis: req.body.synopsis,
            featured: req.body.featured,
            category: category._id,
            content: req.body.content,
            // video_url: req.body.video_url,
            meta_title: req.body.meta_title,
            meta_description: req.body.meta_description,
          });

          if (content.bot)
            await axios.post(`http://${process.env.BOT_API}/upsert_pinecone`, {
              text: `A ${req.body.article_type} blog with the title "${
                req.body.title
              }".\nPublished date is ${req.body.date}.\nSynopsis is "${
                req.body.synopsis
              }".\nThe blog content is "${req.body.content.replace(
                /<img[^>]*>/g,
                ""
              )}".`,
              metadata: {
                category: "blog",
                id: content.id,
              },
            }, {
              headers: {
                Authorization: `${process.env.CHATBOT_KEY}`,
                "Content-Type": "application/json",
              },
            });

          res.status(200).json({
            message: "Published successfully",
            pageId: content._id,
          });
        } else {
          res.status(400);
          throw new Error("There is no article with the id");
        }
      }
    } else {
      res.status(400);
      throw new Error("Upload an image");
    }
  } else {
    res.status(400);
    throw new Error("Incorrect params");
  }
});

const getAllNews = asyncHandler(async (req, res) => {
  const query = {
    article_type: "news",
  };
  if (req.query.featured) query.featured = req.query.featured === "true";

  const articles = await Article.find(query).populate("category");

  res.status(200).json({
    articles: articles.map((article) => {
      const { _id, title, url, image, synopsis, category, featured, date } =
        article;
      return {
        _id,
        title,
        url,
        image,
        synopsis,
        category: category.name,
        featured,
        date,
      };
    }),
  });
});

//review
const publishReview = asyncHandler(async (req, res) => {
  if (req.params.id) {
    if (req.body.image) {
      if (req.params.id === "review") {
        if (!req.body.url) {
          throw new Error("Not found url");
        } else {
          const duplicated_contents = await Article.find({
            url: req.body.url,
          });
          if (duplicated_contents.length > 0) {
            throw new Error("Url duplicated!");
          }
        }
        console.log("step2")
        let category;
        if (isValidObjectId(req.body.category)) {
          category = await Reviewcategory.findById(req.body.category);
          if (!category)
            category = await Reviewcategory.create({ name: req.body.category });
        } else {
          if (!req.body.category) {
            res.status(400);
            throw new Error("Not found Category");
          }
          category = await Reviewcategory.create({ name: req.body.category });
        }

        const content = await Article.create({
          image: req.body.image,
          title: req.body.title,
          url: req.body.url,
          canonical_url: req.body.canonical_url,
          date: req.body.date,
          synopsis: req.body.synopsis,
          featured: req.body.featured,
          article_type: "review",
          category: category._id,
          content: req.body.content,
          // video_url: req.body.video_url,
          meta_title: req.body.meta_title,
          meta_description: req.body.meta_description,
        });

        res.status(200).json({
          message: "Published successfully",
          pageId: content._id,
        });
      } else {
        if (!req.body.url) {
          throw new Error("Not found url");
        } else {
          const duplicated_contents = await Article.find({
            url: req.body.url,
            _id: { $ne: req.params.id },
          });
          if (duplicated_contents.length > 0) {
            throw new Error("Url duplicated!");
          }
        }
        const content = await Article.findById(req.params.id);
        if (content) {
          let category;
          if (isValidObjectId(req.body.category)) {
            category = await Reviewcategory.findById(req.body.category);
            if (!category)
              category = await Reviewcategory.create({
                name: req.body.category,
              });
          } else {
            if (!req.body.category) {
              res.status(400);
              throw new Error("Not found Category");
            }
            category = await Reviewcategory.create({ name: req.body.category });
          }

          await Article.findByIdAndUpdate(content._id, {
            image: req.body.image,
            title: req.body.title,
            url: req.body.url,
            canonical_url: req.body.canonical_url,
            date: req.body.date,
            synopsis: req.body.synopsis,
            featured: req.body.featured,
            category: category._id,
            content: req.body.content,
            // video_url: req.body.video_url,
            meta_title: req.body.meta_title,
            meta_description: req.body.meta_description,
          });
          if (content.bot)
            await axios.post(`http://${process.env.BOT_API}/upsert_pinecone`, {
              text: `A ${req.body.article_type} blog with the title "${
                req.body.title
              }".\nPublished date is ${req.body.date}.\nSynopsis is "${
                req.body.synopsis
              }".\nThe blog content is "${req.body.content.replace(
                /<img[^>]*>/g,
                ""
              )}".`,
              metadata: {
                category: "blog",
                id: content.id,
              },
            },
            {
              headers: {
                Authorization: `${process.env.CHATBOT_KEY}`,
                "Content-Type": "application/json",
              },
            });

          res.status(200).json({
            message: "Published successfully",
            pageId: content._id,
          });
        } else {
          res.status(400);
          throw new Error("There is no article with the id");
        }
      }
    } else {
      res.status(400);
      throw new Error("Upload an image");
    }
  } else {
    res.status(400);
    throw new Error("Incorrect params");
  }
});

const getAllReview = asyncHandler(async (req, res) => {
  const query = {
    article_type: "review",
  };
  if (req.query.featured) query.featured = req.query.featured === "true";

  const articles = await Article.find(query).populate("category");

  res.status(200).json({
    articles: articles.map((article) => {
      const { _id, title, url, image, synopsis, category, featured, date } =
        article;
      return {
        _id,
        title,
        url,
        image,
        synopsis,
        category: category.name,
        featured,
        date,
      };
    }),
  });
});

//video
const publishVideo = asyncHandler(async (req, res) => {
  if (req.params.id) {
    if (!req.body.video_url) {
      res.status(400);
      throw new Error("Video URL is required for video articles");
    }

    if (req.body.image) {
      if (req.params.id === "video") {
        if (!req.body.url) {
          throw new Error("Not found url");
        } else {
          const duplicated_contents = await Article.find({ url: req.body.url });
          if (duplicated_contents.length > 0) {
            throw new Error("Url duplicated!");
          }
        }
        let category;
        if (isValidObjectId(req.body.category)) {
          category = await Videocategory.findById(req.body.category);
          if (!category)
            category = await Videocategory.create({ name: req.body.category });
        } else {
          if (!req.body.category) {
            res.status(400);
            throw new Error("Not found Category");
          }
          category = await Videocategory.create({ name: req.body.category });
        }

        const content = await Article.create({
          image: req.body.image,
          title: req.body.title,
          url: req.body.url,
          canonical_url: req.body.canonical_url,
          date: req.body.date,
          synopsis: req.body.synopsis,
          featured: req.body.featured,
          article_type: "video",
          category: category._id,
          content: req.body.content,
          video_url: req.body.video_url,
          meta_title: req.body.meta_title,
          meta_description: req.body.meta_description,
        });

        res.status(200).json({
          message: "Published successfully",
          pageId: content._id,
        });
      } else {
        if (!req.body.url) {
          throw new Error("Not found url");
        } else {
          console.log("ggg");
          const duplicated_contents = await Article.find({
            url: req.body.url,
            _id: { $ne: req.params.id },
          });
          console.log(duplicated_contents.length);
          if (duplicated_contents.length > 0) {
            throw new Error("Url duplicated!");
          }
        }
        const content = await Article.findById(req.params.id);
        if (content) {
          let category;
          if (isValidObjectId(req.body.category)) {
            category = await Videocategory.findById(req.body.category);
            if (!category)
              category = await Videocategory.create({
                name: req.body.category,
              });
          } else {
            if (!req.body.category) {
              res.status(400);
              throw new Error("Not found Category");
            }
            category = await Videocategory.create({ name: req.body.category });
          }

          await Article.findByIdAndUpdate(content._id, {
            image: req.body.image,
            title: req.body.title,
            url: req.body.url,
            canonical_url: req.body.canonical_url,
            date: req.body.date,
            synopsis: req.body.synopsis,
            featured: req.body.featured,
            category: category._id,
            content: req.body.content,
            video_url: req.body.video_url,
            meta_title: req.body.meta_title,
            meta_description: req.body.meta_description,
          });

          if (content.bot)
            await axios.post(`http://${process.env.BOT_API}/upsert_pinecone`, {
              text: `A ${req.body.article_type} blog with the title "${
                req.body.title
              }".\nPublished date is ${req.body.date}.\nSynopsis is "${
                req.body.synopsis
              }".\nThe blog content is "${req.body.content.replace(
                /<img[^>]*>/g,
                ""
              )}".\nThe video link is ${req.body.video_url}`,
              metadata: {
                category: "blog",
                id: content.id,
              },
            }, {
              headers: {
                Authorization: `${process.env.CHATBOT_KEY}`,
                "Content-Type": "application/json",
              },
            });

          res.status(200).json({
            message: "Published successfully",
            pageId: content._id,
          });
        } else {
          res.status(400);
          throw new Error("There is no article with the id");
        }
      }
    } else {
      res.status(400);
      throw new Error("Upload an image");
    }
  } else {
    res.status(400);
    throw new Error("Incorrect params");
  }
});

const getAllVideo = asyncHandler(async (req, res) => {
  const query = {
    article_type: "video",
  };
  if (req.query.featured) query.featured = req.query.featured === "true";

  const articles = await Article.find(query).populate("category");

  res.status(200).json({
    articles: articles.map((article) => {
      const { _id, title, url, image, synopsis, category, featured, date } =
        article;
      return {
        _id,
        title,
        url,
        image,
        synopsis,
        category: category.name,
        featured,
        date,
      };
    }),
  });
});

const getAllArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({}, "_id article_type title url");

  res.status(200).json({
    articles,
  });
});

//team meet
const getAllMembers = asyncHandler(async (req, res) => {
  const members = await Teammember.find({}).sort({ order: 1 });

  res.status(200).json({
    members,
  });
});

const getMember = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const member = await Teammember.findById(req.params.id);

    if (member) {
      res.status(200).json({
        member,
      });
    } else {
      res.status(400);
      throw new Error("There is no member with the id");
    }
  } else {
    res.status(400);
    throw new Error("Incorrect params");
  }
});

const upsertMember = asyncHandler(async (req, res) => {
  if (req.params.id) {
    if (req.body.image) {
      if (req.params.id === "member") {
        const member = await Teammember.create({
          image: req.body.image,
          name: req.body.name,
          role: req.body.role,
          bio: req.body.bio,
          order: req.body.order,
        });

        res.status(200).json({
          message: "Published successfully",
          memberId: member._id,
        });
      } else {
        const member = await Teammember.findById(req.params.id);
        if (member) {
          await Teammember.findByIdAndUpdate(member._id, {
            image: req.body.image,
            name: req.body.name,
            role: req.body.role,
            bio: req.body.bio,
            order: req.body.order,
          });

          if (member.bot)
            await axios.post(`http://${process.env.BOT_API}/upsert_pinecone`, {
              text: `Name is ${req.body.name}.\nRole is ${req.body.role}.\nBio is "${req.body.bio}"`,
              metadata: {
                category: "teammember",
                id: member.id,
              },
            }, {
              headers: {
                Authorization: `${process.env.CHATBOT_KEY}`,
                "Content-Type": "application/json",
              },
            });

          res.status(200).json({
            message: "Published successfully",
            memberId: member._id,
          });
        } else {
          res.status(400);
          throw new Error("There is no member with the id");
        }
      }
    } else {
      res.status(400);
      throw new Error("Upload an image");
    }
  } else {
    res.status(400);
    throw new Error("Incorrect params");
  }
});

const removeMember = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const member = await Teammember.findByIdAndDelete(req.params.id);

    if (member) {
      if (member.bot)
        await axios.post(`http://${process.env.BOT_API}/delete_pinecone`, {
          metadata: {
            id: member.id,
          },
        }, {
          headers: {
            Authorization: `${process.env.CHATBOT_KEY}`,
            "Content-Type": "application/json",
          },
        });

      res.status(200).json({
        member,
        message: "Deleted Successfully",
      });
    } else {
      res.status(400);
      throw new Error("There is no member with the id");
    }
  } else {
    res.status(400);
    throw new Error("Incorrect params");
  }
});

//knowledge item
const getAllKnowledgeItems = asyncHandler(async (req, res) => {
  const knowledgeitems = await Knowledgebase.find({});

  res.status(200).json({
    knowledgeitems,
  });
});

const getKnowledgeItem = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const knowledgeitem = await Knowledgebase.findById(req.params.id);

    if (knowledgeitem) {
      res.status(200).json({
        knowledgeitem,
      });
    } else {
      res.status(400);
      throw new Error("There is no knowledgeitem with the id");
    }
  } else {
    res.status(400);
    throw new Error("Incorrect params");
  }
});

const upsertKnowledgeItem = asyncHandler(async (req, res) => {
  if (req.params.id) {
    if (req.params.id === "knowledgeitem") {
      const knowledgeitem = await Knowledgebase.create({
        category: req.body.category,
        text: req.body.text,
      });

      res.status(200).json({
        message: "Published successfully",
        knowledgeitemId: knowledgeitem._id,
      });
    } else {
      const knowledgeitem = await Knowledgebase.findById(req.params.id);
      if (knowledgeitem) {
        await Knowledgebase.findByIdAndUpdate(knowledgeitem._id, {
          category: req.body.category,
          text: req.body.text,
        });

        if (knowledgeitem.bot)
          await axios.post(`http://${process.env.BOT_API}/upsert_pinecone`, {
            text: req.body.text,
            metadata: {
              category: req.body.category,
              id: knowledgeitem.id,
            },
          }, {
            headers: {
              Authorization: `${process.env.CHATBOT_KEY}`,
              "Content-Type": "application/json",
            },
          });

        res.status(200).json({
          message: "Published successfully",
          knowledgeitemId: knowledgeitem._id,
        });
      } else {
        res.status(400);
        throw new Error("There is no knowledgeitem with the id");
      }
    }
  } else {
    res.status(400);
    throw new Error("Incorrect params");
  }
});

const removeKnowledgeItem = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const knowledgeitem = await Knowledgebase.findByIdAndDelete(req.params.id);

    if (knowledgeitem) {
      if (knowledgeitem.bot)
        await axios.post(`http://${process.env.BOT_API}/delete_pinecone`, {
          metadata: {
            id: knowledgeitem.id,
          },
        }, {
          headers: {
            Authorization: `${process.env.CHATBOT_KEY}`,
            "Content-Type": "application/json",
          },
        });
      res.status(200).json({
        knowledgeitem,
        message: "Deleted Successfully",
      });
    } else {
      res.status(400);
      throw new Error("There is no knowledgeitem with the id");
    }
  } else {
    res.status(400);
    throw new Error("Incorrect params");
  }
});

const trainPage = asyncHandler(async (req, res) => {
  if (req.params.id && typeof req.body.bot === "boolean") {
    if (req.params.id === "0-0-0") {
      const content = await Homeherocontent.findOne({});

      if (content && content.bot !== req.body.bot) {
        await Homeherocontent.findByIdAndUpdate(content._id, {
          bot: req.body.bot,
        });

        if (req.body.bot) {
          console.log("bot needs to train this content");
          console.log();
          await axios.post(`http://${process.env.BOT_API}/upsert_pinecone`, {
            text: `A hero video is ${content.video_url}.\n${content.banner_subheading}\n${content.banner_text}`,
            metadata: {
              category: "Home Hero",
              id: "0-0-0",
            },
          }, {
            headers: {
              Authorization: `${process.env.CHATBOT_KEY}`,
              "Content-Type": "application/json",
            },
          });
        } else {
          console.log("bot needs to forget this content");
          await axios.post(`http://${process.env.BOT_API}/delete_pinecone`, {
            metadata: {
              id: "0-0-0",
            },
          }, {
            headers: {
              Authorization: `${process.env.CHATBOT_KEY}`,
              "Content-Type": "application/json",
            },
          });
        }

        res.status(200).json({ message: "success" });
      } else {
        res.status(200).json({});
      }
    } else if (req.params.id === "0-0-1") {
      const content = await Aboutushomebanners.findOne({});

      if (content && content.bot !== req.body.bot) {
        await Aboutushomebanners.findByIdAndUpdate(content._id, {
          bot: req.body.bot,
        });

        if (req.body.bot) {
          console.log("bot needs to train this content");
          await axios.post(`http://${process.env.BOT_API}/upsert_pinecone`, {
            text: `${content.banner_paragraph1}.\n${content.banner_paragraph2}`,
            metadata: {
              category: "About Us",
              id: "0-0-1",
            },
          }, {
            headers: {
              Authorization: `${process.env.CHATBOT_KEY}`,
              "Content-Type": "application/json",
            },
          });
        } else {
          console.log("bot needs to forget this content");
          await axios.post(`http://${process.env.BOT_API}/delete_pinecone`, {
            metadata: {
              id: "0-0-1",
            },
          }, {
            headers: {
              Authorization: `${process.env.CHATBOT_KEY}`,
              "Content-Type": "application/json",
            },
          });
        }

        res.status(200).json({ message: "success" });
      } else {
        res.status(200).json({});
      }
    } else {
      const contents = await Content.find({});
      if (
        Array.from({ length: contents.length }, (_, i) => i + 1)
          .map((i) => `0-${i}-0`)
          .includes(req.params.id)
      ) {
        const content = await Content.findOne({
          page: req.params.id.split("-")[1] * 1,
        });

        if (content && content.bot !== req.body.bot) {
          await Content.findByIdAndUpdate(content._id, { bot: req.body.bot });

          if (req.body.bot) {
            console.log("bot needs to train this content");
            await axios.post(`http://${process.env.BOT_API}/upsert_pinecone`, {
              text: `${content.title}.\n${content.content}`,
              metadata: {
                category: content.title,
                id: `0-${content.page}-0`,
              },
            }, {
              headers: {
                Authorization: `${process.env.CHATBOT_KEY}`,
                "Content-Type": "application/json",
              },
            });
          } else {
            console.log("bot needs to forget this content");
            await axios.post(`http://${process.env.BOT_API}/delete_pinecone`, {
              metadata: {
                id: `0-${content.page}-0`,
              },
            }, {
              headers: {
                Authorization: `${process.env.CHATBOT_KEY}`,
                "Content-Type": "application/json",
              },
            });
          }

          res.status(200).json({ message: "success" });
        } else {
          res.status(200).json({});
        }
      }
    }
  } else {
    res.status(400);
    throw new Error("Incorrect params");
  }
});

const trainArticle = asyncHandler(async (req, res) => {
  if (req.params.id && typeof req.body.bot === "boolean") {
    const article = await Article.findById(req.params.id);

    if (article) {
      if (article.bot !== req.body.bot) {
        await Article.findByIdAndUpdate(article._id, { bot: req.body.bot });

        if (req.body.bot) {
          console.log("bot needs to train this article");
          await axios.post(`http://${process.env.BOT_API}/upsert_pinecone`, {
            text: `A ${article.article_type} blog with the title "${
              article.title
            }".\nPublished date is ${article.date}.\nSynopsis is "${
              article.synopsis
            }".\nThe blog content is "${article.content.replace(
              /<img[^>]*>/g,
              ""
            )}".${
              article.article_type === "video"
                ? `\nThe video link is ${article.video_url}`
                : ""
            }`,
            metadata: {
              category: "blog",
              id: article.id,
            },
          }, {
            headers: {
              Authorization: `${process.env.CHATBOT_KEY}`,
              "Content-Type": "application/json",
            },
          });
        } else {
          console.log("bot needs to forget this article");
          await axios.post(`http://${process.env.BOT_API}/delete_pinecone`, {
            metadata: {
              id: article.id,
            },
          }, {
            headers: {
              Authorization: `${process.env.CHATBOT_KEY}`,
              "Content-Type": "application/json",
            },
          });
        }
      }

      res.status(200).json({
        message: "success",
      });
    } else {
      res.status(400);
      throw new Error("There is no article with the id");
    }
  } else {
    res.status(400);
    throw new Error("Incorrect params");
  }
});

const trainMember = asyncHandler(async (req, res) => {
  if (req.params.id && typeof req.body.bot === "boolean") {
    const member = await Teammember.findById(req.params.id);
    if (member) {
      if (member.bot !== req.body.bot) {
        await Teammember.findByIdAndUpdate(member._id, { bot: req.body.bot });
        console.log("#", req.body.bot)
        if (req.body.bot) {
          console.log("bot needs to train this member");
          await axios.post(`http://${process.env.BOT_API}/upsert_pinecone`, {
            text: `Name is ${member.name}.\nRole is ${member.role}.\nBio is "${member.bio}"`,
            metadata: {
              category: "teammember",
              id: member.id,
            },
          }, {
            headers: {
              Authorization: `${process.env.CHATBOT_KEY}`,
              "Content-Type": "application/json",
            },
          });
        } else {
          console.log("bot needs to forget this member");
          await axios.post(`http://${process.env.BOT_API}/delete_pinecone`, {
            metadata: {
              id: member.id,
            },
          }, {
            headers: {
              Authorization: `${process.env.CHATBOT_KEY}`,
              "Content-Type": "application/json",
            },
          });
        }
      }

      res.status(200).json({
        message: "success",
      });
    } else {
      res.status(400);
      throw new Error("There is no member with the id");
    }
  } else {
    res.status(400);
    throw new Error("Incorrect params");
  }
});

const trainKnowledgeItem = asyncHandler(async (req, res) => {
  if (req.params.id && typeof req.body.bot === "boolean") {
    const knowledgeitem = await Knowledgebase.findById(req.params.id);
    if (knowledgeitem) {
      if (knowledgeitem.bot !== req.body.bot) {
        await Knowledgebase.findByIdAndUpdate(knowledgeitem._id, {
          bot: req.body.bot,
        });

        if (req.body.bot) {
          console.log("bot needs to train this knowledgeitem", knowledgeitem.category);
          await axios.post(`http://${process.env.BOT_API}/upsert_pinecone`, {
            text: knowledgeitem.text,
            metadata: {
              category: knowledgeitem.category,
              id: knowledgeitem.id,
            },
          }, {
            headers: {
              Authorization: `${process.env.CHATBOT_KEY}`,
              "Content-Type": "application/json",
            },
          });
        } else {
          console.log("bot needs to forget this knowledgeitem");
          await axios.post(`http://${process.env.BOT_API}/delete_pinecone`, {
            metadata: {
              id: knowledgeitem.id,
            },
          }, {
            headers: {
              Authorization: `${process.env.CHATBOT_KEY}`,
              "Content-Type": "application/json",
            },
          });
        }
      }

      res.status(200).json({
        message: "success",
      });
    } else {
      res.status(400);
      throw new Error("There is no knowledgeitem with the id");
    }
  } else {
    res.status(400);
    throw new Error("Incorrect params");
  }
});


const getAllAdmins = asyncHandler(async (req, res) => {
  const members = await User.find({});
  res.json({ members: members.filter(member => process.env.SUPERUSER.split(",").indexOf(member.email) == -1 ) });
});

const toggleAllowedAdmin = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.body.id, { $set: { allowed: req.body.allowed }});
  res.json({ message: "Operation succeed!"  });
});
const deleteAdmin = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.body.id);
  res.json({ message: "Operation succeed!"  });
});
export {
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
  getMember,
  upsertMember,
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
};
