(function(window){'use strict';
    var comandos = [
        {
            description:"Trigger the creation of a note with your voice ! Say the command and replace the * With the content of your note. <br> Example: <b>Make me a note call my mother this sunday</b>",
            indexes:["Make me a note *","Create a note *","Remember me *"],
            smart:true,
            action:function(index,wildcard){
                var id = parseInt($("#sticky_notes_container li").last().data("noteid")) + 1;
                if(isNaN(id)){
                    id = 1;
                }
                
                AddNote(wildcard,id,true);
                    switch(artyom.getLanguage()){
                        case "en-GB":
                        case "en-US":
                            artyom.say("The note has been added succesfully");
                        break;
                        
                    }
            }
        },
        {
            description:"Remove a note with the identified number! Replace the * With the number of an existing note <br> Example : <b>Remove note number 1</b>",
            indexes:["Remove note number *","Remove the note number *","Delete the note number *","Delete note number *"],
            smart:true,
            action:function(index,wildcard){
                var number = wildcard;
                
                if(isNaN(number)){
                    artyom.say("Cannot remove the note with id : " + number + " . Is not numeric, if you say a number maybe, artyom doesn't give a numeric value, instead give in characters. Try again.");
                }else{
                    RemoveNoteNumber(number);
                    
                    switch(artyom.getLanguage()){
                        case "en-US":
                        case "en-GB":
                            artyom.say("The note will not appear anymore in the list");
                        break;
                        
                    }
                }
            }
        },
        {
            description:"Removes all the notes saved in the document",
            indexes: ["Remove all the notes","Remove everything","Delete all","Delete all the notes"],
            action:function(){
                switch(artyom.getLanguage()){
                    case "en-US":
                    case "en-GB":
                        artyom.say("Are you sure you want to remove all the notes? You can't undo this action",{
                            onEnd:function(){
                                if(confirm("Delete all the notes?")){
                                    window.localStorage.setItem("notes","[]");
                                    $("#sticky_notes_container").empty();
                                }
                            }
                        });
                    break;
                    
                }
            }
        }
    ];
    
    /**
     * Add the commands to artyom !
     * @param {type} param
     */
    artyom.addCommands(comandos);
    
    artyom.redirectRecognizedTextOutput(function(output,isFinal){
        if(!isFinal){
            $("#output-artyom").text(output);
        }else{
            $("#output-artyom").text("");
        }
    });
    
    $(window).load(function(){
        RenderCommands();
        //We create an artyom extension in order to call it when we want 
        artyom.extensions.StartMainDemo = function(lang){
            artyom.initialize({
                lang:lang,
                continuous:true,//Listen forever
                listen:true,
                debug:true
            });
        };
        
        artyom.extensions.StartMainDemo($("#language-selector").val());
    });
    
    $(function(){
        if(!artyom.device.isChrome){
            alert("ARTYOM ONLY WORKS IN Google Chrome BROWSER");
        }
        
        if(!window.localStorage.getItem("notes")){
            window.localStorage.setItem("notes",'[{"id":"1","content":"Reminder: create something awesome with artyom later"},{"id":"2","content":"Trigger the creation of a note with your voice ! Say the command and replace the * With the content of your note. <br> Example: <b>Make me a note call my mother this sunday</b>"}]');
        }
        
        var notas = JSON.parse(window.localStorage.getItem("notes"));
        
        for(var i = 0;i < notas.length;i++){
            AddNote(notas[i].content,notas[i].id,false);
        }
        
        if(window.localStorage.getItem("lang")){
            $("#language-selector").val(window.localStorage.getItem("lang"));
        }
        
        $("#language-selector").change(function(){
            artyom.fatality();//Stop Any previous artyom if exist
            var lang = $(this).val();
            window.localStorage.setItem("lang",lang);
            setTimeout(function(){
                artyom.extensions.StartMainDemo(lang);
            },2000);
        });
    });
    
    function AddNote(content,id,addToLocal){
        if(typeof(window.localStorage) !== "undefined"){
            if(addToLocal === true){
                var notitas = window.localStorage.getItem("notes");
                if(notitas){
                    var group = JSON.parse(notitas);
                    group.push({id:id,content:content});
                    window.localStorage.setItem("notes",JSON.stringify(group));
                }else{
                    var neu = [{id:id,content:content}];
                    window.localStorage.setItem("notes",JSON.stringify(neu));
                }
            }
        }
        
        var note = '<li data-noteid="'+id+'" title="Click to talk this note">\n\
                    <a href="javascript:void(0);" onclick="sayNoteContent(this);">\n\
                      <h2>Note #'+id+'</h2>\n\
                      <p>'+content+'</p>\n\
                    </a>\n\
                  </li>';
        $("#sticky_notes_container").append(note);
    }
    
    function RemoveNoteNumber(id){
        var notas = JSON.parse(window.localStorage.getItem("notes"));
        var found = false;
        
        for(var i = notas.length - 1; i >= 0; i--) {
            if(notas[i].id == id) {
               notas.splice(i, 1);
               found = true;
            }
        }
        
        if(!found){
            alert("Cannot remove note number " + id + " because it doesn't exist !");
        }
        
        window.localStorage.setItem("notes",JSON.stringify(notas));
        
        $("li[data-noteid='"+id+"']").remove();
    }
    
    
    function RenderCommands(){
        var comandi = artyom.getAvailableCommands();
        
        for(var i = 0;i < comandi.length;i++){
            var com = comandi[i];
            var list = "";
            for(var q = 0;q < com.indexes.length;q++){
                list += "<br>" + com.indexes[q];
            }
            
            var row = '<tr>\n\
                        <td>'+list+'</td>\n\
                        <td>'+com.description+'</td>\n\
                        </tr>';
            $("#table-commands tbody").append(row);
        }
    }
    
    function RestartDemo(){
        window.localStorage.removeItem("notes");
        window.localStorage.removeItem("lang");
        window.location.reload();
    }
    
    function sayNoteContent(dom){
        artyom.say($(dom).find("p").text());
    }
})(window);
