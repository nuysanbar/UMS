const express = require('express');
const router=express.Router();
const adminController = require('../../controllers/adminController.js');
const multer=require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('calling destination...')
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file.originalname)
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })
const verifyAdmin=(req,res,next)=>{
  if(!req?.roles) return res.sendStatus(401)
  if(!(req.roles===3030)){
      return res.sendStatus(401)
  }
  next()
}
router.route("/getCustomers")
    .get(verifyAdmin,adminController.getCustomers);
router.route("/getUser/:username")
    .get(verifyAdmin,adminController.getUser);
router.route("/consumers/:username/activity")
    .get(verifyAdmin,adminController.getActivity);
router.route('/addMember')
    .post(verifyAdmin,upload.single('profileImg'),adminController.addUser)
router.route("/editMember/edit/:username")
    .put(verifyAdmin,adminController.editMember)
router.route("/deleteMember/:username/:role")
    .delete(verifyAdmin,adminController.deleteUser)
router.route("/changeStatus/:id/toggleSuspend")
    .get(verifyAdmin,adminController.toggleSuspend)
module.exports=router;