const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage(" O titulo da foto é obrigatorio")
      .isString()
      .isLength({min: 3})
      .withMessage(" O titulo precisa ter 3 caracteres "),

    body("image").custom((value , {req}) => {
      if(!req.file){
        throw new Error(" A imagem é obrigatória ");
      }
      return true;
    })
  ]
}

const photoVeriFy = () => {
  return[
    body("title")
      .optional()
      .isString()
      .withMessage(" O titulo é obrigatorio ")
      .isLength({ min: 3 })
  ]
}

const commentValidation = () => {
  return[
    body("comment")
      .isString()
      .isLength({min: 3})
      .withMessage(" O comentário é obrigatório ")
  ]
}

module.exports = {
  photoInsertValidation,
  photoVeriFy,
  commentValidation
}
