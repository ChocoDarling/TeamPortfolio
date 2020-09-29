function initComment(elementId, userId, mvTitle) {
    elementId.innerHTML = null;
    document.getElementById(elementId).display = 'block';
    const arrTextDiv = document.createElement('div');
    const fullDiv = document.createElement('div');
    const createCommentDiv = document.createElement('div');
    const createComment = document.createElement('textarea');
    const menuDiv = document.createElement('div');
    const menuLeftDiv = document.createElement('a');
    const menuTextDiv = document.createElement('a');
    const menuRightDiv = document.createElement('a');
    
    document.getElementById(elementId).appendChild(fullDiv);
    fullDiv.appendChild(arrTextDiv);
    fullDiv.appendChild(createCommentDiv);
    fullDiv.appendChild(menuDiv);
    menuDiv.appendChild(menuLeftDiv);
    menuDiv.appendChild(menuTextDiv);
    menuDiv.appendChild(menuRightDiv);
    createCommentDiv.appendChild(createComment);

    fullDiv.style.width = '100%';
    fullDiv.style.height = '100%';
    fullDiv.style.padding = '10px';
    fullDiv.style.paddingTop = 'none';
    fullDiv.style.boxSizing = 'border-box';
    
    menuDiv.style.boxSizing = 'border-box';
    menuDiv.style.width = '100%';
    menuDiv.style.height = '50px';
    menuDiv.style.display = 'flex';
    menuDiv.style.flexDirection = 'row';
    menuDiv.style.alignItems = 'center';
    menuDiv.style.justifyContent = 'space-between';

    menuLeftDiv.innerHTML = '<';
    menuLeftDiv.onclick = () => { changeCommentPage(false, arrTextDiv, [menuLeftDiv, menuRightDiv], mvTitle); };
    menuLeftDiv.style.textDecoration = 'none';
    menuLeftDiv.style.textAlign = 'center';
    menuLeftDiv.style.color = 'white';
    menuLeftDiv.style.opacity = '0.5';
    menuLeftDiv.style.fontWeight = '900';
    menuLeftDiv.style.fontSize = '50px';
    menuLeftDiv.style.lineHeight = '35px';
    menuLeftDiv.style.boxSizing = 'border-box';
    menuLeftDiv.style.width = '80px';
    menuLeftDiv.style.height = '40px';

    menuTextDiv.innerHTML = '글남기기';
    menuTextDiv.onclick = () => { 
        submitComment(createComment, userId, mvTitle);
        LoadComment(arrTextDiv, mvTitle); 
    };
    menuTextDiv.style.textDecoration = 'none';
    menuTextDiv.style.textAlign = 'center';
    menuTextDiv.style.color = 'white';
    menuTextDiv.style.fontWeight = '500';
    menuTextDiv.style.fontSize = '25px';
    menuTextDiv.style.lineHeight = '45px';
    menuTextDiv.style.textAlign = 'center';
    menuTextDiv.style.boxSizing = 'border-box';
    menuTextDiv.style.width = '150px';
    menuTextDiv.style.height = '40px';

    menuRightDiv.innerHTML = '>';
    menuRightDiv.onclick = () => { changeCommentPage(true, arrTextDiv, [menuRightDiv, menuLeftDiv], mvTitle); };
    menuRightDiv.style.textDecoration = 'none';
    menuRightDiv.style.textAlign = 'center';
    menuRightDiv.style.color = 'white';
    menuRightDiv.style.fontWeight = '900';
    menuRightDiv.style.fontSize = '50px';
    menuRightDiv.style.lineHeight = '35px';
    menuRightDiv.style.boxSizing = 'border-box';
    menuRightDiv.style.width = '80px';
    menuRightDiv.style.height = '40px';

    createCommentDiv.style.width = '100%';
    createCommentDiv.style.height = '60px';
    createCommentDiv.style.display = 'flex';
    createCommentDiv.style.justifyContent = 'center';

    createComment.style.resize = 'none';
    createComment.style.width = '90%';
    createComment.style.height = '50px';
    createComment.style.margin = '5px';
    
    arrTextDiv.value = '';
    arrTextDiv.style.width = '100%';
    arrTextDiv.style.height = 'calc(100% - 100px)';
    arrTextDiv.style.overflow = 'hidden';
    arrTextDiv.style.display = 'flex';
    arrTextDiv.style.flexDirection = 'column';
    arrTextDiv.style.justifyContent = 'space-between';

    LoadComment(arrTextDiv, mvTitle);
}

function submitComment(element, userId, mvTitle) {
    if (!element.value) return;
    const tempCount = getCount('comments');
    const obj = {
        id: +tempCount + 1,
        userId: userId,
        comment: element.value,
        mvTitle: mvTitle,
        isDelete: 1
    };
    initDB('comments', obj);
    element.value = null;
}

function LoadComment(listElement, mvTitle) {
    listElement.innerHTML = null;

    const arrComments = [...getDB(TABLE.COMMENTS, COMMENTS.TITLE, mvTitle)].reverse();
    makeCommentArr(listElement, arrComments);
}

function makeCommentArr(listElement, arrComments, isNext = true) {
    let fullHeight = 0;
    for (const iterator of arrComments) {
        if (iterator.isDelete) {
            const tempName = getID(iterator.userId).name;
            const tempDiv = document.createElement('div');
            const tempNameDiv = document.createElement('div');
            const tempComment = document.createElement('div');
            if (isNext) listElement.appendChild(tempDiv);
            else listElement.prepend(tempDiv);
            tempDiv.appendChild(tempNameDiv);
            tempDiv.appendChild(tempComment);
            
            tempDiv.value = iterator.id;
            tempDiv.classList.add('comments');
            tempDiv.style.width = '100%';
            tempDiv.style.boxSizing = 'border-box';
            tempDiv.style.padding = '10px';
            tempDiv.style.borderTop = '1px solid gray';
            tempDiv.style.display = 'flex';
            tempDiv.style.justifyContent = 'space-between';
            
            tempNameDiv.style.color = 'white';
            tempNameDiv.innerHTML = tempName;
            tempNameDiv.style.width = '80px';
            
            tempComment.innerHTML = iterator.comment;
            tempComment.style.color = 'white';
            tempComment.style.wordBreak = 'break-all';
            tempComment.style.width = '230px';
            
            fullHeight += tempDiv.offsetHeight;
            if (fullHeight > listElement.offsetHeight) {
                listElement.removeChild(tempDiv);
                break;
            } 
            text = `${iterator.id}`;
        }
    }
    listElement.value = `${listElement.lastChild.value}&${listElement.firstChild.value}`;
    let tempReturn = false;
    if (isNext && +listElement.lastChild.value === 1) {
        tempReturn = true;
    } else if (!isNext && +listElement.firstChild.value === +getCount('comments')) {
        tempReturn = true;
    }
    const tempEnd = document.createElement('div');
    tempEnd.style.width = '100%';
    tempEnd.style.borderTop = '1px solid gray';
    tempEnd.classList.add('comments');
    listElement.appendChild(tempEnd);
    listElement.firstChild.style.border = 'none';
    return tempReturn;
}

function changeCommentPage(isNext, listElement, element, mvTitle) {
    if (+element[0].style.opacity === 0.5) return;
    const arrValue = listElement.value.split('&');
    const arrDBComments = [...getDB(TABLE.COMMENTS, COMMENTS.TITLE, mvTitle)];
    element[0].style.opacity = '1';
    element[1].style.opacity = '1';
    listElement.innerHTML = null;
    let arrTemp = arrDBComments.slice(arrValue[1]);
    if (isNext) arrTemp = arrDBComments.slice(0, +arrValue[0] - 1).reverse();
    if (makeCommentArr(listElement, arrTemp, isNext)) {
        element[0].style.opacity = '0.5';
    }
}