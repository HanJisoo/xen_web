/*********************************
 *       Machine List Page
 ********************************/
function pagination(data){
    var curIndex = data.currentIndexPage;
    var size = data.endPage - data.startPage + 1;
    var listHtml = "";
    $('#pagination').html('');
    for(var i = 0; i < size; i++){
        var index = data.startPage + i;
        if(index == curIndex){
            listHtml = listHtml + "<li class='uk-active'><span>" + index + "</span></li>";
        }else{
            listHtml = listHtml + "<li><a role='button' onclick='getList(" + index + ");'>" + index + "</a></li>";
        }
    }
    $('#pagination').html(listHtml);
}
function addMachineRow(data){
    $("#nodata").addClass("uk-hidden");
    $("#nextBtn").hide();
    $("#loading").removeClass("uk-active");
    $('#item_list').html("");
    var list='';
    $.each(data.machineList, function(i, item){
        with(item){
            list+="<tr>"+
                "<td class='uk-text-center'>" + machineNo + "</td>"+
                "<td class='uk-text-center'>" + serialKey + "</td>"+
                "<td class='uk-text-center'>" + clientCompanyName + "</td>"+
                "<td class='uk-text-center'>" + stateValue + "</td>"+
                "<td class='uk-text-center'>" + adminCompanyName + "</td>"+
                "<td class='uk-text-center'>" + countryValue + "</td>"+
                "<td class='uk-text-center'>" + modelValue + "</td>"+
                "<td class='uk-text-center'>" + licenseEndDate + "</td>"+
                "<td class='uk-text-center'>" + "down" + "</td>" +
                '</tr>';
        }
    });
    if (page==1 && (data.length == 0)) {
        $("#nodata").removeClass("uk-hidden");
        $("#nextBtn").hide();
    }else{
        $('#item_list').append(list);

        if(data.length>=data.offset){
            $("#nextBtn").show();
        }
        $("#nodata").addClass("uk-hidden");
    }
    $("#loading").addClass("uk-hidden");
}
function getList(page){
    $.ajax({
        type: "get",
        cache: false,
        url: "/machine/list?page="+page,
        async: true,
        success: function(data){
            console.log(data);
            pagination(data);
            addMachineRow(data);
        },
        error: function(xhr,Textstatus,error) {
            alert(Textstatus);
        }
    });
}
function setMenuOnclickListener(menu){
    $("#statistics").click( function() {
        window.location.href='/machine/view/list';
        return false;
    });
    $("#machine").click( function() {
        window.location.href='/machine/view/list';
        return false;
    });
    $("#partner").click( function() {
        window.location.href='/machine/view/list';
        return false;
    });
    $("#customer").click( function() {
        window.location.href='/machine/view/list';
        return false;
    });
    $("#contact").click( function() {
        window.location.href='/machine/view/list';
        return false;
    });
    $("#admin").click( function() {
        window.location.href='/machine/view/list';
        return false;
    });

    if(menu == "machine"){
        $("#machine-button").addClass("uk-active");
    }else if(menu == "statistics"){
        $("#statistics-button").addClass("uk-active");
    }else if(menu == "partner"){
        $("#partner-button").addClass("uk-active");
    }else if(menu == "customer"){
        $("#customer-button").addClass("uk-active");
    }else if(menu == "contact"){
        $("#contact-button").addClass("uk-active");
    }else if(menu == "admin"){
        $("#admin-button").addClass("uk-active");
    }
}
function setAddButtonListener() {
    $('#add-button').click( function() {
        window.location.href='/machine/view/add';
        return false;
    });
}
function addOptionByCategory(category, codeControlList){
    var list;
    var html = "";
    var node;

    if(category == "model"){
        list = codeControlList.modelAll;
        node = $("#model-select");
    }else if(category == "state"){
        list = codeControlList.stateAll;
        node = $("#state-select");
    }else if(category == "virus"){
        list = codeControlList.virusAll;
        node = $("#virus-select");
    }else if(category == "producer"){
        list = codeControlList.producerAll;
        node = $("#producer-select");
    }else if(category == "country"){
        list = codeControlList.countryAll;
        node = $("#country-select");
    }

    $.each(list, function(i, item){
        with(item){
            var num = i + 2;
            html+= "<option value='" + code + "'>" + value + "</option>";
        }
    });

    node.append(html);
}
function addSelectOption(codeControlList){
    addOptionByCategory("model", codeControlList);
    addOptionByCategory("state", codeControlList);
    addOptionByCategory("virus", codeControlList);
    addOptionByCategory("producer", codeControlList);
    addOptionByCategory("country", codeControlList);
}
/********************************
 *       Machine Add Page
 ********************************/
var serialKey, modelCode, modelValue, prefixCode, prefixValue, twoTmp;
function start() {
    serialKeyMethod();
}
function serialKeyMethod(){
    var serialKeyForm = document.serialKeyData;
    var serialKeyDataSize = serialKeyForm.elements[0].value;
    var prefixDataSize;
    var dataMaxSize = 1000;

    for(var i=0;i<dataMaxSize;i++)
    {
        if(serialKeyForm.elements[i].value=='end'){
            serialKeyDataSize=i;
            break;
        }
    }
    for(i=0;i<dataMaxSize;i++){
        if(prefixCodeData.elements[i].value=='end'){
            prefixDataSize=i;
            break;
        }
    }
    serialKey=new Array(serialKeyDataSize);
    modelCode=new Array(serialKeyDataSize);
    modelValue=new Array(serialKeyDataSize);
    prefixCode=new Array(prefixDataSize);
    prefixValue=new Array(prefixDataSize);
    for(i=0;i<serialKeyDataSize;i++)
    {
        serialKey[i]=document.serialKeyData.elements[i].value;
        modelCode[i]=document.modelCodeData.elements[i].value;
        modelValue[i]=document.modelValueData.elements[i].value;
        if(i<prefixDataSize)
        {
            prefixCode[i]=document.prefixCodeData.elements[i].value;
            prefixValue[i]=document.prefixValueData.elements[i].value;
        }
    }
}
function alwaysCheck(checkObj) {
    checkObj.checked = true;
}
function onlyOneCheck(checkObj) {
    if(checkObj.checked) {
        var otherCheckObj;
        if("sandboxLicense" === checkObj.name) {
            otherCheckObj = jQuery("#tmseOptionPackLicense input[name*='inspectorLicense']");
        } else {
            otherCheckObj = jQuery("#tmseOptionPackLicense input[name*='sandboxLicense']");
        }
        if(otherCheckObj.attr('checked')) {
            otherCheckObj.attr('checked', false);
            alert("only one check. interlocking or integration");
        }
    }
}
function machineAddSubmit(){
    var formX=document.forms[0];
    var one= formX.serialOne.value;
    var two= formX.serialTwo.value;
    var serialExp = /^[0-9]+$/;

    if(formX.modelCode.value==''){
        alert('Model  is required');
        formX.modelCode.focus();
    }else if(!serialExp.test(two)){
        alert('You must serialKey change ! ');
        formX.serialTwo.value=twoTmp;
        formX.serialTwo.focus();
    }else if(formX.stateCode.value==''){
        alert('Status  is required !');
        formX.stateCode.focus();
    }else if(formX.stateCode.value != 'AH013' && formX.stateCode.value != 'AH015' && formX.stateCode.value != 'AH016' && formX.virusCode.value==''){
        alert('Virus  is required!');
        formX.virusCode.focus();
    }else if(formX.countryCode.value==''){
        alert('Country   is required !');
        formX.countryCode.focus();
    }else if(formX.stateCode.value != 'AH013' && formX.stateCode.value != 'AH015' && formX.stateCode.value != 'AH016' && formX.licenseEndDate.value==''){
        alert('ExpireDate  is required !');
        formX.licenseEndDate.focus();
    }else{
        if (!confirm("Please check the items below.\n1. Virus Engine update\n2. Virus and Spam (Engine) validity period\nWould you like to save?")) {
            return;
        }
        var changeSerialKey=one+'-'+two;
        formX.serialKey.value=changeSerialKey;
        var changeSerialNumber=formX.serialKey.value.substring(4);
        formX.serialNumber.value=changeSerialNumber;

        if(formX.macAddressSelector.value == 'product'){
            formX.macAddress.value = $("#macAddressVal").val();
        } else{
            formX.macAddress.value = formX.macAddressSelector.value;
        }
        formX.submit();
    }
}
function modelSelect(ch){
    var  form=document.forms[0];
    var  choiceIndex=ch.selectedIndex;
    var  modelData=ch.options[choiceIndex].text;
    if(choiceIndex==0)
    {
        form.serialOne.value='';
        form.serialTwo.value='';
    }
    for(var i=0;i<modelValue.length;i++)
    {
        if(modelValue[i]==modelData)
        {

            form.serialKey.value=serialKey[i];
            form.serialOne.value=serialKey[i].substring(0,10);
            form.serialTwo.value=serialKey[i].substring(11,14);
            twoTmp=form.serialTwo.value;


            form.serialNumber.value=serialKey[i].substring(4);
            break;
        }

    }
    for(i=0;i<prefixValue.length;i++)
    {
        // alert(prefixValue[i]+"::11::"+form.serialKey.value.substring(0,2))
        if(prefixValue[i]==form.serialKey.value.substring(0,2))
        {
            // alert(prefixCode[i]+"::"+prefixValue[i]);
            form.prefixCode.value=prefixCode[i];// prefix[i];
            form.prefixValue.value=prefixValue[i];// prefix[i];
        }
    }

    if(modelData == "TMS000") {
        var tms000Code = 'AH013';
        form.stateCode.value = tms000Code;
        changeState(tms000Code);
    } else if (modelData == "SNS000") {
        changeState("AH015");
    } else if (modelData == "TMA002") {
        var tma002Code = 'AH016';
        form.stateCode.value = tma002Code;
        changeState(tma002Code);
    } else {
        form.stateCode.value = '';
        changeState('');
    }
}
function changeState(value){
    var f=document.forms[0];
    $("input[name=suspicionLicense]").attr("checked", false);
    if(f.modelCode.value == 'AA011' && value != 'AH013') {
        alert("if Model is TMS000, you can't change State.");
        f.stateCode.value = 'AH013';
        return;
    }

    // TMSE 로 시작하는 제품명일 경우
    var string = $("select[name='modelCode'").find('option:selected').text(), substring = "TMSE-";
    if(string.indexOf(substring) > -1){
        document.getElementById("expireDate").style.display = "";
        document.getElementById("userLicense").style.display = "none";
        document.getElementById("spamLicense").style.display = "none";

        if(f.virusCode.options[f.virusCode.selectedIndex].value == 'AC006' || f.virusCode.options[f.virusCode.selectedIndex].value == 'AC007')
            document.getElementById("virusLicense").style.display = "";
        else
            document.getElementById("virusLicense").style.display = "none";

        document.getElementById("virus").style.display = "";
        document.getElementById("optionPackLicense").style.display = "none";
        document.getElementById("tmseOptionPackLicense").style.display = "";

        f.applianceType.value ="TMW/A";

        $("input[name=suspicionLicense]").attr("checked", true);
    }

    else if(value == 'AH013'){ // TMS7
        document.getElementById("expireDate").style.display = "none";
        document.getElementById("userLicense").style.display = "";
        document.getElementById("spamLicense").style.display = "";
        document.getElementById("virusLicense").style.display = "";
        document.getElementById("virus").style.display = "none";
        document.getElementById("optionPackLicense").style.display = "";
        document.getElementById("tmseOptionPackLicense").style.display = "none";
//    		 hideMacAddress();
        f.applianceType.value = "TMS";
    } else if (value == "AH015") { //SNS
        document.getElementById("expireDate").style.display = "";
        document.getElementById("userLicense").style.display = "";
        document.getElementById("spamLicense").style.display = "none";
        document.getElementById("virusLicense").style.display = "none";
        document.getElementById("virus").style.display = "none";
        document.getElementById("optionPackLicense").style.display = "none";
        document.getElementById("tmseOptionPackLicense").style.display = "none";
//    		 hideMacAddress();

        f.applianceType.value = "SNS";
    } else if (value == "AH016") {
        document.getElementById("expireDate").style.display = "none";
        document.getElementById("userLicense").style.display = "";
        document.getElementById("spamLicense").style.display = "none";
        document.getElementById("virusLicense").style.display = "none";
        document.getElementById("virus").style.display = "none";
        document.getElementById("optionPackLicense").style.display = "none";
        document.getElementById("tmseOptionPackLicense").style.display = "none";
//    		 hideMacAddress();

        f.applianceType.value = "TMS";
    }else{
        document.getElementById("expireDate").style.display = "";
        document.getElementById("userLicense").style.display = "none";
        document.getElementById("spamLicense").style.display = "none";

        if(f.virusCode.options[f.virusCode.selectedIndex].value == 'AC006' || f.virusCode.options[f.virusCode.selectedIndex].value == 'AC007')
            document.getElementById("virusLicense").style.display = "";
        else
            document.getElementById("virusLicense").style.display = "none";

        document.getElementById("virus").style.display = "";
        document.getElementById("optionPackLicense").style.display = "none";
        document.getElementById("tmseOptionPackLicense").style.display = "none";

        f.applianceType.value ="TMW/A";
    }
}
