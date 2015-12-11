
var CorreoApi = (function() {
    var CorreoApi = function(nodemailer) {
        this.nodemailer = nodemailer.module;
    };
//curl -i -H "Content-Type: application/json" -d '{"from":"jonasnahum@gmail.com","pass":"jonasoctubre","subject":"este es subject","text":"jonasoctubre este es el texto"}' http://localhost:3000/correo 
    CorreoApi.prototype.send = function(req, res, next){
        var that = this;
        var transporter = that.nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: req.body.from,
                pass: req.body.pass
            }
        });    
        transporter.sendMail({
            from: req.body.from,
            to: "jonasnahum@gmail.com",
            subject: req.body.subject,
            text: req.body.text
        });
        res.send({data: "ok"});
    };
    return CorreoApi;
})();

module.exports = CorreoApi; 