const express =require("express");
const { getALLProducts, CreateProduct, updateProducts, deleteProducts, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controllers/productController");
const { isAuthenticatedUser,authorizeRoules } = require("../middleware/auth");
const router =express.Router();

router.route("/products").get(getALLProducts)

router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoules("admin"),CreateProduct)
router.route("/admin/product/:id")
.put(isAuthenticatedUser,authorizeRoules("admin"),updateProducts)
.delete(isAuthenticatedUser,authorizeRoules("admin"),deleteProducts)

router.route("/product/:id").get(getProductDetails)
router.route("/review").put(isAuthenticatedUser,createProductReview)
router.route("/reviews").get(getProductReviews)
.delete(isAuthenticatedUser,deleteReview)


module.exports= router