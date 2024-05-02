/*
CHECKLIST
[x] 글자 표기 관련 내용
[x] board 내용 가져오기
[x] comments 내용 가져오기
[ ] 파일 첨부 null 체크
*/

import { getBackendDomain } from './config.js';
import { fetchData, formatNumber, formatDate } from './fetchData.js';

function processBoardDetailData(data){
    const boardData = data.board;
    const listBox = document.getElementById('post');
    listBox.innerHTML = '';

    const fragment = document.createDocumentFragment();

    const postElement = document.createElement('div');
    postElement.classList.add('post-entity');
    postElement.innerHTML = `
    <article class="head">
        <h2 class="title">
            ${boardData.post_title}
        </h2>
        <article class="detail">
            <article class="text-detail">
            <p>
                <article class="box">
                <img class="logo" src="${getBackendDomain()+boardData.profile_image_path}" alt="profile-img">
                </article>
                <h3 class="writer-detail">${boardData.nickname}</h3>
            </p>
            <h4 class="time-detail">
            ${formatDate(boardData.created_at)}
            </h4>
            </article>

            <article class = "small-buttons">
                <a class="sbutton" href="/boards/${boardData.post_id}/edit" >수정</a>
                <a class="sbutton" href="#" id="board-delete-btn" >삭제</a>
            </article>
        </article>
    </article>

    <hr class="horizontal-rule"/>

    <article class = "main">
        <img class="board-image" src="${getBackendDomain() + boardData.file_path}" alt="board-img">
        <p class = "content">${boardData.post_content}</article>

    <article class = "infos">
        <article class = "info">
            <p class="num">${formatNumber(boardData.hits)}</p>
            <h3>조회수</h3>
        </article>
        <article class = "info">
            <p class="num">${formatNumber(boardData.comment_count)}</p>
            <h3>댓글</h3>
        </article>
    </article>
    `;

    listBox.appendChild(postElement);
}

function processCommentData(data){
    const commentData = data.comments;
    const listBox = document.getElementById('comments');
    listBox.innerHTML = '';

    const fragment = document.createDocumentFragment();

    commentData.forEach((comment) => {

        const unit  = document.createElement('div');
        unit.classList.add('unit');
        unit.innerHTML = 
            `<article class="detail">
                    <article class="text-detail">
                    <p>
                        <article class="box">
                        <img class="logo" src="${getBackendDomain()+comment.profile_image_path}" alt="profile-img">
                        </article>
                        <h3 class="writer-detail"> ${comment.nickname}</h3>
                    </p>
                    <h4 class="time-detail">${formatDate(comment.created_at)}</h4>
                    </article>
                    <article class = "small-buttons">
                        <a class="sbutton" href="#" target="_blank">수정</a>
                        <a class="sbutton" href="#" id = "comment-delete-btn">삭제</a>
                    </article>
            </article>
                <h4 class = "content">${comment.comment_content}</h4>`;
        fragment.appendChild(unit);

    });

    listBox.appendChild(fragment);
}


function extractIdFromUrl() {
    var href = window.location.href;
    var regex = /\/(\d+)(?:\/)?$/; // 맨 뒤에 있는 숫자를 추출
    var match = regex.exec(href);
    if (match && match.length > 1) {
        return match[1]; // 첫 번째 그룹에 해당하는 부분 반환 (즉, 숫자)
    } else {
        return null; // 일치하는 것이 없으면 null 반환
    }
}
// 예시: URL에서 숫자를 추출하여 콘솔에 출력
const extractedId = extractIdFromUrl();
console.log("Extracted ID from URL:", extractedId);


fetchData('/boards/'+extractedId)
    .then((res)=>{
        console.log(res.data);
        processBoardDetailData(res.data);
        processCommentData(res.data);
    });

// fetchData('/data/comments.json')
//     .then((data)=>{
//         processCommentData(data);
//     });
