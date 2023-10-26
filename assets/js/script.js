const accessKey="0-fAYslr2KoME1-C13xgZSUKH_uUP74gq-dSP3rNnsE"
const form=document.querySelector("form")
const searchImage=document.querySelector("#search-img")
const imagesWrapper=document.querySelector(".images")
const searchBtn=document.querySelector(".search")
const images_Card=document.querySelector(".card img")
const ul=document.querySelector("ul")
let currentPage=1;
const loadMore=document.querySelector(".load-more")

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
        ul.appendChild(li)
        li.appendChild(img)
        const details=document.createElement("div")
        details.classList.add("details")
        li.appendChild(details)
        
        // const importBtn=document.createElement("button")
        // details.appendChild(importBtn)
        // importBtn.innerHTML=`<i class="uil uil-import"></i>`
        // importBtn
        details.innerHTML=`
            <div class="photographer">
                <span>${info.alt_description}</span>
            </div>
            <button onclick="downloadImg('${info.urls.small}')"><i class="uil uil-import"></i></button>
        `
    })
    currentPage++;
   
}

getImages("images")
let inputData="images"
form.addEventListener("submit",(event)=>{
        ul.replaceChildren("")
        inputData=searchImage.value;
        event.preventDefault();
        getImages(inputData);
})

loadMore.addEventListener('click', ()=>{
    getImages(inputData);
})

const downloadImg=(imgURL)=>{
    //Converting received images into blob, creating its download link, & downloading it!
    fetch(imgURL).then(res=>res.blob()).then(file=>{
        // console.log(file);
        const anchoretag=document.createElement("a")
        anchoretag.href=URL.createObjectURL(file)
        anchoretag.download=new Date().getTime()
        anchoretag.click()
    }).catch(()=> alert("Failed to download image!"))
}