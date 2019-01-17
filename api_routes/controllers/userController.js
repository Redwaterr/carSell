const User = require("../../db/models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var signUp = (req,res) => {   //Useri db ye kaydettik.
    var salt = bcrypt.genSaltSync(10);
    var password = bcrypt.hashSync(req.body.password+"/\/",salt);   //ŞİFREYİ HASHLEDİK.
    var user = new User( {
        email:req.body.email,
        password:password
    });
    user.save()
        .then(user => {
            res.status(200).json({message:"Başarılı",user:user});
        })
        .catch((err) => {
            res.status(404).json({message:"Başarısız üye ekleme",err:err})
        });
};

var login = (req,res) => {  //Gelen login isteğine karşın ya token verdik ya vermedik,DB de varsa verdik.
    let fetchedUser;
    User.findOne({email:req.body.email})
    .then(user => { //KÖK THEN
        if(!user) {
            return res.status(401).json({message:"Auth Failed"});
        }
        fetchedUser = user;
        return bcrypt.compareSync(req.body.password+"/\/",user.password);  //ŞİFREYİ ÇÖZÜP TRUE-FALSEİ RETURNLEDİK.
    })
        .then(result => {  //BU THEN İSE KÖKÜN CALLBACKİ TRUE-FALSEYİ PARAMETRE OLARAK ALARAK İŞLEM YAPIYOR.
            if(!result) {
                return res.status(401).json({message:"Auth failed"});
            };
            const token = jwt.sign(           //SECRET VEREREK BİR TOKEN OLUŞTURUYORUZ BUNU ANGULARDA ÇÖZÜCEZ.
                {email:fetchedUser.email,userId:fetchedUser._id},
                "secret_should_be_longer",
                {expiresIn:"1h"}
            );
            res.status(200).json({
                token:token,
                expiresIn:3600,
                userId:fetchedUser._id
            });
        })
        .catch(err => {
            return res.status(401).json({
                message:"AUTH FAILED",
                err:err
            });
        });
};

module.exports = {signUp,login};