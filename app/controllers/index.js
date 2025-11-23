module.exports.home = function(req, res, next){

    let messageObj = {
        message: "Welcome to my Portfolio Application"
    }

    res.json(messageObj);
}