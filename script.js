

let orderedItems = document.getElementById('orederedBurgerList');
orderedItems.innerHTML = '';

let orderStatus = document.getElementById('order_Recieved_Msg');
orderStatus.innerHTML = '';

let paymentStatus = document.getElementById('payment_Status_Msg');
paymentStatus.innerHTML = '';

let unOrderedListEl = document.getElementById('burgerList');
unOrderedListEl.innerHTML = '';

let thnksMsg = document.getElementById('thnks_Msg');
thnksMsg.innerHTML = '';

//Promise chaining
getmenu()
    .then((data1) => take_order(data1))
    .then(() => orderPrep())
    .then(() => payOrder())
    .then(() => thankyouFnc())
    .catch((e) => {
        console.log("ERROR>", e);
      });
      

//Get menu function
function getmenu(){
    return new Promise((resolve, reject) => {
        console.log(`1. Menu will be displayed on webpage shortly....(time required for fetching data)`);
        fetch("https://free-food-menus-api-production.up.railway.app/burgers").then((response)=> response.json()).then((data)=>{
        let menu = [];
        for (const menuName of data) {
            menu.push(menuName.name);
            unOrderedListEl.innerHTML += `<p>${menuName.name}</p>`
        }
        resolve(menu);
    })
      });
}

//take order function
function take_order(data1){
    let burg1Index = Math.floor(Math.random()*57);
        let burg2Index = burg1Index + 1;
        let burg3Index = burg1Index + 2;
        let burg1 = data1[burg1Index];
        let burg2 = data1[burg2Index];
        let burg3 = data1[burg3Index];
        let obj = {item1: `${burg1}`, item2: `${burg2}`, item3: `${burg3}`};
    return new Promise((resolve,reject)=>{
        console.log("2. User has ordered following burgers(2500 ms delay)");
        setTimeout(()=>{
                console.log(`item 1: ${burg1} \n item 2: ${burg2} \n item 3: ${burg3}`);
                document.getElementById('menu').classList.add('hidden');
                orderedItems.innerHTML += `
                <p>${burg1}</p>
                <p>${burg2}</p>
                <p>${burg3}</p>
                `
                resolve(obj)
            }, 2500)
        })
}

//order preparation function
function orderPrep(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            orderStatus.innerHTML += `items are added in your cart`
            paymentStatus.innerHTML += `<h4 style="color:red;">Please do payment to proceed further</h4>`
            console.log(`3. Order is recieved, payment is in process...(1500 ms dealay)`);
            console.log({order_status:true, paid:false});
            resolve({order_status:true, paid:false})
        },1500)
    })
}


// pay order function
function payOrder(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            paymentStatus.innerHTML = `<h4 style="color:green;">Payment Recieved...</h4>`
            console.log(`4. Payment recieved, Order is confirmed & will be delivered (1000 ms delay)`);
            console.log({order_status:true, paid:true});
            resolve({order_status:true, paid:true})
        },1000)
    })
}



//thank you function
function  thankyouFnc(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(`Order is delievered`); 
            resolve(alert('Order is delievered Thanks!!!'))
        },1500)
    })
}



