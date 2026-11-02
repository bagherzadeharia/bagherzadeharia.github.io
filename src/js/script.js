const USERNAME = "bagherzadeharia";
document.getElementById("year").textContent = "© " + new Date().getFullYear();

function el(tag, cls, text){
    const n=document.createElement(tag);
    if(cls)n.className=cls;
    if(text)n.textContent=text;
    return n;
}

const toggle = document.getElementById("toggle"), menu = document.getElementById("menu");
function setMenu(open){
    toggle.setAttribute(
        "aria-expanded",
        open
    );
    menu.classList.toggle(
        "open",
        open
    );
}
toggle.addEventListener(
    "click",
    () => setMenu(
        toggle.getAttribute("aria-expanded") !== "true"
    )
);
menu.addEventListener(
    "click",
    e => {
        if(e.target.closest("a")) setMenu(false);
    }
);
document.addEventListener("keydown", e => {if(e.key === "Escape") setMenu(false)});
window.matchMedia("(min-width:761px)").addEventListener("change", e => {if(e.matches) setMenu(false)});

const links = [...document.querySelectorAll("#menu a")];
const map = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));
const io = new IntersectionObserver(
    es => {
        es.forEach(
            e => {
                if(e.isIntersecting){
                    links.forEach(
                        l => {
                            l.classList.remove("active");
                            l.removeAttribute("aria-current")
                        }
                    );
                    const a = map.get(e.target.id);
                    if(a){
                        a.classList.add("active");
                        a.setAttribute("aria-current","true");
                    }
                }
            }
        );
    },
    {
        rootMargin:"-30% 0px -60% 0px"
    }
);
map.forEach(
    (_, id) => {
        const s = document.getElementById(id);
        if(s) io.observe(s);
    }
);