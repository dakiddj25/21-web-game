document.addEventListener("DOMContentLoaded", () => {
let hand = []
let cpuHand = []
let deck_id = ""
let cpuscore = 0;
let score = 0;

    const fetchData = async () =>{
        try{
         res = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
        }
        catch(err) {
            console.log(err)
            debugger
        }
        deck_id = res.data.deck_id

    }

    drawCards = async (cardhand,callback, num = 2) => {
        try {
            let draw = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${num}`)

           draw.data.cards.forEach( (el) => {
               cardhand.push(el)
         
           })
    
           callback()
       
        }
        catch(err) {
            console.log(err)
            debugger
        }
    }

    humanPlayer =() => {
        let div = document.querySelector("#human");
       
        if(hand.length === 2){
            hand.forEach((el, i) => {
                let img = document.createElement("img")
               img.src =el.image
               console.log(el , i)
               div.appendChild(img)

               if(el.value === "KING" || el.value === "QUEEN" || el.value === "JACK"  ){
                score += 10;
            } else if(el.value === "ACE" ){
                score += 11;
            } else {
                score += Number(el.value)
            }
        })
        isScore(score)
        } else {
            let img = document.createElement("img")
            img.src = hand[hand.length-1].image
            console.log(hand.length)
            div.appendChild(img)

            score = 0;
        hand.forEach(el => {
            if(el.value === "KING" || el.value === "QUEEN" || el.value === "JACK"  ){
                score += 10;
            } else if(el.value === "ACE" ){
                score += 11;
            } else {
                score += Number(el.value)
            }
            
         })
        isScore(score)
        } 

    }

    isBust = (score, h3) => {
        // let h3 = document.querySelector("h3")
        if(score === 21){
            h3.innerText =  `Your score is: ${score} WIN!`
            let hit = document.querySelector("#hit")
            hit.style.display = "none"
            let stay = document.querySelector("#stay")
            stay.style.display = "none"
        }
    if(score > 21){
        let hit = document.querySelector("#hit")
        hit.style.display = "none"
        let stay = document.querySelector("#stay")
        stay.style.display = "none"
        h3.innerText =  `Your score is: ${score} You lose!`
        showCpuHand()
    }
    }

    isScore = (score) => {
       let h3 = document.querySelector("#score")
       let div = document.querySelector("#human");
       h3.innerText =  `Your score is: ${score}`
        div.appendChild(h3)
        isBust(score,h3);
    }

    CpuScorecount = (cpscore) => {
        let h3 = document.querySelector("#cpuscore")
        let div = document.querySelector("#cpu");
        // h3.innerText =  `House score is: `
         div.appendChild(h3)
         isBust(cpscore,h3);
     }
    

    stayGame = () => {
        let hit = document.querySelector("#hit")
            hit.style.display = "none"
        let stay = document.querySelector("#stay")
        stay.style.display = "none"
        if(cpuscore < 10){
            drawCards(cpuHand,cpuPlayer, 1)
        }
            if(score < 21 && score > cpuscore){
                console.log("you win")
                let h3 = document.querySelector("#score")
                h3.innerText =  `Your score is: ${score} You Win`
            } else {
                console.log(score +"CPU WINS")
                let h3 = document.querySelector("#cpuscore")
                h3.innerText =  `CPU score is: ${cpuscore} House Wins`
            }

    }

    let staybtn = document.querySelector("#stay")
    staybtn.addEventListener("click", () => {
        if(hand.length > 1){
        showCpuHand()
           stayGame()
        staybtn.style.display = "none"
        }
    })



    let start = document.querySelector("#start")
    start.addEventListener("click", () => {
        if(hand.length < 2){
            drawCards(hand,humanPlayer)
            drawCards(cpuHand,cpuPlayer)

        }
        start.style.display = "none"
        
    })

    let hit = document.querySelector("#hit")
    hit.addEventListener("click", () => {
        if(hand.length > 1){
            drawCards(hand,humanPlayer, 1)   
        }
        
    })


    cpuPlayer = () => {
        let div = document.querySelector("#cpu");
       

        if(cpuHand.length === 2){
            cpuHand.forEach((el, i) => {
                let img = document.createElement("img")
                img.id = "cpuImg"
               img.src = "https://www.atomsindustries.com/assets/images/items/ASD1750/roadhouse-back.png"
               console.log(el , i)
               div.appendChild(img)
               

               if(el.value === "KING" || el.value === "QUEEN" || el.value === "JACK"  ){
                cpuscore += 10;
            } else if(el.value === "ACE" ){
                cpuscore += 11;
            } else {
                cpuscore += Number(el.value)
            }
        })

        CpuScorecount(cpuscore)
        } else {
            let img = document.createElement("img")
            img.src = cpuHand[cpuHand.length-1].image
            console.log(cpuHand.length)
            div.appendChild(img)

        cpuHand.forEach(el => {
            
            if(el.value === "KING" || el.value === "QUEEN" || el.value === "JACK"  ){
                cpuscore += 10;
            } else if(el.value === "ACE" ){
                cpuscore += 11;
            } else {
                cpuscore += Number(el.value)
            }
            
         })
         CpuScorecount(cpuscore)
        } 
    }

    const showCpuHand =() =>{
        let div = document.querySelector("#cpu");
        div.innerHTML = ""
        cpuHand.forEach(el => {
            let img = document.createElement("img")
            img.src = el.image
            div.appendChild(img)
            // debugger
        })
        let cpuh3 = document.createElement("h3")
        cpuh3.innerText = `CPU score is: ${cpuscore}`
        cpuh3.id = "cpuscore"
        div.appendChild(cpuh3)
        stayGame()
    }
    


fetchData()



 })