// Login page
const userNameInp = document.getElementById("username-input")
const userPasswordInp = document.getElementById("userpassword-input")
const signUpBtn = document.getElementById("signup-btn")

signUpBtn.addEventListener('click', () => {
    const userNameVal = userNameInp.value.trim();
    const userPasswordVal = userPasswordInp.value.trim();
    if (userNameVal === "admin".trim() && userPasswordVal === "admin123".trim()) {
        document.getElementById("incorrect-password").classList.add("hidden")
        userNameInp.value = "";
        userPasswordInp.value = "";
        // document.getElementById("login-page").classList.add("hidden")
        // document.getElementById("main-page").classList.remove("hidden")
    } else {
        document.getElementById("incorrect-password").classList.remove("hidden");
        userNameInp.value = "";
        userPasswordInp.value = "";
    }
})

// Tab switching


const statusInfo = document.getElementById("status-info")

const tabs = document.querySelectorAll(".tab-btn");

let allData = [];
const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
fetch(url)
  .then(res => res.json())
  .then(data => {
    allData = data.data;
    displayCard(allData); 
    // console.log(data.data.status)
  });

  const getLabelStyle = (label) => {
  const styles = {
    "bug": "bg-red-100 text-red-500 border-red-300",
    "help wanted": "bg-green-100 text-green-600 border-green-300",
    "enhancement": "bg-purple-100 text-purple-600 border-purple-300",
    "documentation": "bg-blue-100 text-blue-500 border-blue-300",
    "good first issue": "bg-yellow-100 text-yellow-600 border-yellow-300",
  };
  return styles[label] || "bg-gray-100 text-gray-500 border-gray-300";
}

  const displayCard = (data) => {
  const container = document.querySelector(".card-container");
  container.innerHTML = "";
  data.forEach(d => {
  const labelHTML = d.labels.map(label => `
    <span class="text-xs font-semibold px-2 py-1 rounded-full border ${getLabelStyle(label)}">
      ${label.toUpperCase()}
    </span>
  `).join("");
    const getBorderColor = (status) => {
    return status === "open" ? "border-t-green-500" : "border-t-purple-500";
    }

    statusInfo.innerHTML = `
    <span>${data.length} Issues</span>
  `;
  const card = document.createElement("div")
  
  card.innerHTML = `
        <div onclick="loadDetail(${d.id})" class="card border space-y-4 border-gray-200 border-t-4 ${getBorderColor(d.status)} py-8 px-6 rounded-xl flex flex-col justify-between gap-3 h-full bg-white shadow-sm">
        <div class="flex justify-between items-center">
        <img src="assets/Open-Status.png" class="w-6 h-6" alt="">
        <span class="text-xs font-semibold px-3 py-1 rounded-full ${d.priority === "high" ? "bg-[#FEECEC] text-[#EF4444]" : d.priority === "medium" ? "bg-[#FFF6D1] text-[#F59E0B]" : "bg-[#EEEFF2] text-[#9CA3AF]"}">
        ${d.priority.toUpperCase()}
        </span>
        </div>
        <div>
        <p class="text-[#1F2937] font-semibold">${d.title}</p>
        <p class="text-[#64748B] text-[13px] mt-4">
        ${d.description}
        </p>
        </div>
        <div class="flex gap-3">
        ${labelHTML}
        </div>
        <div class="text-[#64748B] text-[12px] flex items-center gap-2 border-t pt-3 mt-1">
        <span>#${d.id}</span>
        <span>by ${d.author}</span>
        <span class="ml-auto">${d.createdAt.slice(0, 10)}</span>
        </div>
    </div>
        
    `;
  container.appendChild(card)
  
})
};
const loadDetail  = async (id)=>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((detail)=> {
        displayCardDetails(detail.data)
    })
  }
const displayCardDetails = (detail)=>{
    const detailContainer = document.getElementById("detail-container")
    const labelHTML = detail.labels.map(label => `
    <span class="text-xs font-semibold px-2 py-1 rounded-full border ${getLabelStyle(label)}">
      ${label.toUpperCase()}
    </span>
  `).join("");
    detailContainer.innerHTML = `
        <h2 class="text-[#1F2937] text-[24px] font-bold mb-3">${detail.title}</h2>
        <div>
            <span class="py-1 px-4 rounded-full text-[#FFFFFF] ${detail.status === "open" ? "bg-[#00A96E]" : "bg-[#4A00FF]"}">
                            ${detail.status === "open" ? "Opened" : "Closed"}
            </span> <span class="text-[#64748B] text-[16px]"> - Opened by Fahim Ahmed  - 22/02/2026 </span>
        </div>
        <div class="flex gap-2 mt-5">
            ${labelHTML}
        </div>
        <p class="text-[#64748B] text-[16px] mt-4">${detail.description}</p>
        <div class="bg-[#F8FAFC] flex justify-around p-5 rounded-xl mt-4">
            <p class="text-[#64748B] text-[16px]">Assignee: <span class="block text-[#1F2937] font-semibold">Fahim Ahmed</span></p>
            <p class="text-[#64748B] text-[16px]">Priority: <span class="block py-1 px-4 rounded-full ${detail.priority === "high" ? "bg-[#FEECEC] text-[#EF4444]" : detail.priority === "medium" ? "bg-[#FFF6D1] text-[#F59E0B]" : "bg-[#EEEFF2] text-[#9CA3AF]"}">${detail.priority.toUpperCase()}</span></p>
        </div>
    `
    my_modal_1.showModal()
}
tabs.forEach(btn => {
  btn.addEventListener("click", (e) => {
    tabs.forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");

    const status = e.target.innerText.toLowerCase();

    if (status === "all") {
      displayCard(allData); 
    } else {
      const filtered = allData.filter(d => d.status === status);
      displayCard(filtered); 
    }
  });
});


const searchBtn = document.getElementById("search-btn")

searchBtn.addEventListener('click',()=>{
    const searchInput = document.getElementById("search-input")
    const searchVal = searchInput.value.trim().toLowerCase();
    console.log(searchVal)
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchVal}`
    fetch(url)
    .then((res) => res.json())
    .then((data) =>{
       displayCard(data.data);
    })
    
})
