const db = require("../models");
const Op = db.Sequelize.Op;
const { CohereClient } = require("cohere-ai");
const cohere = new CohereClient({
  token: process.env.RECOMMENDATIONS_API_KEY,
});
const Book = db.book;
const Wishlist = db.bookWishlist;
exports.get_recommendations = async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).send({ message: "user Id is required" });
  }

  // Get booklist (books owned by user)
  const userBooks = await Book.findAll({
    where: { userId: userId },
    include: [
      {
        model: db.bookAuthor,
        as: "bookAuthor",
      },
      {
        model: db.bookGenre,
        as: "bookGenre",
      },
    ],
    order: [["createdAt", "ASC"]],
  });

  // Get wishlist (books wished by user)
  const userWishlist = Wishlist.findAll({
    include: [
      {
        model: db.book,
        as: "book",
        include: [
          {
            model: db.bookAuthor,
            as: "bookAuthor",
          },
          {
            model: db.bookGenre,
            as: "bookGenre",
          },
        ],
      },
    ],
    order: [["createdAt", "ASC"]],
  });

  let response = await cohere.chat({
    message: `I have added a few books and wishlist items from my user into the application. Please send all possible recommendations in the same format I’ve provided below.
    Here are the books the user has added: ${JSON.stringify(userBooks, null, 2)}
Here are the books the user has wishlisted: ${JSON.stringify(
      userWishlist,
      null,
      2
    )}
Please respond with an array of objects in the format below. Each item should include a high-quality cover image (using a valid Amazon image URL that works when clicked), and all links (for buying and PDF) should be functional
each object should have below keys
{
          bookName
          bookDescription
          bookAuthor
          bookGenre
          onlineBuyingLink
          onlinePDFLink
    
          }`,
  });

  let bookRecommendations = [];
  try {
    // Match the first JSON array in the text
    const match = response.text.match(/\[\s*{[\s\S]*?}\s*\]/);
    if (match) {
      bookRecommendations = JSON.parse(match[0]);
    } else {
      // Fallback: try to parse the whole text
      bookRecommendations = JSON.parse(response.text);
    }
  } catch (e) {
    console.error("Failed to Fetch book recommendations", e);
    return res
      .status(500)
      .json({ message: "Failed to parse recommendations." });
  }
  return res.status(200).json(bookRecommendations);
};
