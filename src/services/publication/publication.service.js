const mongooseError = require("mongoose-error-handler");

exports.createPublicationDoc = (publicationData, Publication) => {
  return Publication.create(publicationData)
    .then((publicationDoc) => {
      return publicationDoc
        .populate("author comments.author", "firstName lastName")
        .execPopulate();
    })
    .catch((err) => {
      const errors = mongooseError.set(err);
      throw errors;
    });
};

exports.addCommentsToPublicationsDoc = async (idPub, comment, Publication) => {
  try {
    const publication = await Publication.findById(idPub);
    publication.comments.push(comment);
    await Publication.updateOne({ _id: idPub }, publication);
    return publication;
  } catch (err) {
    const errors = mongooseError.set(err);
    throw errors;
  }
};

exports.updatePublicationDoc = (
  idPublication,
  publicationNewData,
  Publication
) => {
  return Publication.updateOne({ _id: idPublication }, publicationNewData).then(
    (publicationDoc) => {
      return publicationDoc
        .populate("author", "firstName lastName")
        .execPopulate();
    }
  ).catch(err => {
    if(err.path="_id"){
      throw({
        id: 1,
        message: "Publication not exists"
      })
    }
    throw err;
  });
};

exports.deletePublicationDoc = (idPublication, Publication) => {
  return Publication.deleteOne({ _id: idPublication })
    .then((resp) => ({
      id: 0,
      message: "Publication deleted successfully",
    }))
    .catch((err) => {
      throw {
        message: "Publication not exists",
        id: 1,
      };
    });
};

exports.getAllPublicationDoc = async (userId, Publication, User) => {
  try {
    const user = await User.findById(userId);
    const followings = user.followings;
    const searchIds = followings.concat(user.followers);
    searchIds.push(user._id);
    const resp = await Promise.all(
      searchIds.map(async (id) => {
        return Publication.find({ author: id });
      })
    );
    let result = [];
    resp.forEach((list) => {
      result = result.concat(list);
    });
    return result;
  } catch (err) {
    if (err.path === "followings" || err.path === "followers") {
      throw {
        id: "1",
        message: "Followings or Followers are not valids",
      };
    }
    if (err.path === "_id") {
      throw {
        id: "1",
        message: "User not valid",
      };
    }
    throw err;
  }
};

exports.findByIdPublicationDoc = async (idPublications, Publication) => {
  try {
    return await Publication.findById(idPublications);
  } catch (err) {
    if (err.path === "_id") {
      throw {
        id: 1,
        message: "Publication not exists",
      };
    }
    throw err;
  }
};

exports.findByIdPublicationDocByUserId = async (idUser, Publication) => {
  try {
    return await Publication.find({ author: idUser });
  } catch (error) {
    if (error.path === "author") {
      throw { id: 1, message: "User Id not exists" };
    }
    throw error;
  }
};
