const isAuth=(req,res,next)=>{
    if(!req.session){
        res.redirect('/')
    }
    next()
}
const isAuthorized=(req,res,next)=>{

}


module.exports={isAuth}