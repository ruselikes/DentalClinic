
const Usluga = require('../models/Usluga')

class UslugiController{
        async getPrices(req, res) {
                Usluga.find()
                    .then(posts => res.json(posts))
                    .catch(error => res.status(500).send(error));
        };
        async addPrice(req, res) {
                const usluga = new Usluga({title:req.body.title,text:req.body.text,price:req.body.price});
                usluga.save()
                    .then(post => res.json(post))
                    .catch(error => res.status(500).send(error));
        }
        async updatePrice(req, res) {
                const usluga = new Usluga({title:req.body.title,text:req.body.text,price:req.body.price});
                usluga.save()
                    .then(post => res.json(post))
                    .catch(error => res.status(500).send(error));
        }
        async deletePrice(req, res) {
                try{
                const priceId = req.params.id;
                console.log(priceId)

                await Usluga.findOneAndDelete(
                    {
                        _id:priceId
                        }


                ).then(
                    (usluga)=> {
                            // if () {
                            //         console.log(err);
                            //         return res.status(500).json({
                            //                 message: "Возникла ошибка при удалении услуги" + err
                            //         })
                            // }
                            if (!usluga) {
                                    return res.status(404).json({
                                            message: "Статья не найдена"
                                    })
                            }
                            res.json({success:"Успешное удаление услуги!"})
                        }).catch((err)=>{
                        return res.status(404).json({
                                message:"Услуга не найдена. Перепроверьте данные"})})
                }
                catch(err){
                        res.status(500).json({
                                message:"Возникла ошибка при удалении услуги"+err})
                }
        }
}
module.exports = new UslugiController()
