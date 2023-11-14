// 1. 오른쪽 버튼을 누르면 100% 작용 2. 왼쪽 버튼을 누르면 -100% 작용
const arrows = document.querySelector(".arrows")
const slides = document.querySelector(".slide-list")
const paginationElem = document.querySelector(".pagination")

const slideLength = slides.children.length - 1 // 슬라이드 개수
const addClass = (element, className) => element.classList.add(className)
const removeClass = (element, className) => element.classList.remove(className)

// console.dir(slides.children.length)

let x = 0;
let prevPagination;


function rightClickHandler() {
    if (x >= slideLength * 100) return
    x += 100;
}
function leftClickHandler() {
    if (x <= 0) return;
    x -= 100;  
}

function disabledArrow() {
    const leftBtn = document.querySelector(".arrows button:first-of-type")
    const rightBtn = document.querySelector(".arrows button:last-of-type")
   
    if ( x === 0) {
        addClass(leftBtn, "disabled") // x가 0이면 왼쪽으로 이동 못하게
    }
    
    if ( x > 0) {
        removeClass(leftBtn, "disabled") // x가 0이상이면 왼쪽으로 이동 못하게
    }
    if (x !== slideLength * 100) {
        removeClass(rightBtn, "disabled")
    }
    if ( x === slideLength * 100) {
        addClass(rightBtn, "disabled")
    } 
}

const moveSlide = () => slides.style.transform = `translateX(-${x}%)`;

function pagination() {
    for (let i = 0; i < slides.children.length; i++) {
        const createLI = document.createElement("li") // 태그이름 생성
        createLI.setAttribute("class", `pagination-${i}`) // class이름 만들기
        paginationElem.insertAdjacentElement("beforeend", createLI) // 어디에다 elem을 넣을 건지(앞에)   
    }
    const firstPagination = document.querySelector(".pagination li")

    prevPagination = firstPagination

    addClass(firstPagination, "active")
}


function paginationHandler(event) {
    // console.log(event.target) // event.target: 내가 누른 요소만 출력
    if(event.target.nodeName === "UL") return // target의 노드네임이 UL이면 종료
    if(prevPagination) removeClass(prevPagination, "active")

    const index = event.target.getAttribute("class").slice(11)
    // 문자열을 잘라야함. ex) pagination-번호, 번호만 출력해야한다.


    x = index * 100

    prevPagination = event.target

    addClass(event.target, "active")
    disabledArrow()
    moveSlide()   
}


function slideHandler(event) {
    // console.log(event.target)
    if(event.target.classList.contains("left-btn")) { 
        //클래스에 left-btn이 포함되어 있으면 leftClickHandler출력
        leftClickHandler(event.target)
    } else {
        rightClickHandler(event.target)
    }
    // 화살표를 눌렀을 때 해당하는 페이지네이션의 인덱스를 알아야 한다.
    // console.log(x / 100)

    if(prevPagination) removeClass(prevPagination, "active") 
    // 이전요소가 있으면 지움 다음거에 클래스 추가 하고 다음거 지운다음에 추가

    // console.log(document.querySelectorAll(".pagination li")[x / 100]) // 배열의 인덱스 번호에 접근
    const paginationElem = document.querySelectorAll(".pagination li")[x / 100]
    addClass(paginationElem, "active")
    prevPagination = paginationElem // 이전요소



    disabledArrow() // 화살표 이동못하게 하는 함수
    moveSlide()
}


disabledArrow()
pagination()
arrows.addEventListener("click", slideHandler)
paginationElem.addEventListener("click", paginationHandler) // 종료,  함수


