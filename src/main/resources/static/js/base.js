/*********************************
 *          List Page
 ********************************/
 var curMenu;

function addRow(data){
    $("#nodata").addClass("uk-hidden");
    $("#nextBtn").hide();
    $("#loading").removeClass("uk-active");
    $('#item_list').html("");
    var list='';
    var functionBtn;

    $.each(data, function(i, item){
        var j = i + 1;
        var id = "id" + j;
        if(curMenu == "vm"){
                var removeOnclick = "removeBtn('" + id + "');"
                functionBtn = "<button class='uk-button uk-button-medium' type='button' id='remove-button' onclick=" + removeOnclick + ">REMOVE</button>";
            }else{
                var modalTarget = "{target:'#modal-input'}"
                var addOnclick = "addBtn('" + id + "');"
                functionBtn = "<button class='uk-button uk-button-medium' type='button' id='add-button' onclick=" + addOnclick + ">ADD</button>";
            }
        with(item){
            list+="<tr id=" + id + ">"+
                "<td class='uk-text-center'>" + j + "</td>"+
                "<td class='uk-text-center'>" + uuid + "</td>"+
                "<td class='uk-text-center'>" + name + "</td>"+
                "<td class='uk-text-center'>" + functionBtn + "</td>"+
                '</tr>';
        }
    });
    if (data.length == 0) {
        $("#nodata").removeClass("uk-hidden");
    }else{
        $('#item_list').append(list);
        $("#nodata").addClass("uk-hidden");
    }
    $("#loading").addClass("uk-hidden");
}
function setMenuOnclickListener(menu){
     curMenu = menu;
     console.log("menu : " + curMenu);
    $("#vm").click( function() {
        curMenu = "vm";
        window.location.href='/xen/list?type=vm';
        return false;
    });
    $("#snap").click( function() {
        curMenu = "snap-shot";
        window.location.href='/xen/list?type=snap-shot';
        return false;
    });
    if(menu == "vm"){
        $("#vm-button").addClass("uk-active");
    }else if(menu == "snap-shot"){
        $("#snap-button").addClass("uk-active");
    }
}

function addBtn(index){
    var trNode = document.getElementById(index);
    var uuid = trNode.childNodes[1].innerHTML;
    var name = trNode.childNodes[2].innerHTML;
    var loc = index.split('d')[1];
    var realIndex = loc - 1;
    console.log("add : " + index);

    $('#modal-snap-name').html(name);
    $('#modal-snap-uuid').html(uuid);

    var modal = UIkit.modal("#modal-input");
    modal.show();
}

function removeBtn(index){
    var trNode = document.getElementById(index);
    var uuid = trNode.childNodes[1].innerHTML;
    var name = trNode.childNodes[2].innerHTML;
    var loc = index.split('d')[1];
    var realIndex = loc - 1;

    $("#modal-list-index").html(realIndex);
    $('#modal-vm-name').html(name);
    $('#modal-vm-uuid').html(uuid);

    var modal =  UIkit.modal("#modal-remove");
    modal.show();
}

function modalRemoveBtn(){
    var realIndex = $("#modal-list-index").html();
    var name = $('#modal-vm-name').html();
    var uuid = $('#modal-vm-uuid').html();
    var modal =  UIkit.modal("#modal-remove");

    $.ajax({
            type: "get",
            cache: false,
            url: '/xen/remove?vmName=' + name + '&vmUuid=' + uuid,
            async: true,
            success: function(data){
                if(data.status == "success"){
                    modal.hide();
                    list.splice(realIndex, 1);
                    addRow(list);
                    alert("remove success!");
                }else{
                    alert("fail..." + data.message);
                }
            },
            error: function(xhr,Textstatus,error) {
                alert(Textstatus);
            }
        });
}

function modalAddBtn(){
    var snapName = $('#modal-snap-name').html();
    var snapUuid = $('#modal-snap-uuid').html();
    var inputName = $('#input-name').val();
    var modal = UIkit.modal("#modal-input");
    //send request to controller
    $.ajax({
            type: "get",
            cache: false,
            url: '/xen/add?vmName=' + inputName + '&snapUuid=' + snapUuid + '&snapName=' + snapName,
            async: true,
            success: function(data){
                console.log(data);
                if(data.status == "success"){
                    modal.hide();
                    alert("add success!");
                }else{
                    //display error message
                    $('#modal-add-fail').html(data.message);
                    $('#modal-add-fail').removeClass("uk-hidden");
                }
            },
            error: function(xhr,Textstatus,error) {
                alert(Textstatus);
            }
        });
}
