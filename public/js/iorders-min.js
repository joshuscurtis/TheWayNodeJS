console.log("starting iOrders...");const socket=io();socket.on("connect",function(e){socket.emit("join","Hello World from client")}),socket.on("broadcast",function(e){console.log("new order..."),1==e.description&&audio.play()}),socket.on("cache",function(e){console.log("refreshing cache..."),allOrders=e.db;for(var t=0;t<e.db.length;t++)sessionStorage.setItem(e.db[t].order_id,JSON.stringify(e.db[t]))});var aId,barButton,kitButton,allOrders=[{order_id:6663,isnew:!0,products:[{quantity:"1",productUuid:"a97ad560-bc70-11ea-8e84-e8e9c3aef28a",variantUuid:"a97be6d0-bc70-11ea-850c-4b3145c016e7",vatPercentage:0,unitPrice:0,rowTaxableAmount:0,name:"Table 9",description:"",barcode:"",autoGenerated:!1,id:"0",type:"PRODUCT",libraryProduct:!0},{quantity:"1",productUuid:"28c09844-36c1-11ea-8227-e32937f459dc",variantUuid:"b4ee6140-3936-11ea-a02a-fccf98b089d3",vatPercentage:0,unitPrice:260,costPrice:168,rowTaxableAmount:130,name:"Toastie/Sandwich",description:"",variantName:"Cheddar Cheese, Not toasted",autoGenerated:!1,id:"1",type:"PRODUCT",libraryProduct:!0},{quantity:"1",productUuid:"28c09844-36c1-11ea-8227-e32937f459dc",variantUuid:"b4ee6140-3936-11ea-8553-387666ef0e2d",vatPercentage:0,unitPrice:280,costPrice:168,rowTaxableAmount:140,name:"Toastie/Sandwich",description:"",variantName:"Tuna, Cucumber, Not toasted",autoGenerated:!1,id:"2",type:"PRODUCT",libraryProduct:!0},{quantity:"1",productUuid:"43e9aea0-3c5b-11ea-83c5-12eaef15e4d4",variantUuid:"43eac010-3c5b-11ea-9b79-b367ad74cc1b",vatPercentage:0,unitPrice:130,rowTaxableAmount:65,name:"Tea",description:"",barcode:"",autoGenerated:!1,id:"3",type:"PRODUCT",libraryProduct:!0},{quantity:"1",productUuid:"28bd63fa-36c1-11ea-8227-e32937f459dc",variantUuid:"85570fa0-39e9-11ea-9d6f-3c9ab26afc27",vatPercentage:0,unitPrice:160,costPrice:96,rowTaxableAmount:80,name:"J2O",description:"",variantName:"Orange & Passionfruit",barcode:"50412037",autoGenerated:!1,id:"4",type:"PRODUCT",libraryProduct:!0}],istable:!0,isprocessing:!0,isclosed:!0,assignee:"false",assignee2:"false",time:"1598440747969",closetime:"1598441721685",tablenum:null},{order_id:6661,isnew:!0,products:[{quantity:"2",productUuid:"725c2fca-bd29-11ea-87e2-951dee1275ad",variantUuid:"725c30ba-bd29-11ea-87e2-951dee1275ad",vatPercentage:0,unitPrice:160,rowTaxableAmount:160,name:"Sausage Roll",description:"",variantName:"",autoGenerated:!1,id:"0",type:"PRODUCT",libraryProduct:!0},{quantity:"1",productUuid:"28bc2b7b-36c1-11ea-8227-e32937f459dc",variantUuid:"83092d40-3df5-11ea-9d7d-c270552b4ea0",vatPercentage:0,unitPrice:130,costPrice:78,rowTaxableAmount:65,name:"Crumpets with butter",description:"",variantName:"Two",comment:"With cheese And marmite",autoGenerated:!1,id:"1",type:"PRODUCT",libraryProduct:!0},{quantity:"1",productUuid:"66503216-d193-11ea-8ab8-b7ce88bfe09b",variantUuid:"665032f2-d193-11ea-8ab8-b7ce88bfe09b",vatPercentage:0,unitPrice:160,rowTaxableAmount:80,name:"Cheddar & Bacon Turnover",description:"",variantName:"",autoGenerated:!1,id:"2",type:"PRODUCT",libraryProduct:!0},{quantity:"1",productUuid:"e2887288-d33e-11ea-8ab8-b7ce88bfe09b",variantUuid:"40e80adc-d33f-11ea-8ab8-b7ce88bfe09b",vatPercentage:0,unitPrice:380,costPrice:120,rowTaxableAmount:190,name:"Jacket Potato",description:"",variantName:"Cheesy beans",autoGenerated:!1,id:"3",type:"PRODUCT",libraryProduct:!0},{quantity:"2",productUuid:"8a9a46a0-3c53-11ea-af63-a35e7b7f997a",variantUuid:"8a9b5810-3c53-11ea-8ecd-4580a25ffbac",vatPercentage:0,unitPrice:150,rowTaxableAmount:150,name:"Americano ",description:"",variantName:"",autoGenerated:!1,id:"4",type:"PRODUCT",libraryProduct:!0},{quantity:"1",productUuid:"b72e10f0-bc70-11ea-a335-f0c7289eea1f",variantUuid:"b72ead30-bc70-11ea-8c43-57da261984e4",vatPercentage:0,unitPrice:0,rowTaxableAmount:0,name:"Table 11",description:"",barcode:"",comment:"4ppl",autoGenerated:!1,id:"5",type:"PRODUCT",libraryProduct:!0}],istable:!0,isprocessing:!0,isclosed:!0,assignee:"false",assignee2:"false",time:"1598440618726",closetime:"1598441235286",tablenum:null},{order_id:1,isnew:!0,products:[{quantity:"1",productUuid:"28be2740-36c1-11ea-8227-e32937f459dc",variantUuid:"28be2741-36c1-11ea-8227-e32937f459dc",vatPercentage:0,unitPrice:0,rowTaxableAmount:0,name:"Misc Drink",description:"",variantName:"",autoGenerated:!1,id:"0",type:"PRODUCT",libraryProduct:!0}],istable:!1,isprocessing:!0,isclosed:!0,assignee:"false",assignee2:"false",time:null,closetime:null,tablenum:null}];function checkNew(){null===localStorage.getItem("newUser")&&window.newUserModal()}function setToSplit(){view="split",left=document.getElementById("content"),right=document.getElementById("right"),right.innerHTML="<h3 class='text-center'>Table Orders</h3>",left.innerHTML="<h3 class='text-center'>Takeaway Orders</h3>",left.setAttribute("style","width:45%;margin-left:5%;position:absolute;left:0;"),right.setAttribute("style","width:45%;margin-right:5%;position:absolute;right:0;")}function unSplit(){view="norm",left=document.getElementById("content"),right=document.getElementById("right"),left.setAttribute("style",""),right.setAttribute("style","")}function searchOrders(e){orders=allOrders;for(var t=0;t<orders.length;t++)if(currentid=orders[t].order_id,currentid==e)return orders[t];return dummy}function getCachedOrder(e){try{return order=sessionStorage.getItem(e),order=JSON.parse(order),null===order.isclosed?dummy:order}catch(t){return console.log(t),sessionStorage.setItem(e,JSON.stringify(dummy)),dummy}}function setCachedOrder(e){try{id=e.order_id,console.log("set to... "),console.log(e),e=JSON.stringify(e),sessionStorage.setItem(id,e)}catch(e){console.log(e)}}function newestOrder(){if(orders=allOrders,null==orders.length)return newestOrder();id=0;for(var e=0;e<orders.length;e++)currentid=orders[e].order_id,currentid>id&&(id=currentid);return id}function isClosed(e){return searchOrders(e).isclosed==getCachedOrder(e).isclosed?searchOrders(e).isclosed:searchOrders(e).isclosed!=getCachedOrder(e).isclosed&&getCachedOrder(e).isclosed}function isProcessing(e){return searchOrders(e).isprocessing==getCachedOrder(e).isprocessing?searchOrders(e).isprocessing:searchOrders(e).isprocessing!=getCachedOrder(e).isprocessing&&getCachedOrder(e).isprocessing}function isBarDone(e){return status=searchOrders(e).assignee2,status}function isKitDone(e){return status=searchOrders(e).assignee,status}function isTable(e){try{table=searchOrders(e).istable}catch(e){return!0}finally{return table}}function drawNth(e,t){let r=searchOrders(newestOrder()).order_id-e,a=r;if(null!=document.getElementById(r)&&"split"!=view&&document.getElementById(r).remove(),"split"==option&&0==isTable&&document.getElementById(divID).remove(),dbOrCacheClosed=isClosed(r),null==document.getElementById(r)&&0==dbOrCacheClosed&&isTable(r)==t){g=document.createElement("div"),g.setAttribute("id",r),g.setAttribute("style","margin: 10px"),g.setAttribute("class","card text-white bg-success mb-3"),g.setAttribute("onclick","highlight(this);"),isSplit=document.getElementById("content").getAttribute("style"),target="content","width:45%;margin-left:5%;position:absolute;left:0;"==isSplit&&(1==t&&(target="right"),0==t&&(target="content")),document.getElementById(target).appendChild(g),null==searchOrders(id).time&&updatePG(id,"time",Date.now()),document.getElementById(r).innerHTML=createOrderCardContent(searchOrders(r)),isProcessing(r)&&highlight2(g),document.getElementById("b"+a).addEventListener("click",function(){event.stopPropagation(),updatePG(a,"assignee2",!1),order=getCachedOrder(id),order.assignee2=!1,setCachedOrder(order),thisbutton=document.getElementById("b"+a),thisbutton.setAttribute("class","btn btn-success"),console.log("Order id: "+a+" Bar")}),document.getElementById("k"+a).addEventListener("click",function(){event.stopPropagation(),updatePG(a,"assignee",!1),order=getCachedOrder(id),order.assignee=!1,setCachedOrder(order),console.log("Order id: "+a+" Kitchen"),thisbutton=document.getElementById("k"+a),thisbutton.setAttribute("class","btn btn-success")}),SLAHighlight(r)}}function drawPastXTableOrders(e,t){if("asc"==t)for(i=e;i>=0;i--)drawNth(i,!0);if("desc"==t)for(i=0;i<=e;i++)drawNth(i,!0)}function drawPastXTakeawayOrders(e,t){if("desc"==t)for(r=0;r<=e;r++)drawNth(r,!1);if("asc"==t)for(var r=e;r>=0;r--)drawNth(r,!1)}function checkIfStillOpen(e){closed=isClosed(e),closed&&document.getElementById(e).remove()}function countOpen(e){for(count=0,i=0;i<=e;i++)thisOrder=searchOrders(newestOrder()-i),1!=isClosed(newestOrder()-i)&&isTable(newestOrder()-i)&&(count+=1);return count}function countOpenTake(e){for(count=0,i=0;i<=e;i++)thisOrder=searchOrders(newestOrder()-i),1!=isClosed(newestOrder()-i)&&0==isTable(newestOrder()-i)&&(count+=1);return count}function highlight(e){var t=e;id=t.getAttribute("id"),1==searchOrders(id).isprocessing&&remove2(e),t.setAttribute("class","card text-white bg-warning mb-3"),processOrder(id)}function highlight2(e){var t=e;id=t.getAttribute("id"),"card text-white bg-warning mb-3"==t.getAttribute("class")&&remove2(e),t.setAttribute("class","card text-white bg-warning mb-3")}function remove2(e){element=e,id=element.getAttribute("id"),closeOrderModal(id)}function remove(e){var t=e;id=t.getAttribute("id"),assignOrderModal(id,t)}function closeOrderModal(e){Swal.fire({title:"CONFRIM ORDER: "+(e%99+1),text:"Click Yes, to confirm the order as complete",icon:"success",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, close order!"}).then(t=>{t.value&&(closeOrder(e),setCacheClosedOrder(e),document.getElementById(e).remove())})}function assignOrderModal(e,t){Swal.fire({title:"Confirm all bar/kitchen items are complete: ",text:"Select the area which is complete",icon:"info",showCancelButton:!0,cancelButtonText:"Bar",confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Kitchen"}).then(t=>{t.value?(updatePG(e,"assignee",!1),assginOrder(e,"Kitchen")):(assginOrder(e,"Bar"),updatePG(e,"assignee2",!1))})}function alertModal(){Swal.fire({title:"Lots of open orders",text:"There are more than 7 open orders! ",icon:"info",confirmButtonColor:"#3085d6",confirmButtonText:"Ok"})}function newUserModal(){Swal.fire({title:"New User!",text:"Welcome to Orders App for The Way! If you have not used this before please speak to Rob/Steve/Sarah first.",icon:"info",confirmButtonColor:"#3085d6",confirmButtonText:"I Understand"}).then(e=>{localStorage.setItem("newUser","false")})}function closeOrder(e){document.getElementById(e).remove(),updatePG(e,"isclosed",!0),updatePG(e,"closetime",Date.now()),order=getCachedOrder(e),order.isclosed=!0,setCachedOrder(order)}function updatePG(e,t,r){var a={url:"/update",method:"POST",timeout:0,headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{value:r,id:e,column:t}};$.ajax(a).done(function(e){}).fail(function(e){console.log("fail ")})}function assginOrder(e,t){document.getElementById("a"+e).innerHTML=t,updatePG(e,"assignee",t)}function processOrder(e){setCacheProcessingOrder(e),updatePG(e,"isprocessing",!0),order=getCachedOrder(e),order.isprocessing=!0,setCachedOrder(order)}socket.on("load",function(e){console.log("loading data..."),console.log(e.db),allOrders=e.db}),socket.on("db",function(e){allOrders=e.db,console.log("a change occured..."),console.log(allOrders)}),setTimeout(function(){checkNew()},1e3);var initCounter=0,displayOrder="asc",numOfPastOrders=20,slaTime=3600,option="split",audio=new Audio("https://github.com/joshuscurtis/theway/raw/master/piece-of-cake.mp3");function refresh(){getAllOrders(),setTimeout(refresh,500)}function refresh2(){content=document.getElementById("content"),content.innerHTML="","table"==option&&(unSplit(),drawPastXTableOrders(numOfPastOrders,displayOrder),openOrders=countOpen(numOfPastOrders)),"takeaway"==option&&(unSplit(),drawPastXTakeawayOrders(numOfPastOrders,displayOrder),openOrders=countOpenTake(numOfPastOrders)),"split"==option&&(openOrders=countOpen(numOfPastOrders)+countOpenTake(numOfPastOrders),setToSplit(),drawPastXTakeawayOrders(numOfPastOrders,displayOrder),drawPastXTableOrders(numOfPastOrders,displayOrder)),count=document.getElementById("count"),count.innerHTML="<strong col>Open Orders: "+openOrders+"</strong>",openOrders>=5&&count.setAttribute("style","color: red;"),openOrders<=4&&count.setAttribute("style","color: orange;"),openOrders<=2&&count.setAttribute("style","color: green;"),loader=document.getElementById("loader"),null!=loader&&loader.remove(),setTimeout(refresh2,1e3)}function getAllOrders(){}function createTime(e){var t=new Date(1*e),r=(t.getHours(),"0"+t.getMinutes()),a="0"+t.getSeconds();return r.substr(-2)+":"+a.substr(-2)}function SLAHighlight(e){thisOrder=searchOrders(e),orderTime=thisOrder.time,card=document.getElementById(e),Math.round((Date.now()-orderTime)/1e3)>slaTime&&(currentClass=card.getAttribute("class"),card.setAttribute("class","flashit "+currentClass))}function getTableNum(e){for(var t,r=0;r<e.length;r++)"Table"==e[r].name.substring(0,5)&&(t=e[r].name.substring(6,10));return t}function createCardTitle(e,t,r){var a,n=getTableNum(t);return 1==e&&(a=" <h5> Table "+n+" (Order: "+(r%99+1)+")</h5>"),0==e&&(a=" <h5> Order: "+(r%99+1)+"</h5>"),a}function createAssigneeButtons(e,t){var r="";return null!=e&&"true"!=e||(e="danger"),null!=t&&"true"!=t||(t="danger"),"false"==e&&(e="success"),"false"==t&&(t="success"),"success"==t&&"success"==e&&(r="Done"),[e,t,r]}function createOrderCardContent(e){var t=e,r=t.order_id,a=t.products,n=t.istable,s=(t.isclosed,t.isnew,t.time),i="",o="",d='<div class="card text-center" style="background-color: inherit">'+createCardTitle(n,a,r)+'<div style="padding: 0;" class="card-body"><h5 class="card-title">';SLAHighlight(r);for(var c=0;c<a.length;c++)"Table"!=a[c].name.substring(0,5)&&(null==a[c].variantName||""==a[c].variantName?o="<p>"+o+"<p><strong>"+a[c].name+"</strong> <br> Qty: <a id='qty'>"+a[c].quantity+" </a> <br>":(i="<br>"+a[c].variantName+"<br>",o="<p>"+o+"<p><strong>"+a[c].name+"</strong><i>"+i+"</i> Qty: <i> <a id='qty'>"+a[c].quantity+"</a> </i> <br>"),null!=a[c].comment&&(o="<p>"+o+"Comments:<i> "+a[c].comment+"</i><br> </p>"));return assignData=createAssigneeButtons(t.assignee,t.assignee2),cachedAssignData=createAssigneeButtons(getCachedOrder(r).assignee,getCachedOrder(r).assignee2),assignee=assignData[0]||cachedAssignData[0],assignee2=assignData[1]||cachedAssignData[1],o=(o='<button onclick="event.stopPropagation();remove(this.parentNode.parentNode.parentNode)" style="position: absolute; top: 0px; right: 1px;" type="button" class="close" aria-label="Close"><span class="fa fa-cog" aria-hidden="true"></span></button><p>'+o+"<b id='a"+r+"' style='color:black;'> "+cachedAssignData[2]+"</b><br> </p>")+'<button id="b'+r+'" type="button" style="position: absolute;bottom: 0px;right: 1px;max-width: 80px;width: 25%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" class="btn btn-'+assignee2+'"><i class="fa fa-coffee" style="margin-right: 5px;" ></i> Bar</button><button  onclick="updatePG('+r+', "assignee", false);" id="k'+r+'" type="button" style="position: absolute;bottom: 0px;left: 1px;max-width: 80px;width: 25%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" class="btn btn-'+assignee+'"><i style="margin-right: 5px;" class="fa fa-cutlery"></i> Kitchen</button>',buildHTML=d+"</h5>"+o+createTime(Date.now()-s)+"</div></div>",o="",buildHTML}function setCacheClosedOrder(e){orderData=searchOrders(e),orderData.isclosed=!0,sessionStorage.setItem(e,JSON.stringify(orderData))}function getCacheClosedOrder(e){return orderData=JSON.parse(sessionStorage.getItem(e)),null!=orderData&&orderData.isclosed}function setCacheProcessingOrder(e){orderData=searchOrders(e),orderData.isprocessing=!0,sessionStorage.setItem(e,JSON.stringify(orderData))}function getCacheProcessingOrder(e){return orderData=JSON.parse(sessionStorage.getItem(e)),null!=orderData&&orderData.isprocessing}function setCacheAssigneeOrder(e,t){orderData=searchOrders(e),orderData.assignee=t,sessionStorage.setItem(e,JSON.stringify(orderData))}function getCacheAssigneeOrder(e){return orderData=JSON.parse(sessionStorage.getItem(e)),null!=orderData&&orderData.assignee}function setCacheAssignee2Order(e,t){orderData=searchOrders(e),orderData.assignee2=t,sessionStorage.setItem(e,JSON.stringify(orderData))}function getCacheAssignee2Order(e){return orderData=JSON.parse(sessionStorage.getItem(e)),null!=orderData&&orderData.assignee2}setInterval(function(){openOrders>7&&alertModal()},6e4),setTimeout(refresh,1e3),setTimeout(refresh2,5e3),dummy={istable:!0,order_id:0,products:[{quantity:"1",name:"Table 00",id:"0"},{quantity:"999",name:"error",id:"1"},{quantity:"1",name:"ERROR ERROR",id:"2"},{quantity:"1",name:"ERROR",id:"3"}],isnew:!0,isclosed:!0,isprocessing:null,assignee:"An ERROR has occured."};