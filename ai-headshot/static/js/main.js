const form=document.getElementById("headshotForm");
const photoInput=document.getElementById("photoInput");
const zone=document.getElementById("uploadZone");
const preview=document.getElementById("photoPreview");
const statusBox=document.getElementById("statusBox");
const resultBox=document.getElementById("resultBox");
const generateBtn=document.getElementById("generateBtn");

function status(message,error=false){statusBox.textContent=message;statusBox.className="status-box"+(error?" error":"");statusBox.hidden=false}
function selectPhoto(file){
  if(!file)return;
  if(!["image/jpeg","image/png","image/webp"].includes(file.type)){status("Please select a JPG, PNG or WEBP photo.",true);photoInput.value="";return}
  if(file.size>10*1024*1024){status("Photo must be smaller than 10 MB.",true);photoInput.value="";return}
  preview.src=URL.createObjectURL(file);preview.hidden=false;
  document.getElementById("uploadTitle").textContent=file.name;
  document.getElementById("uploadSub").textContent="Photo selected · Click to change";
  statusBox.hidden=true;
}
photoInput.addEventListener("change",()=>selectPhoto(photoInput.files[0]));
["dragenter","dragover"].forEach(type=>zone.addEventListener(type,e=>{e.preventDefault();zone.classList.add("dragover")}));
["dragleave","drop"].forEach(type=>zone.addEventListener(type,e=>{e.preventDefault();zone.classList.remove("dragover")}));
zone.addEventListener("drop",e=>{const file=e.dataTransfer.files[0];if(file){const dt=new DataTransfer();dt.items.add(file);photoInput.files=dt.files;selectPhoto(file)}});
document.querySelectorAll(".style-card input").forEach(input=>input.addEventListener("change",()=>{
  document.querySelectorAll(".style-card").forEach(card=>card.classList.remove("selected"));
  input.closest(".style-card").classList.add("selected");
}));
form.addEventListener("submit",async e=>{
  e.preventDefault();
  if(!photoInput.files[0])return status("Please upload a photo first.",true);
  if(!document.getElementById("consent").checked)return status("Please confirm you have permission to use this photo.",true);
  const data=new FormData(form);generateBtn.disabled=true;generateBtn.textContent="Creating your headshot…";
  resultBox.hidden=true;status("AI is creating your portrait. This may take a minute or two.");
  try{
    const response=await fetch("/generate",{method:"POST",body:data});
    const result=await response.json();if(!response.ok)throw new Error(result.error||"Generation failed.");
    document.getElementById("resultImage").src=result.image_url;
    document.getElementById("downloadBtn").href="/download/"+encodeURIComponent(result.filename);
    resultBox.hidden=false;statusBox.hidden=true;resultBox.scrollIntoView({behavior:"smooth",block:"start"});
  }catch(err){status(err.message,true)}
  finally{generateBtn.disabled=false;generateBtn.innerHTML='Generate my AI headshot <span>✦</span>'}
});
document.getElementById("startOver").addEventListener("click",()=>{resultBox.hidden=true;statusBox.hidden=true;form.scrollIntoView({behavior:"smooth"})});
