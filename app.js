const postCardContainer = document.getElementById('post-card-container');
const markDiv = document.getElementById('markDiv')
let bg;


const dataLoad = async () => {
    const res = await fetch(' https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts;

    // postCardContainer.innerHTML = '';
    posts.forEach(post => {

        const isActive = post.isActive;
        console.log(post)
        if (isActive) {
            bg = "#10B981";
        }
        else {
            bg = "#FF3434";
        }
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card flex flex-row text-start p-10 gap-6 hover:bg-[#797DFC1A] border duration-300 hover:border-[#797DFC] bg-[#F3F3F5]">
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
                                    <ul class="flex gap-6 text-[#12132D99]">
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


const markAsRead = (postTitle, view) => {


    const div = document.createElement('div');
    div.innerHTML = `
    <div class="p-4 flex gap-6 text-start bg-white rounded-2xl">
                                <h2 class="text-[#12132D] font-semibold ">
                                    ${postTitle}
                                </h2>
                                <div class="flex items-center gap-2 text-[#12132D99]">
                                    <i class="fa-regular fa-eye"></i>
                                    <span>${view}</span>
                                </div>
                            </div>
        `
    markDiv.appendChild(div);
}