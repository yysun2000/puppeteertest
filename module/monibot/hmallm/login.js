const common = require('./../common.js');
const logger = require('./../../util/logger.js');

const moduleName = "LOGIN :: ";

  module.exports = async function(param,callback){
    var page = param.page;



      await page.once('load',async ()=>{
            logger.debug(moduleName + "로그인 페이지를 로드하였습니다.");
            await page.waitForSelector(".login_contents_area .login_form_area").then(async ()=>{
                try{

                  // ID 입력
                  logger.debug(moduleName + "ID 포커싱");
                  await page.click(".login_contents_area .login_form_area #userid",{delay:500});
                  logger.debug(moduleName + "ID 입력중");
                  await page.type(".login_contents_area .login_form_area #userid",param.data.id,{delay:1});
                  logger.debug(moduleName + "ID 입력완료!");


                  // 패스워드 입력
                  logger.debug(moduleName + "패스워드 포커싱");
                  await page.click(".login_contents_area .login_form_area #password",{delay:500});
                  logger.debug(moduleName + "패스워드 입력중");
                  await page.type(".login_contents_area .login_form_area #password",param.data.password,{delay:1});
                  logger.debug(moduleName + "패스워드 입력완료!");


                  // 로그인 시도
                  logger.debug(moduleName + "로그인을 시도합니다!");
                  await page.click("#loginCheck")
                  //await page.screenshot({path:"loginafter.jpg",fullPage:true});
                  logger.debug(moduleName + "로그인완료!");
                  await common.sendMessage("로그인이 완료되었습니다.\n");
                  try{
                    // 로그인 이후
                    logger.debug(moduleName + "완료! 콜백함수를 호출합니다.");
                    await callback(param);
                  }catch(e){
                    logger.debug(moduleName + "로그인 실패");
                    logger.debug(e);
                  }

                }catch(e){
                  common.error(page,param.datapath+"/LoginError.jpg",
                    {
                      "title"         : "로그인 에러",
                      "date"          : param.datetime,
                      "platform"      : param.platform,
                      "phase"         : 0,
                      "errorMessage"  : e.toString(),
                      "consoleMessage": "",
                    }
                  )
                }
        })

      }) // load
  }
