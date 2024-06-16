import 
{ 
    hot_see_btn,feat_see_btn,hot_scroll,feat_scroll,hot_back_btn,hot_next_btn,
    feat_back_btn,feat_next_btn,search_tag,menu_btn,brand_icon,quantities,
    h_love_btn,fav,item_num,
    hot_product,body
}
from "./selector.js";

import
{
    hot_show,feat_show,hot_see_show,feat_see_show,back_scroll,
    next_scroll,search_result_show,menu_show,
    pu_show,
}
from "./function.js"
import { products } from "./products.js";


//header 
search_tag.addEventListener("keyup",() => search_result_show())
menu_btn.addEventListener("click",menu_show);

if(body.classList.contains("home"))
    {
        hot_show();
        feat_show();
        hot_see_btn.addEventListener("click", hot_see_show);
        feat_see_btn.addEventListener("click",feat_see_show);

        hot_next_btn.addEventListener("click", () => {
            next_scroll(hot_scroll);
            hot_back_btn.classList.remove("dis_none")
            hot_scroll.scrollLeft > 1500 && hot_next_btn.classList.add("dis_none") 
        });
        hot_back_btn.addEventListener("click", () =>{
            back_scroll(hot_scroll)
            hot_next_btn.classList.remove("dis_none")
            hot_scroll.scrollLeft < 1500 && hot_back_btn.classList.add("dis_none") 
        });

        feat_next_btn.addEventListener("click", () => {
            next_scroll(feat_scroll);
            feat_back_btn.classList.remove("dis_none")
            feat_scroll.scrollLeft > 1500 && feat_next_btn.classList.add("dis_none") 
        });
        feat_back_btn.addEventListener("click", () =>{
            back_scroll(feat_scroll)
            feat_next_btn.classList.remove("dis_none")
            feat_scroll.scrollLeft < 1500 && feat_back_btn.classList.add("dis_none") 
        });
    }


const product_box = document.querySelectorAll(".product_box")
console.log(product_box.length);

const buy = document.querySelectorAll("#buy_now");
const cart_btn = document.querySelectorAll(".cart_btn")
const love_btn = document.querySelectorAll(".love_btn");
const cart_show_btn = document.querySelector(".cart_show_btn");
const cart_show_icon = document.querySelector(".cart_show_icon");
const cart_container = document.querySelector(".cart_container");
const cart_pro_con = document.querySelector(".cart_pro_con");
const total_price = document.querySelector(".total_price");
const cart_test = document.querySelector(".cart_test");

const fav_pro_con = document.querySelector(".fav_pro_con");
const fav_show_icon = document.querySelector(".fav_show_icon");
const fav_container = document.querySelector(".fav_container");
const fav_show_btn = document.querySelector(".fav_show_btn");



cart_show_btn.addEventListener("click", () => {
    if(cart_container.classList.contains("dis_none"))
        {
            cart_container.classList.remove("dis_none");
            cart_container.classList.add("dis_bl");
            cart_show_icon.classList.remove("fa-cart-shopping");
            cart_show_icon.classList.add("fa-xmark");
            cart_show_icon.classList.add("fa-fade");
            cart_show_btn.style.background = "#ff4603";
            cart_show_btn.style.color = "white";
            quantities.style.display = "none";

        } else {
            cart_container.classList.add("dis_none");
            cart_container.classList.remove("dis_bl");
            cart_show_icon.classList.add("fa-cart-shopping");
            cart_show_icon.classList.remove("fa-xmark");
            cart_show_icon.classList.remove("fa-fade");
            cart_show_btn.style.background = "";
            cart_show_btn.style.color = "black";
             if(cart_products.length === 0)
                {
                    quantities.style.display = "none"
                } else {
                    quantities.style.display = "flex"
                }
        }
})

fav_show_btn.addEventListener("click", () => {
    if(fav_container.classList.contains("dis_none"))
        {
            fav_container.classList.remove("dis_none");
            fav_container.classList.add("dis_bl");
            fav_show_icon.classList.remove("fa-heart");
            fav_show_icon.classList.add("fa-xmark");
            fav_show_icon.classList.add("fa-fade");
            fav_show_btn.style.background = "#ff4603";
            fav_show_btn.style.color = "white";
            fav.style.display = "none";

        } else {
            fav_container.classList.add("dis_none");
            fav_container.classList.remove("dis_bl");
            fav_show_icon.classList.add("fa-heart");
            fav_show_icon.classList.remove("fa-xmark");
            fav_show_icon.classList.remove("fa-fade");
            fav_show_btn.style.background = "";
            fav_show_btn.style.color = "black";
             if(fav_products.length === 0)
                {
                    fav.style.display = "none"
                } else {
                    fav.style.display = "flex"
                }
        }
})

let cart_products = [];
let fav_products = [];
let sum_price = 0;
const cart_show = (pro_info, w_do ) => {
    const cart_filter = products.filter(e => e.info === pro_info)[0];

    if(cart_products.every(e => e !== cart_filter))
        {
            cart_products.push(cart_filter);
            cart_products[cart_products.indexOf(cart_filter)].quantity = 1;
        } else { 
            if(w_do == "mi")   
                {
                    if(cart_products[cart_products.indexOf(cart_filter)].quantity > 1)
                        {
                            cart_products[cart_products.indexOf(cart_filter)].quantity -= 1;
                            
                        } else {
                            cart_products.splice(cart_products.indexOf(cart_filter),1)
                        }
                    
                } 

            if(w_do == "pu" || w_do == "cart")
                {
                    cart_products[cart_products.indexOf(cart_filter)].quantity += 1;
                } 
                
            if(w_do == "remove")
                {
                    cart_products.splice(cart_products.indexOf(cart_filter),1)
                }
        }

        sum_price = 0;
    cart_pro_con.innerHTML = "";
    cart_products.forEach((e) => {

        sum_price += e.price*e.quantity;
        total_price.textContent = "$ " + parseInt(sum_price);
        cart_pro_con.innerHTML += `
        <div class = "cart_pro">
            <div class="cart_img"><img src="${e.img}.png" alt=""></div>
            <div class="cart_info">
                <p class = "cart_pro_info">${e.info}</p>
                <article>
                    <div class="pro_quantity bg_change"><button class = "q_pu">+</button><input class="bg_change q_value" value="${e.quantity}" type="text"><button class = "q_min">-</button></div>
                    <em>$ ${parseInt(e.price*e.quantity)}</em>
                </article> 
                <button class = "remove_btn"><i class="fa-solid fa-xmark fa-fade remove"></i></button>              
            </div>
        </div>
        `
    }) 

    if(cart_products.length > 0)
        {
            quantities.style.display = "flex"
            quantities.textContent = cart_products.length;
            item_num[0].textContent = cart_products.length;
            cart_test.style.display = "block"
        } else {
            cart_pro_con.innerHTML = `
                <h4>
                    <i class="fa-solid fa-cart-arrow-down fa-bounce"></i>
                </h4>
            `
            quantities.style.display = "none"
            cart_test.style.display = "none"
            item_num[0].textContent = "No"
        }

    if(cart_show_icon.classList.contains("fa-fade"))
        {
            quantities.style.display = "none"
        } else {
            quantities.style.display = "flex"
        }  
}

const fav_show = (fav_pro_con,fav_products) => {
    fav_pro_con.innerHTML = "";
    fav_products.forEach((e) => {
        fav_pro_con.innerHTML += `
        <div class = "fav_pro">
            <div class="fav_img"><img src="${e.img}.png" alt=""></div>
            <div class="fav_info">
                <p class = "fav_pro_info">${e.info}</p>
                <article>
                    <span>Price : <em>$${e.price}</em></span>
                    <button id="buy_now" class="b3 buy_btn">Buy Now</button>
                    <button class="cart_btn b3"><i class="fa-solid fa-cart-shopping cart_chose"></i></button>
                </article> 
                <button class = "remove_btn"><i class="fa-solid fa-xmark fa-fade remove"></i></button>              
            </div>
        </div>
        `
    }) 

    if(fav_products.length > 0 )
        {
            fav.textContent = fav_products.length;
            item_num[1].textContent = fav_products.length;
            if(fav_show_icon.classList.contains("fa-fade"))
                {
                    fav.style.display = "none";
                } else {
                    fav.style.display = "flex";
                }
        } else {
            fav.style.display = "none";
            item_num[1].textContent = "No"
            fav_pro_con.innerHTML = `
                <h4>
                    <i class="fa-solid fa-cart-arrow-down fa-bounce"></i>
                </h4>
            `
        }
}
 
product_box.forEach((e) => {
    e.addEventListener("click", (e) => {

        const pro_info = e.target.closest(".product_box").querySelector(".pro_info").textContent;

        if( e.target.classList.contains("cart_btn") || e.target.classList.contains("cart_chose"))
        {
           
            const w_do = "cart"
            cart_show(pro_info,w_do);
        }

        if(e.target.classList.contains("fa-heart"))
            {
                const pro_box = e.target.closest(".product_box");
                const heart = pro_box.querySelector(".fa-heart");
                const love_btn = pro_box.querySelector(".love_btn");
                const save = pro_box.querySelector(".save");
                const fav = document.querySelector(".fav");

                const fav_filter = products.filter(e => e.info === pro_info)[0];

                if(heart.classList.contains("click"))
                    {
                        heart.classList.remove("click");
                        heart.style.color = "";
                        love_btn.style.opacity = .5;
                        save.style.background = "";

                        fav_products.splice(fav_products.indexOf(fav_filter),1)
                    } else {
                        heart.classList.add("click");
                        heart.style.color = "red";
                        love_btn.style.opacity = 1;
                        save.style.background = "#38B5FA";
                        fav_products.push(fav_filter);
                    }

                fav_show(fav_pro_con,fav_products);   
            }
            
    })
    
})
 
cart_pro_con.addEventListener("click", (e) => {
    const cart_pro = document.querySelectorAll(".cart_pro");
    const cart_pro_info = document.querySelectorAll(".cart_pro_info");


    if(e.target.classList.contains("q_pu"))
        {
            const pro_info = e.target.closest(".cart_info").querySelector(".cart_pro_info").textContent;
            const w_do = "pu";
            cart_show(pro_info,w_do);
        }
    
    if(e.target.classList.contains("q_min"))
        {
            const pro_info = e.target.closest(".cart_info").querySelector(".cart_pro_info").textContent;
            const w_do = "mi"
            cart_show(pro_info,w_do);
        }
    
    if(e.target.classList.contains("remove"))
        {
            const pro_info = e.target.closest(".cart_info").querySelector(".cart_pro_info").textContent;
            const w_do = "remove"
           
            cart_show(pro_info,w_do);
        }
})

fav_pro_con.addEventListener("click", (e) => {
    // const fav_pro = document.querySelectorAll(".fav_pro");
    // const fav_pro_info = document.querySelectorAll(".fav_pro_info");
    const pro_info = e.target.closest(".fav_info").querySelector(".fav_pro_info").textContent;

    if(e.target.classList.contains("remove"))
        {
            
            const fav_filter = products.filter(e => e.info === pro_info)[0];
            console.log(fav_filter.id);

            fav_products.splice(fav_products.indexOf(fav_filter),1)
            fav_show(fav_pro_con,fav_products);
        }

        if( e.target.classList.contains("cart_btn") || e.target.classList.contains("cart_chose"))
        {
            
            const w_do = "cart"
            cart_show(pro_info,w_do);
        }
})

