let expanders = gsap.utils.toArray(".expander");
let active; // 현재 열려 있는 확장기를 추적하기 위한 변수

// 각 확장기에 대해 반복
expanders.forEach(function(expander) {
    // 각 확장기에 대한 애니메이션 생성
    let animation = gsap.timeline({ paused: true }); // 타임라인 생성, 처음에는 일시 정지
    
    // 클릭한 확장기의 view-box를 선택
    let logo = expander.querySelector(".view-box");
    let bannerLink = expander.querySelector(".banner-link"); // banner-link 선택
    
    // 넓이를 늘리고 view-box를 이동하는 애니메이션을 동시에 실행
    animation.to(expander, { width: 1200, duration: 0.5 });
    if (logo) {
        animation.to(logo, { x: 20, duration: 0.5 }, 0); // 0초에 동시에 시작
    }
    
    // banner-link의 투명도 애니메이션 추가
    if (bannerLink) {
        animation.to(bannerLink, { opacity: 0.8, duration: 0.5 }, 0); // 확장 시 투명도 1
    }

    // 생성한 애니메이션을 확장기에 속성으로 저장
    expander.animation = animation;

    // 확장기를 클릭할 때 실행될 이벤트 리스너
    expander.addEventListener("click", function() {
        if (active === expander) {
            return; // 클릭 이벤트 무시
        }
        if (active) {
            // 현재 열린 확장기가 있을 경우, 해당 확장기를 닫음
            active.animation.reverse();
        }
        
        // 클릭한 확장기의 애니메이션 재생
        expander.animation.play(); 
        active = expander; // 현재 열린 확장기로 업데이트
        
    });

    // 제일 왼쪽 확장기를 초기 상태로 확장 상태로 설정
    if (expanders[0] === expander) {
        expander.animation.play(); // 첫 번째 확장기의 애니메이션을 재생하여 확장
        active = expander; // 현재 열린 확장기로 업데이트
    }
});


 var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3.5,
  spaceBetween: 20,
  loop: true, 
  breakpoints : {1220: {
    slidesPerView: 4,
}},

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
}); 


const openButton = document.querySelector('.open-button');
const closeButton = document.querySelector('.close-menu');
const menuMobile = document.querySelector('.menu-mobile');

closeButton.addEventListener('click', function() {
 /*    menuMobile.style.display = 'none'; */
    menuMobile.style.height = '0';
});
openButton.addEventListener('click', function() {
/*     menuMobile.style.display = 'block'; */
    menuMobile.style.height = '100vh';
});

 const menuItems = document.querySelectorAll('.gnb > li');

    menuItems.forEach(item => {

        item.addEventListener('click', function(event) {

            if (!event.target.closest('a')) {
                const subMenu = this.querySelector('.sub');


                menuItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherSubMenu = otherItem.querySelector('.sub');
                        if (otherSubMenu) {
                            otherSubMenu.style.display = 'none';
                        }
                    }
                });
                if (subMenu) {
                    subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
                }
            }
        });


        const subItems = item.querySelectorAll('.sub > li');
        subItems.forEach(subItem => {
            subItem.addEventListener('click', function(event) {
                event.stopPropagation();
                const subSubMenu = this.querySelector('.sub-sub');
                if (subSubMenu) {
                    const otherSubSubMenus = this.parentElement.querySelectorAll('.sub-sub');
                    otherSubSubMenus.forEach(otherSubSub => {
                        if (otherSubSub !== subSubMenu) {
                            otherSubSub.style.display = 'none';
                        }
                    });

                  
                    subSubMenu.style.display = subSubMenu.style.display === 'block' ? 'none' : 'block';
                }
            });
        });
    });
    

    const elements = document.querySelectorAll('.menu-mobile .gnb .sub > li p');

    elements.forEach(element => {
        element.addEventListener('click', function() {
            // 클릭한 요소의 현재 배경 이미지 확인
            const currentBackground = getComputedStyle(element).backgroundImage;
    
            // 현재 배경 이미지가 plus일 경우 minus로 변경
            if (currentBackground.includes('plus-regular-24.png')) {
                element.style.backgroundImage = "url('img/minus-regular-24.png')";
            } 
            // 현재 배경 이미지가 minus일 경우 plus로 변경
            else if (currentBackground.includes('minus-regular-24.png')) {
                element.style.backgroundImage = "url('img/plus-regular-24.png')";
            }
    
            // 모든 요소의 배경 이미지 초기화
            elements.forEach(el => {
                if (el !== element && getComputedStyle(el).backgroundImage.includes('minus-regular-24.png')) {
                    el.style.backgroundImage = "url('img/plus-regular-24.png')";
                }
            });
        });
    });