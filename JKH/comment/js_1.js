function writeComment(elementId) {
    const tempTextDiv = document.getElementById('commentInitDiv');
    const nowElement = document.getElementById(elementId);
    if (tempTextDiv.style.display === 'block') {
        tempTextDiv.style.display = 'none';
        nowElement.innerHTML = '글쓰기';
        nowElement.style.width = '600px';
        document.getElementById('writeCommentCancel').style.display = 'none';
    } else {
        tempTextDiv.style.display = 'block';
        nowElement.innerHTML = '완료';
        nowElement.style.width = '280px';
        document.getElementById('writeCommentCancel').style.display = 'block';
    }
}

function writeCommentCancel(elementId) {
    const tempTextDiv = document.getElementById('commentInitDiv');
    const nowElement = document.getElementById(elementId);
    tempTextDiv.style.display = 'none';
    nowElement.innerHTML = '글쓰기';
    nowElement.style.width = '600px';
    document.getElementById('writeCommentCancel').style.display = 'none';
}