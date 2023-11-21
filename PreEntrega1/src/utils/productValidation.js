function productValidation(req, res, next) {
  const { title, description, price, code, category, stock } = req.body;

  if (!title) {
    return res.json({
      error: "Title is required",
    });
  }

  if (!description) {
    return res.json({
      error: "Description is required",
    });
  }

  if (!price) {
    return res.json({
      error: "Price is required",
    });
  }

  if (!code) {
    return res.json({
      error: "Code is required",
    });
  }

  if (!category) {
    return res.json({
      error: "Category is required",
    });
  }

  if (!stock) {
    return res.json({
      error: "stock is required",
    });
  }

  next();
}

export { productValidation };
