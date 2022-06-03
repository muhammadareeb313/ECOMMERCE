const Product = require("../models/productModel");
//try catch repeat na krna pare is lye 1 bar likh lya 
//abb har 1 ko wrap karte jaen ge
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures =require("../utils/apifeatures")
const ErrorHandler = require("../utils/errorHandler")
// Create Product
exports.CreateProduct= catchAsyncErrors(async(req,res,next)=>{
req.body.user = req.user.id
  const product = await Product.create(req.body);
res.status(201).json({
  sucess:true,
  product
})
});
//Get All Product
exports.getALLProducts= catchAsyncErrors(async(req,res,next)=>{
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(),req.query)
  .search()
  .filter()
  
  let products = await apiFeature.query.clone();

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query;


 // const products =await Product.find();  //same
res.status(200).json({
  sucess:true,
  products,
  productsCount,
  resultPerPage,
  filteredProductsCount,
})
})
// Update Product
exports.updateProducts= catchAsyncErrors(async(req,res)=>{
  let product = await Product.findById(req.params.id);
  if(!product){
    res.status(500).json({
      sucess:false,
      messages:"Product not found"
    })
  };
 product = await Product.findByIdAndUpdate(req.params.id,req.body,{
  new:true,
  runValidators:true,
  useFindAndModify:false})
  res.status(200).json({
    sucess:true,
    product
  })
  })
// Delete Product
  exports.deleteProducts= catchAsyncErrors(async(req,res)=>{
    const product =await Product.findById(req.params.id);
    if(!product){
      res.status(500).json({
        sucess:false,
        messages:"Product not found"
      })
    }
   await product.remove();
   res.status(200).json({
    sucess:true,
    messages:"Product Delete"
  })
});
//Get single product or Product Details
exports.getProductDetails= catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.findById(req.params.id);
 

  if(!product){
   return next(new ErrorHandler("Product not found",404));
  }
  res.status(200).json({
    sucess:true,
    product,
  
  })

  });

  exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
  // Get All Reviews of a product
  exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });
  
  // Delete Review
  exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    //jo review hme delete nahi krne
    
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });