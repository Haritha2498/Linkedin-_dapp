const {buildModule}=require("@nomicfoundation/hardhat-ignition/modules");

module.exports=buildModule("LinkedInModule",(m)=>{
    const linkedin=m.contract("LinkedIn");
    return (linkedin);
})