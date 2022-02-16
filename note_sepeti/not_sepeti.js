const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');


yeniGorevEkleBtn.addEventListener('click', gorevEkle);
gorevListesi.addEventListener('click', gorevSilTamamla);
document.addEventListener('DOMContentLoaded', localStorageOku);




function gorevSilTamamla(e) {
    const tiklanilanEleman = e.target;
    if (tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')) {
        
        tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi');
        
    }
    if (tiklanilanEleman.classList.contains('gorev-btn-sil')) {

        if(confirm('Are you sure')){
            tiklanilanEleman.parentElement.classList.toggle('kaybol');
        const silinecekGorev = tiklanilanEleman.parentElement.children[0].innerText;
        localStorageSil(silinecekGorev);

        tiklanilanEleman.parentElement.addEventListener('transitionend', function () {
            tiklanilanEleman.parentElement.remove();
        });

        }      
        
    }

};


function gorevEkle(e) {
    
    e.preventDefault();
    if (yeniGorev.value.length > 0) {
        gorevItemOlustur(yeniGorev.value);

        //localstorage'a kaydet
    localStorageKaydet(yeniGorev.value);
    yeniGorev.value = '';
        
    }else {
        alert('Boş görev tanımı olmaz');

    }
    


    
    
};

function localStorageArrayDonustur(){
    let gorevler;

    if(localStorage.getItem('gorevler') === null){
        gorevler = [];
    }else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));

    }
    return gorevler;

}



function localStorageKaydet(yeniGorev){

    let gorevler = localStorageArrayDonustur();

    gorevler.push(yeniGorev);
    localStorage.setItem('gorevler', JSON.stringify(gorevler));


}

function localStorageOku(){
    let gorevler = localStorageArrayDonustur();
    

    gorevler.forEach(function (gorev) {

        gorevItemOlustur(gorev);


    });

}

function gorevItemOlustur(gorev){
    //div olusturma
    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev-item');
    
    //li olusturma
    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-tanim');
    gorevLi.innerText = gorev.value;
    gorevDiv.appendChild(gorevLi);

    //tamamlandi butonu ekle
    const gorevTamamBtn = document.createElement('button');
    gorevTamamBtn.classList.add('gorev-btn');
    gorevTamamBtn.classList.add('gorev-btn-tamamlandi');
    gorevTamamBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    gorevDiv.appendChild(gorevTamamBtn);


    //gorev sil buton
    const gorevSilBtn = document.createElement('button');
    gorevSilBtn.classList.add('gorev-btn');
    gorevSilBtn.classList.add('gorev-btn-sil');
    gorevSilBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    gorevDiv.appendChild(gorevSilBtn);


    //ul'ye olsturdugumuz div'i ekleyemli
    gorevListesi.appendChild(gorevDiv);

}

function localStorageSil(gorev){
    let gorevler = localStorageArrayDonustur();
    //splice ile item sil

    const silinecekElemanIndex = gorevler.indexOf('gorev');
    console.log(silinecekElemanIndex);
    gorevler.splice(silinecekElemanIndex, 1);

    localStorage.setItem('gorevler', JSON.stringify(gorevler));

}
































