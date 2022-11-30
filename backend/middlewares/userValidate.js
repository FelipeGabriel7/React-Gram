const { body } = require("express-validator");

function validateUserCreate() {
  return [

    body("name")
      .isString()
      .withMessage(" Informe um nome válido")
      .isLength({ min: 3 })
      .withMessage(" o nome precisa ter 3 caracteres"),
    body("email")
      .isString()
      .withMessage(" o email é obrigatorio")
      .isEmail()
      .withMessage(" Informe um email válido"),
    body("password")
       .isString()
       .withMessage(" a senha é obrigatoria ")
       .isLength({min: 6})
       .withMessage(" A senha deve ter no minimo 6 caracteres"),
     body("confirmPassword")
        .isString()
        .withMessage(" é necessário confirmar a senha")
        .custom((value , {req}) => {
          if(value != req.body.password){
            throw new Error(" As senhas precisam ser iguais ")
          }
          return true;
        })

  ];
}

function validateUser(){
  return[
    body("email")
        .isString()
        .withMessage(" O email é obrigatorio")
        .isEmail()
        .withMessage(" Informe um email válido"),
    body("password")
        .isString()
        .withMessage(" a senha é obrigatoria")
        .isLength({min: 6})
        .withMessage(" A senha necessita ter 6 caracteres ")
  ]
}

function validateUpdateUser(){
  return[

    body("name")
      .optional()
      .isLength({min: 3})
      .withMessage(" o nome precisa de pelo menos 3 caracteres"),

    body("password")
      .optional()
      .isLength({min : 6})
      .withMessage(" A senha deve possuir ao menos 6 caracteres "),
  ]
}


module.exports = {
  validateUserCreate,
  validateUser,
  validateUpdateUser,
};
