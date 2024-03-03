const postCardContainer = document.getElementById('post-card-container');
const markDiv = document.getElementById('markDiv')
const loadingSpinner = document.getElementById('loading-spinner');
const latestPostContainer = document.getElementById('latestPost');
const inputCategory = document.getElementById('categoryInput');

let bg;

const dataLoad = async () => {
    loadingSpinner.classList.remove('hidden')

    setTimeout(() => {
        loadingSpinner.classList.add('hidden')
    }, 2000);

    const res = await fetch(' https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts;

    postCardContainer.innerHTML = '';
    posts.forEach(post => {

        const isActive = post.isActive;

        if (isActive) {
            bg = "#10B981";
        }
        else {
            bg = "#FF3434";
        }
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card flex md:flex-row flex-col text-start p-10 gap-6 hover:bg-[#797DFC1A] border duration-300 hover:border-[#797DFC] bg-[#F3F3F5]">
                                <div class="w-20 relative">
                                <img class="rounded-2xl w-full" src="${post.image}" alt="">
                                <div class="w-4 h-4 bg-[${bg}] rounded-full absolute top-[-5px] right-[-5px]">

                                </div>
                            </div>
                            <div class="flex-1 space-y-5 ">
                                <p class="flex gap-4 text-[14px] text-[#12132DCC]">
                                    <span>#${post.category}</span> <span>Author : ${post.author.name}</span>
                                </p>
                                <h1 class="text-[20px] font-bold text-[#12132D]">
                                    ${post.title}
                                </h1>
                                <p class="text-[#12132D99]">
                                    ${post.description}
                                </p>
                                <hr>
                                <div class="flex justify-between">
                                    <ul class="flex md:gap-6 gap-3 text-[#12132D99]">
                                        <li class="flex gap-3 items-center">
                                            <i class="fa-regular fa-message"></i>
                                            <span>${post.comment_count}</span>
                                        </li>
                                        <li class="flex gap-3 items-center">
                                            <i class="fa-regular fa-eye"></i>
                                            <span>${post.view_count}</span>
                                        </li>
                                        <li class="flex gap-3 items-center">
                                            <i class="fa-regular fa-clock"></i>
                                            <span>${post.posted_time} min</span>
                                        </li>
                                    </ul>
                                    <div onclick="markAsRead('${post.title.replace("'", '')}', '${post.view_count}')"
                                        class="flex items-center justify-center bg-[#10B981] text-white h-[28px] w-[28px] rounded-full hover:cursor-pointer">
                                        <i class="fa-solid fa-envelope-open"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
        `
        postCardContainer.appendChild(div);
    });

}

dataLoad();

let markCount = 0;

const markAsRead = (postTitle, view) => {

    markCount++;
    document.getElementById('markCount').innerText = `(${markCount})`;
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="p-4 flex gap-6 text-start bg-white rounded-2xl justify-between">
                                <h2 class="text-[#12132D] font-semibold ">
                                    ${postTitle}
                                </h2>
                                <div class="flex items-center  gap-2 text-[#12132D99]">
                                    <i class="fa-regular fa-eye"></i>
                                    <span>${view}</span>
                                </div>
                            </div>
        `
    markDiv.appendChild(div);
}

const loadLatestPost = async () => {

    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();

    data.forEach(post => {
        const div = document.createElement('div');

        let date = post.author.posted_date;
        let designation = post.author.designation;
        designation = designation ? post.author.designation : "Unknown"
        date = date ? post.author.posted_date : "No publish date";

        div.innerHTML = `
        <div class="flex border border-[#12132D26] flex-col text-start p-6 bg-white rounded-3xl gap-6">
                        <img class="rounded-2xl" src="${post.cover_image}" alt="">
                        <div class="space-y-4">
                            <h2 class="text-[#12132D99] flex gap-2 items-center">
                                <i class="fa-regular fa-calendar"></i>
                                <span>
                                    ${date}
                                </span>
                            </h2>
                            <h1 class="text-[#12132D] font-extrabold text-[18px]">
                                ${post.title}
                            </h1>
                            <p class="text-[#12132D99]">
                            ${post.description.slice(0, 60)}
                            </p>
                            <div class="flex gap-4 items-center">
                                <img class="w-12 h-12 rounded-full"
                                    src="${post.profile_image}" alt="">
                                <div class="flex flex-col gap-1">
                                    <h1 class="text-[#12132D] font-bold">
                                        ${post.author.name}
                                    </h1>
                                    <p class="text-[14px] text-[#12132D99]">
                                        ${designation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
        `
        latestPostContainer.appendChild(div);
    })
}

loadLatestPost();


const showDataCategory = async () => {
    loadingSpinner.classList.remove('hidden')

    setTimeout(() => {
        loadingSpinner.classList.add('hidden')
    }, 2000);

    const input = inputCategory.value;
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${input}`)
    const data = await res.json();

    postCardContainer.innerHTML = '';
    const posts = data.posts;
    if (posts.length === 0) {
        const div = document.createElement('div');
        div.innerHTML = `
        <h1 class="text-center mx-auto text-[40px] text-black font-bold">
            Data Not Found
        </h1>
        `
        postCardContainer.appendChild(div);

        alert("The category you provide is not a valid category");
    }


    posts.forEach(post => {
        const div = document.createElement('div');

        div.innerHTML = `
        <div class="card flex md:flex-row flex-col text-start p-10 gap-6 hover:bg-[#797DFC1A] border duration-300 hover:border-[#797DFC] bg-[#F3F3F5]">
                                <div class="w-20 relative">
                                <img class="rounded-2xl w-full" src="${post.image}" alt="">
                                <div class="w-4 h-4 bg-[${bg}] rounded-full absolute top-[-5px] right-[-5px]">

                                </div>
                            </div>
                            <div class="flex-1 space-y-5 ">
                                <p class="flex gap-4 text-[14px] text-[#12132DCC]">
                                    <span>#${post.category}</span> <span>Author : ${post.author.name}</span>
                                </p>
                                <h1 class="text-[20px] font-bold text-[#12132D]">
                                    ${post.title}
                                </h1>
                                <p class="text-[#12132D99]">
                                    ${post.description}
                                </p>
                                <hr>
                                <div class="flex justify-between">
                                    <ul class="flex md:gap-6 gap-3 text-[#12132D99]">
                                        <li class="flex gap-3 items-center">
                                            <i class="fa-regular fa-message"></i>
                                            <span>${post.comment_count}</span>
                                        </li>
                                        <li class="flex gap-3 items-center">
                                            <i class="fa-regular fa-eye"></i>
                                            <span>${post.view_count}</span>
                                        </li>
                                        <li class="flex gap-3 items-center">
                                            <i class="fa-regular fa-clock"></i>
                                            <span>${post.posted_time} min</span>
                                        </li>
                                    </ul>
                                    <div onclick="markAsRead('${post.title.replace("'", '')}', '${post.view_count}')"
                                        class="flex items-center justify-center bg-[#10B981] text-white h-[28px] w-[28px] rounded-full hover:cursor-pointer">
                                        <i class="fa-solid fa-envelope-open"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
        `
        postCardContainer.appendChild(div);
    })
}