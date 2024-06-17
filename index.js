const modal = document.querySelector('.modal');
const sym_1 = document.querySelector('.modal_sym_1');
const sym_2 = document.querySelector('.modal_sym_2');
const sym_3 = document.querySelector('.modal_sym_3');
const sym_4 = document.querySelector('.modal_sym_4');
const sym_5 = document.querySelector('.modal_sym_5');
const sym_6 = document.querySelector('.modal_sym_6');
const sym_7 = document.querySelector('.modal_sym_7');
const sym_8 = document.querySelector('.modal_sym_8');
const sym_9 = document.querySelector('.modal_sym_9');
const sym_10 = document.querySelector('.modal_sym_10');
const sym_11 = document.querySelector('.modal_sym_11');
const sym_12 = document.querySelector('.modal_sym_12');
const btn_close = document.querySelector('.btn_close');



function sym_info(val_index) {
    if (val_index == 0){
        modal.style.display = "block"
        sym_1.style.display = "block"
    } else if (val_index == 1){
        modal.style.display = "block"
        sym_2.style.display = "block"
    } else if (val_index == 2){
        modal.style.display = "block"
        sym_3.style.display = "block"
    } else if (val_index == 3){
        modal.style.display = "block"
        sym_4.style.display = "block"
    } else if (val_index == 4){
        modal.style.display = "block"
        sym_5.style.display = "block"
    } else if (val_index == 5){
        modal.style.display = "block"
        sym_6.style.display = "block"
    } else if (val_index == 6){
        modal.style.display = "block"
        sym_7.style.display = "block"
    } else if (val_index == 7){
        modal.style.display = "block"
        sym_8.style.display = "block"
    } else if (val_index == 8){
        modal.style.display = "block"
        sym_9.style.display = "block"
    } else if (val_index == 9){
        modal.style.display = "block"
        sym_10.style.display = "block"
    } else if (val_index == 10){
        modal.style.display = "block"
        sym_11.style.display = "block"
    } else if (val_index == 11){
        modal.style.display = "block"
        sym_12.style.display = "block"
    } else {
        alert("Unknown Error")
    }
}

function close_modal() {
    modal.style.display = "none"
    sym_1.style.display = "none"
    sym_2.style.display = "none"
    sym_3.style.display = "none"
    sym_4.style.display = "none"
    sym_5.style.display = "none"
    sym_6.style.display = "none"
    sym_7.style.display = "none"
    sym_8.style.display = "none"
    sym_9.style.display = "none"
    sym_10.style.display = "none"
    sym_11.style.display = "none"
    sym_12.style.display = "none"
}