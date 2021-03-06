const common = require('./../common.js');
const order = require('./order.js');
const logger = require('./../../util/logger.js');
const moduleName = "HMALL :: ";



module.exports = async function(param){
  var browser = param.browser;
  var page = param.page;
    var screenshotSetting = {
      title:"HMALL Main Module (Login)",
      date: param.datetime,
      platform: param.platform,
      phase: 0
    }
    browser.on('targetcreated', async target=>{
      const popup = await target.page();
      try{
        await popup.click(".prodCareBtn a.btnType_orangenew");
      }catch(e){

      }
      await popup.on("load", async page=>{
        await popup.click(".prodCareBtn a.btnType_orangenew");
      })

        /*
      popup.on("load", async page=>{
        popup.click(".prodCareBtn a.btnType_orangenew");
      })*/
    })

        /*
            browser.on('dialog', async dlg=>{
              await console.log(dlg)
            })*/
                page.on('dialog', async dlg=>{
                  let dialogText = dlg.message();
                  if(dialogText.match("동일상품")){
                    dlg.dismiss();
                  }else if(dialogText.match("반품이 불가능")){
                    dlg.dismiss();
                  }else{
                    dlg.dismiss();

                      common.error(page,param.datapath+"/AlertError.jpg",
                        {
                          "title"         : "얼럿 에러",
                          "date"          : param.datetime,
                          "platform"      : param.platform,
                          "phase"         : 0,
                          "errorMessage"  : dialogText,
                          "consoleMessage": "",
                          "url"  : page.url()
                        }
                      )
                  }
                })/*
    page.on('console',async msg=>{
      console.log(param.page.url());
      console.log(moduleName+"consoleMessage");
      await common.consolelog(page,param.datapath+"/hmallConsoleError.jpg",
        {
          "title"         : "콘솔 에러",
          "date"          : param.datetime,
          "platform"      : param.platform,
          "phase"         : 0,
          "errorMessage"  : "",
          "consoleMessage": moduleName+msg.text(),
          "url"  : page.url()
        }
      )
    })*/

    await page.once('load',async()=>{
      try{
        /*
        page.on("pageerror",async msg=>{
          console.log(param.page.url());
            console.log(moduleName+"pageerror");
            await common.consolelog(page,param.datapath+"/hmallPageError.jpg",
              {
                "title"         : "콘솔 에러",
                "date"          : param.datetime,
                "platform"      : param.platform,
                "phase"         : 0,
                "errorMessage"  : "",
                "consoleMessage": moduleName+msg.text(),
                "url"  : page.url()
              }
            )
        })*/

        logger.debug(moduleName + "로그인 이후 홈페이지로 돌아왔습니다.");

        logger.debug(moduleName + "로그인 이후 메인페이지 캡처완료!");

        logger.debug(moduleName + "임의의 페이지로 접속을 시도합니다.");

        await page.waitFor(3000);
        await page.evaluate(async ()=>{
          var randomNum = Math.floor(Math.random() * $(".itemList_star > a").length);
          $(".itemList_star > a").get(randomNum).click();
        })
        await common.sendMessage("메인에 있는 상세페이지에 접근을 시도합니다!\n");
        //a = "http://www.hyundaihmall.com/front/pda/itemPtc.do?slitmCd=2061104362&MainpageGroup=CateSect01&GroupbannerName=CateSect01_5_87914_0214"; // 품절
        //a='http://www.hyundaihmall.com/front/pda/itemPtc.do?slitmCd=2060498356&MainpageGroup=CateSect01&GroupbannerName=CateSect01_3_87911_0218'; // 정적 셀럭트박스
        //a="http://www.hyundaihmall.com/front/pda/itemPtc.do?slitmCd=2064086386&MainpageGroup=TVSect&GroupbannerName=TVSect_2_87506_0206"; // 테스트
        //a = "http://www.hyundaihmall.com/front/pda/itemPtc.do?slitmCd=2056663405&MainpageGroup=CateSect08&GroupbannerName=CateSect08_1_87691_0211"
        //a = "http://www.hyundaihmall.com/front/pda/itemPtc.do?slitmCd=2064536893&Main%20pageGroup=CateSect05&GroupbannerName=CateSect05_2_87912_0214"


        /*

        for(i=0;i<10;i++){ // 무한 반복을 하지 않기 위한 for문

        	if(GetSelectedItemCount()==0){
        		await page.click(GetSelectorOption(i));

        	}

        }


        */
        await page.once("load",async()=>{

        await common.sendMessage(await page.url());
//    await page.$('a[href*="/front/pda/itemPtc.do"]').click().then(async()=>{
        const GetSelectorButton0 = () => "#btn_group button.btnOrange";
        const GetSelectorButton1 = () => "#divBtnFlexForEasySelect button.btnOrange";

        const GetSelectorDoneButton0 = () => "#btn_groupDetail button.btnOrange"
        const GetSelectorDoneButton1 = () => "#divBtnFlexForEasySelect button.btnOrange"

        const GetSelectorSelectedItemCount1 = () => "#divOptionForEasySelectArea .quantity1";
        const GetSelectorSelectedItemCount2 = () => "#itemDetailREasyDiv .quantity1";

        const GetSelectorOption = select => "#option_con div > ul > li:nth-child("+(select+1)+") a.optbox_sel";
        const GetSelectorOptionDetail = select => "#option_con div > ul > li:nth-child("+(select+1)+") .dg_wrap .list_wrap a";

        const GetSelectorOptionBasic = select => "#ul_optionBsicUitm";
        const GetSelectorOptionBasicDetail = select => "#ul_optionBsicUitm .combo_box_list li:nth-child("+(select+1)+") > a";
        const GetSelectorOptionBasicDetailList = () => "#ul_optionBsicUitm .combo_box_list li";

        const ListInvisible = function(){ return $(this).css("display") == "none"; };


        let GetCount = async function(selector){
          var result = await page.evaluate((sel)=>$(sel).length,selector);
          return result;
        }
        let removeListElement = async function(selector){
          await page.evaluate(function(sel,fil){
            $(sel).filter(function(){ return $(this).css("display") == "none"; }).remove();
            console.log("DONE2");
          },selector)
        }


        // ACTION
        async function buttonClick(){
          if(await GetCount(GetSelectorButton1()) > 0){
            await page.click(GetSelectorButton1());
          }else{
            await page.click(GetSelectorButton0());
          }
        }
        async function DoneButtonClick(){
          await page.evaluate(function(){
            buyDirect(this);
          })
          /*
          if(await GetCount(GetSelectorDoneButton0()) > 0){
            await page.click(GetSelectorDoneButton1());
          }else{
            await page.click(GetSelectorDoneButton0());
          }*/
        }
        await common.screenshot(page,param.datapath+"detail.jpg",{
          title:"TheHyundai PC Order Module",
          date: param.datetime,
          platform: param.platform,
          phase: 0
        });
        buttonClick();
        for(i=0;i<10;i++){ // 무한 반복을 하지 않기 위한 for문

          console.log("반복문 시작!");
          await page.waitFor(1000);
          console.log("판단1 : "+await GetCount(GetSelectorSelectedItemCount1()));
          console.log("판단2 : "+await GetCount(GetSelectorSelectedItemCount2()));
          if(await GetCount(GetSelectorSelectedItemCount1()) == 0 && await GetCount(GetSelectorSelectedItemCount2()) == 0){
            console.log("선택된 데이터가 없습니다.");
            console.log(await GetCount(GetSelectorOption(i)));
            console.log(await GetCount(GetSelectorOptionBasic(i)));
            if(await GetCount(GetSelectorOption(i)) > 0){
              console.log("복합형!");
              // 복합형
              console.log("클릭 : "+GetSelectorOption(i))
              await page.waitForSelector(GetSelectorOption(i));
              console.log("===============");
              var gso1 = await GetCount(GetSelectorOption(i));
              console.log(gso1);
              await page.waitFor(1000);
              await page.click(GetSelectorOption(i));
          //    await removeListElement(GetSelectorOption(i));
              await page.waitForSelector(GetSelectorOptionDetail(i));
              await removeListElement(GetSelectorOptionDetail(i),ListInvisible);
              await page.waitFor(1000);
              console.log("===============");
              var gso2 = await GetCount(GetSelectorOptionDetail(i));
              console.log(gso2);
              console.log(await GetSelectorOptionDetail(i));
              await page.click(GetSelectorOptionDetail(i));


            }else if(await GetCount(GetSelectorOptionBasic()) > 0){
              console.log("일반형!");
              // 일반형
              console.log("클릭 : "+GetSelectorOptionBasic(i))
                await page.waitForSelector(GetSelectorOptionBasic(i));
                console.log("===============");
                var gsob1 = await GetCount(GetSelectorOptionBasic(i));
                console.log(gsob1);
                await page.waitFor(1000);
                await page.click(GetSelectorOptionBasic(i));
            //    await removeListElement(GetSelectorOptionBasic(i));
                await page.waitForSelector(GetSelectorOptionBasicDetail(i));
                await removeListElement(GetSelectorOptionBasicDetail(i),ListInvisible);
                await page.waitFor(1000);
                console.log("===============");
                var gsob2 = await GetCount(GetSelectorOptionBasicDetail(i));
                console.log(gsob2);
                console.log(await GetSelectorOptionBasicDetail(i));
                await page.click(GetSelectorOptionBasicDetail(i));

            }else{
              console.log("데이터가 선택되었습니다.");
              i=10;
            }

          }else{
            i=10;
          }


        }
        await DoneButtonClick();
        order(param);

        //await page.click("#btn_groupDetail button.btnOrange");


      /* 상품페이지 */
          try{

            logger.debug(moduleName + "바로구매 버튼을 클릭했습니다!");

          }catch(e){
            common.error(page,param.datapath+"/detail2Error.jpg",
              {
                "title"         : "상세페이지 에러",
                "date"          : param.datetime,
                "platform"      : param.platform,
                "phase"         : 0,
                "errorMessage"  : e.toString(),
                "consoleMessage": "",
                "url"  : page.url()
              }
            )
          }
          await page.once('load',async()=>{
            logger.debug(moduleName + "ORDER모듈을 실행합니다.");
          //  order(param);
          });
        })

      }catch(e){
        common.error(page,param.datapath+"/detail1Error.jpg",
          {
            "title"         : "상세페이지 에러",
            "date"          : param.datetime,
            "platform"      : param.platform,
            "phase"         : 0,
            "errorMessage"  : moduleName+e.toString(),
            "consoleMessage": "",
          }
        )
      }


    })
}
