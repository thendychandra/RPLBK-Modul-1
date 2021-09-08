var isLock = false;
var petition = "Peter please answer the following question"
var split = petition.split("");
var random = [" Maybe next time..."," I want you to try again tomorrow."," I don't feel like answering that."," I refuse to answer."];
var txt = document.getElementById("ptt");
var qst = document.getElementById("qst");
var btn_submit = document.getElementById("submit");
var btn_reset = document.getElementById("reset");
var loading = document.getElementById("loading");
var counter = 0;
var key = false;
var answer_key = "";
var answer = "";
var last_count = 0;

const change = () => {
    var count = txt.value.length;
    counter = count-1;
    var first_char = txt.value.charAt(0);
    var last_char = txt.value.charAt(count-1);
    key = count == 1 || isLock ? true:false;

    if(count != 0){ //biar gk undefinied pas length = 0
        if(first_char=="." && key){
            isLock = true;
        }else{
            if(last_char=="." && count != 1){
                counter == 0 ? txt.value = split[counter] : build();
                lock();
            }
        }
        if(key){ //belum pencet "." lagi
            if(isLock){ //masuk mode edit
                var txt_ori = txt.value.charAt(count-1);
                if(count<=last_count){ //untuk klo di hapus (backspace)
                    answer_key = answer_key.slice(0, -1);
                }else{
                    answer_key = answer_key+txt_ori;
                }
                last_count = count;
                counter == 0 ? txt.value = split[counter] : build();
            }else{ //mode normal
                txt.value = txt.value;
            }
        }else{
            lock();
        }
    }else{
        txt.value = txt.value;
        answer_key = "";
        var last_count = 0;
        lock();
    }
}

const build = () => {
    var txt_new="";
    for(var i=0; i<counter; i++){
        txt_new = txt_new+txt.value.charAt(i);
    }
    txt.value = txt_new+split[counter];
}

const lock = () =>{
    key = false;
    isLock = false;
}

const submit = () =>{
    loading.style.display = "";
    var count = txt.value.length;
    var count_qst = qst.value.length;
    var num = Math.floor(Math.random() * 4);
    var answer_text = random[num];
    
    answer = count==0?"You must enter a valid petition":(
        count_qst == 0?"You must enter a valid question":(
            txt.value == "Peter please answer the following question" || txt.value == "Peter please answer"?(
                answer_key == ""?show_answer(answer_text):show_answer(answer_key)
            ):"You must enter a valid petition"
        )
    );
    if(txt.disabled == false){ //biar lgs tampil tanpa loading
        loading.style.display = "none"
        document.getElementById("show").innerHTML = "";
        document.getElementById("show").innerHTML = "Peter answers: <br>"+answer;
    }
}

const show_answer = (text) =>{
    load_answer(text.substring(1));
    setTimeout( () => loading.style.display = "none", 1500);
    document.getElementById("show").innerHTML = "";
    btn_submit.style.display = "none";
    btn_reset.style.display = "";
    txt.disabled = true;
    qst.disabled = true;
}

async function load_answer(text) {
    let promise = new Promise(function(myResolve, myReject) {
      setTimeout(function() { myResolve("Peter answers: <br>"+text); }, 2000);
    });
    document.getElementById("show").innerHTML = await promise;
}

const reset = () =>{
    counter = 0;
    last_count = 0;
    answer_key = "";
    answer = "";
    txt.value="";
    qst.value="";
    txt.disabled = false;
    qst.disabled = false;
    lock();
    document.getElementById("show").innerHTML = "Welcome to Peter Answers...<br>Do you need to ask a question? Are you looking for answers? Peter offers you a space to ask anything you want. However, before each question you must write a petition. If the answer is not what you expected, at least you make catharsis and ask again.";
    btn_submit.style.display = "";
    btn_reset.style.display = "none";
}