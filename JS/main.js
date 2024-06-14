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

let cart_products = [];
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
            item_num.textContent = cart_products.length;
            cart_test.style.display = "block"
        } else {
            cart_pro_con.innerHTML = `
                <h4>
                    <i class="fa-solid fa-cart-arrow-down fa-bounce"></i>
                </h4>
            `
            quantities.style.display = "none"
            cart_test.style.display = "none"
            item_num.textContent = "No"
        }

    if(cart_show_icon.classList.contains("fa-fade"))
        {
            quantities.style.display = "none"
        } else {
            quantities.style.display = "flex"
        }  
}

 
product_box.forEach((e) => {
    e.addEventListener("click", (e) => {

        if( e.target.classList.contains("cart_btn") || e.target.classList.contains("cart_chose"))
        {
            const pro_info = e.target.closest(".product_box").querySelector(".pro_info").textContent;
            const w_do = "cart"
            cart_show(pro_info,w_do);
        }

        if(e.target.classList.contains("fa-heart"))
            {
                const heart = e.target.closest(".product_box").querySelector(".fa-heart");
                heart.style.color = "red";
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
            console.log("l")
            const pro_info = e.target.closest(".cart_info").querySelector(".cart_pro_info").textContent;
            const w_do = "remove"
           
            cart_show(pro_info,w_do);
        }
})

