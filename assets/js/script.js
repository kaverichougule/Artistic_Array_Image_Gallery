const accessKey="0-fAYslr2KoME1-C13xgZSUKH_uUP74gq-dSP3rNnsE"
const form=document.querySelector("form")
const searchImage=document.querySelector("#search-img")
const imagesWrapper=document.querySelector(".images")
const searchBtn=document.querySelector(".search")
const images_Card=document.querySelector(".card img")
const ul=document.querySelector("ul")
let currentPage=1;

async function getImages(dynamicImages){
    const url=`https://api.unsplash.com/search/photos?page=${currentPage}&query=${dynamicImages}&client_id=${accessKey}`
    // console.log(url);
    const response=await fetch(url);
    const data=await response.json();
    console.log(data);
    const result=data.results;
    result.map((info)=>{
        
        const li=document.createElement("li")
        li.classList.add("card")
        const img=document.createElement("img");
        img.src=info.urls.small;
        img.alt=info.alt_description
        ul.appendChild(li)
        li.appendChild(img)
        // images_Card.src=info.urls.small
        // images_Card.alt=info.alt_description
    })
   
}
function randomImagess(){
    const arrayImg=["water","India","fruits","animals"]
    let randomNumber=Math.floor(Math.random()*arrayImg.length)
    console.log(arrayImg[randomNumber]);
    return arrayImg[randomNumber]
}
getImages("random")
let inputData=""
form.addEventListener("submit",(event)=>{
        ul.replaceChildren("")
        inputData=searchImage.value;
        event.preventDefault();
        getImages(inputData);
})




// const formEL=document.querySelector("form")
// const inputEl=document.querySelector("#search-img")
