
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

locoScroll.stop()

gsap.set("body,#main",{
    overflowY:"hidden",
    overflowX:"hidden"
})
gsap.set("#nav",{
    y:-60,
    // opacity:0
})


function load(){
    var timer = document.querySelector(".timer h1")
    var timerbtn = document.querySelector(".timer button")
    var grow = 0

    var int = setInterval(function(){
        if(grow < 90){
            grow += Math.floor(Math.random()*20);
            timer.innerHTML = grow + "%";
        }else{
            grow = 100;
            timer.innerHTML = grow + "%";
            timer.style.transform = "translateY(-100%)";
            timerbtn.style.transform = "translateY(-100%)";
            timerbtn.style.opacity ="1"
            clearInterval(int)
        }
    },Math.floor(Math.random()*300))

    timerbtn.addEventListener("click",function(){
        locoScroll.start()
        var tl = gsap.timeline()
        tl.to("#page1",{
            scale:1,
            duration:0.8
        },"anim")
        var audio = new Audio("https://join.ames-foundation.com/sounds/african-savanna.mp3");
        audio.play();
        tl.to(".timer",{
            opacity:"0"
        },"anim")
        tl.to("#log",{
            opacity:"1",
            duration:.5,
            delay:0.3
        },"anim")
        tl.to("#patti",{
            opacity:"1",
            duration:.5,
            rotate:"-5deg"
        },"anim")
        tl.to("#page1-text h5",{
            opacity:"1",
            duration:.5,
            delay:0.6,
            // rotate:"-5deg"
        },"anim")
        tl.to("#sticker img,h4",{
            opacity:"1",
            duration:.5,
            delay:0.9
            // rotate:"-5deg"
        },"anim")
        tl.to("#main",{
            overflow:"auto",
        },"anim")
        tl.to("#nav",{
            y:"0",
        })
        
    })

}

load()

function textAnimation(){
    var dark = document.querySelector(".page3-part1 h1").textContent

var clutter = ""
var splitedtext = dark.split("")

splitedtext.forEach(function(elem){
    clutter += `<span>${elem}</span>`
})

document.querySelector(".page3-part1 h1").innerHTML= clutter

var tl2 = gsap.timeline(
    {
        scrollTrigger:{
            trigger: "#page3",
            scroller:"#main",
            scrub:1,
            pin:true,
            start:"top 0",
            end:"top -800%",
            // markers:true,
        }
    }
)
tl2.to(".page3-part1 h1 span",{
    color:"#111",
    stagger:0.2,
})
tl2.to(".page3-part1",{
    transform:"translate(-100vw)",
    duration:7
},"anam")
tl2.to(".page3-part2",{
    transform:"translate(-750vw)",
    duration:100
},"anam")
}
textAnimation()

function element(){
    gsap.to("#elem1",{
        borderTop:"2px solid #fff",
        borderBottom:"2px solid #fff"
    })
    gsap.to("#elem1 h1",{
        opacity:1,
    })
    gsap.to("#elem1 p",{
        opacity:1,
    })
    
    var tl3 = gsap.timeline({
        scrollTrigger: {
            trigger:"#container",
            scroller:"#main",
            pin:true,
            start:"top 10%",
            end:"top -100%",
            scrub:1,
            // markers:true
        }
    })
    
    tl3.to("#page4 img", {
        y:200
    })
    tl3.to("#elem1",{
        opacity:.5,
        borderTop:"1px solid #fff",
    },"ok")
    tl3.to("#elem1 p",{
        opacity:0,
    },"ok")
    tl3.to("#elem2 h1",{
        opacity:1,
    },"ok")
    tl3.to("#elem2",{
        borderBottom:"2px solid #fff"
    },"ok")
    tl3.to("#elem2 p",{
        opacity:1,
    },"ok")
    tl3.to("#page4 img", {
        y:400
    })
    tl3.to("#elem2 h1",{
        opacity:.5,
    },"pl")
    tl3.to("#elem2 p",{
        opacity:0,
    },"pl")
    tl3.to("#elem2",{
        borderTop:"1px solid #fff"
    },"ok")
    tl3.to("#elem3",{
        borderBottom:"2px solid #fff"
    },"ok")
    tl3.to("#elem3 h1",{
        opacity:1,
    },"pl")
    tl3.to("#elem3 p",{
        opacity:1,
    },"pl")
    
}
element()


var text2 = document.querySelector(".page5-part1 h1").textContent.split("")

var clutter = ""
text2.forEach(function(elem){
    clutter += `<span>${elem}</span>`
})

document.querySelector(".page5-part1 h1").innerHTML = clutter;

tl4 = gsap.timeline({
    scrollTrigger:{
        trigger:"#textanim",
        scroller:"#main",
        pin:true,
        start:"top 0",
        end:"top -800%",
        scrub:2
    }
})

tl4.to(".page5-part1 h1 span",{
    color:"#000",
    stagger:0.2
})
tl4.to(".page5-part1",{
    transform:"translateX(-100vw)",
    duration:8
},"lol")
tl4.to(".page5-part2",{
    transform:"translateX(-750vw)",
    duration:102
},"lol")


var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  
  
  function cursor(){
      document.addEventListener("mousemove",function(dets){
          gsap.to("#cursor",{
              left:dets.x,
              top:dets.y,
            })
        })
        
        var a = document.querySelectorAll(".swiper-slide")
        a.forEach(function(elem){
            elem.addEventListener("mouseenter",function(){
                gsap.to("#cursor",{
                    transform: "translate(-50%,-50%) scale(1)"
                })
        })
        elem.addEventListener("mouseleave",function(){
            gsap.to("#cursor",{
                transform: "translate(-50%,-50%) scale(0)"
            })
        })
    })
}
cursor();

// gsap.to("#smile",{
//     rotate:5,
//     duration:0.5,
//     yoyo:1
// }) 
