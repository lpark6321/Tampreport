// ==UserScript==
// @name		Tampreport
// @namespace	http://tampermonkey.net/
// @version		0.1
// @description	For innolux temperature reprot.
// @author		Ethan.Huang
// @match		*://*/*
// @include		http://hrrecruit.innolux.com/rms_inviteletter/*
// @require     https://cdn.staticfile.org/jquery/3.3.1/jquery.min.js
// @grant 		GM_openInTab
// @grant 		GM.getValue
// @grant 		GM.setValue
// @grant 		GM.deleteValue

// ==/UserScript==
// Your code here...

function closealert(str){
    console.log("已關閉alert");
    window.alert = function(str) {
		console.log(str);
		return ;
    }
}

(async ()=>{
    //'use strict';
    var datetext="";
    var url=[""]

    function todaydate(){
        datetext = now.getFullYear().toString();
        if ((now.getMonth()+1)<10){
            datetext = datetext.concat("/0",(now.getMonth()+1).toString());
        }else{
            datetext = datetext.concat("/",(now.getMonth()+1).toString());
        }
        datetext = datetext.concat("/",now.getDate().toString());
        console.log("今天日期: "+datetext);
    }
    function tempreport(){
        document.getElementById("DateTB").value=datetext;
        document.getElementById("ToolDDL").value="額溫槍";
        document.getElementById("TemperatureTB").value="36."+Math.floor(Math.random() * 6);
        document.getElementById("AssuranceCB").checked="checked";
        console.log("填寫完畢");
        document.getElementById('ReSummitBT').click();
    }
    function reportagain(){
        if (document.getElementsByClassName("history_row")[4].innerText === datetext){
            //alert("今天打過卡了口屋")
            console.log("打過了歐");
            return "打過了歐";
        }else{
            return "現在打卡";
        }
    }
    function closetab(){
        window.open('', '_self', ''); window.close();
    }

    closealert();
    var now = new Date();
    var crosstag= await GM.getValue('check',"99");

///////////////////////////////////////////////////////////////////////////////////////////////////////
    $(document).ready(async () =>{
        if(now.getHours()<=9 && now.getDate().toString()!=crosstag){
        	if(!location.href.match("http://hrrecruit.innolux.com/")){
        		console.log("這不是innolux");
                //GM.deleteValue('check');
                url.forEach(i =>GM_openInTab(i,false));
       		}else if(location.href.match("http://hrrecruit.innolux.com/rms_inviteletter/")){
                //if(crosstag==now.getDate().toString()){console.log("跨網頁大成功");}
	            document.getElementById("TitleLB").innerText = "腳本啟動中ヽ(●´∀`●)ﾉ";
	            todaydate();
	            if(reportagain()==="打過了歐"){
	                alert("不用填了");
                    await GM.setValue('check',now.getDate().toString());
                    closetab();
	            }else{
	                tempreport();
                    await GM.setValue('check',now.getDate().toString());
                    closetab();
	            }
        	}
        }else{
            if(location.href.match("http://hrrecruit.innolux.com/rms_inviteletter/")){
                document.getElementById("TitleLB").innerText = "腳本啟動中ヽ(●´∀`●)ﾉ";
            }
        	console.log("現在不是打卡時間: "+now.getHours());
        }
    });
})();
