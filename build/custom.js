let createButton = document.getElementById("button")
let modalOverlay = document.getElementById("modal-overlay")
let closeIcon = document.getElementById("close-modal-icon")
let nameOfWebsiteField = document.getElementById("nameOfWebsite")
let resourceForm = document.getElementById("resource-form")
let linkOfWebsitee = document.getElementById("linkOfWebsite")
let descriptionOfWebsitee = document.getElementById("descriptionOfWebsite")
let resourcesSection = document.getElementById("resources-section")

function revealModalOverlay(){
    modalOverlay.classList.remove("invisible")
    nameOfWebsiteField.focus()
}

createButton.addEventListener("click", revealModalOverlay)


function closeBackForm() {
    modalOverlay.classList.add("invisible")
}
closeIcon.addEventListener("click", closeBackForm)

let resource = []

function printResourcesOnUI(){
    resourcesSection.innerHTML = ""
    resource.forEach(function (allResourcesFromArray) {
        let printSiteName = allResourcesFromArray.siteName
        let printSiteLink = allResourcesFromArray.siteLink
        let printSiteDescription = allResourcesFromArray.siteDescription 

        let resourceDIV = document.createElement("div")
        resourceDIV.classList.add(`resorces`, `h-auto`,  `p-3`, `bg-white`, `space-y-3`, `rounded-lg`)

        let nameOfWebsiteDIV = document.createElement("div")
        nameOfWebsiteDIV.classList.add(`name-of-website`, `flex`, `justify-between`)

        let nameOfWebsiteText = document.createElement("a")
        nameOfWebsiteText.setAttribute("href", `${printSiteLink}`)
        nameOfWebsiteText.classList.add("text-lg", "font-semibold", "text-primary")
        nameOfWebsiteText.setAttribute("target", "_blank")
        nameOfWebsiteText.textContent = printSiteName

        let deleteIcon = document.createElement("i")
        deleteIcon.classList.add(`fa`, `fa-trash`, `cursor-pointer`)
        deleteIcon.setAttribute("style", "font-size:24px")
        deleteIcon.setAttribute("onclick", `deleteResource('${printSiteLink}')`)

        

        let descriptionOfWebsiteDIV = document.createElement("div")
        descriptionOfWebsiteDIV.classList.add("description-of-website")

        let descriptionText = document.createElement("p")
        descriptionText.textContent = printSiteDescription

        descriptionOfWebsiteDIV.append(descriptionText)
        nameOfWebsiteDIV.append(nameOfWebsiteText, deleteIcon)

        resourceDIV.append(nameOfWebsiteDIV, descriptionOfWebsiteDIV)
        resourcesSection.append(resourceDIV)
    })
}

function deleteResource(printSiteLink){
    resource.forEach(function (reso, index) {
        if(reso.siteLink === printSiteLink){
            resource.splice(index, 1)
        }
    })

    localStorage.setItem("resource", JSON.stringify(resource))
    fetchResources()
}

function fetchResources(){
    if(localStorage.getItem("resource")){
        resource = JSON.parse(localStorage.getItem("resource"))
    }
    printResourcesOnUI()
}
fetchResources()

resourceForm.addEventListener("submit" , handleForm)

function handleForm(event){
    event.preventDefault()
    let websiteName = nameOfWebsiteField.value
    let websiteUrl = linkOfWebsitee.value
    let description = descriptionOfWebsitee.value

   

    if(nameOfWebsiteField.value === ""){
        nameOfWebsiteField.style.border = "1px solid red"
    }

    if(linkOfWebsitee.value === ""){
        linkOfWebsitee.style.border = "1px solid red"
    }

    if(descriptionOfWebsitee.value === ""){
        descriptionOfWebsitee.style.border = "1px solid red"
    }
    

    const aCreatedResource = {
        siteName : websiteName,
        siteLink : websiteUrl,
        siteDescription : description
    }

    resource.push(aCreatedResource)

    localStorage.setItem("resource" , JSON.stringify(resource))
    
    fetchResources()
    resourceForm.reset()
    closeBackForm()
}