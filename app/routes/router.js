const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator")
 
 
router.get("/", (req, res) => {
    res.render("pages/index",{"resultado":null, "erros": null, "valores":{"nome":"", "cpf":"", "valorCompra":""}});
})
router.post("/classificar",
    body("nome").isAlpha().isLength({min:3})
       .withMessage("Tem que haver no minimo 3 caracteres."),
    body("cpf").isLength({min:11,max:11})
       .withMessage("Deve conter 11 digitos, e ser um CPF valido."),
    body("valorCompra").isNumeric({min:0.1})
       .withMessage("Deve ser numerico e maior que zero.")
 
     , (req, res) => {
     const errors =  validationResult(req);
     if (!errors.isEmpty()){
          console.log(errors)
          return res.render("pages/index", {"erros":errors, "valores":req.body, "resultado": null});
     }
 
    let nome = req.body.nome;
    let cpf = parseInt(req.body.cpf);
    let valorCompra = parseFloat(req.body.valorCompra);
    let porcentagem = 0;
    let valorDesconto = 0;
    let valorFinal = 0;
 
    if (valorCompra <= 200) {
    } else if (valorCompra >= 200 && valorCompra <= 1000) {
         porcentagem = 5 / 100;
         valorDesconto = porcentagem * valorCompra;
         valorFinal = valorCompra - valorDesconto;
 
    } else if (valorCompra >= 1000 && valorCompra <= 2500) {
         porcentagem = 10 / 100;
         valorDesconto = porcentagem * valorCompra;
         valorFinal = valorCompra - valorDesconto;
 
    } else if (valorCompra >= 2500 ) {
         porcentagem = 15 / 100;
         valorDesconto = porcentagem * valorCompra;
         valorFinal = valorCompra - valorDesconto;
 
 
    }
 
         

 
    res.render("pages/index", {
     "resultado": {
          "nome":nome,
          "cpf":cpf,
          "valorCompra":valorCompra,
          "porcentagem":porcentagem,
          "valorDesconto":valorDesconto,
          "valorFinal":valorFinal,
     },
     "valores":{"nome":nome, "cpf":cpf, "valorCompra":valorCompra},
     "erros":null
    })
 
})
 
module.exports = router;