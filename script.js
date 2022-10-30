
let playButton = document.getElementById("play");
let resultDiv = document.getElementById("result");
let p1NameDiv = document.getElementById("p1Name");
let p2NameDiv = document.getElementById("p2Name");
let p1HealthDiv = document.getElementById("p1Health");
let p2HealthDiv = document.getElementById("p2Health");
let victoryAudio = document.getElementById("victory")
let p1AttackAudio = document.getElementById("p1attack")
let p1HealAudio = document.getElementById("p1heal")
let p2AttackAudio = document.getElementById("p2attack")
let p2HealAudio = document.getElementById("p2heal")


const updateGame = (p1, p2, gameState) => {
  p1NameDiv.innerText = p1.name
  p2NameDiv.innerText = p2.name
  p1HealthDiv.innerText = p1.health
  p2HealthDiv.innerText = p2.health

  if (p1.health <=0 || p2.health <=0){
    game.isOver = true
  gameState =  game.isOver
  resultDiv.innerText = game.declareWinner(game.isOver,p1,p2)

  }

};


class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }
  // ** Attack an enemy with a random number from 0 to YOUR attackDmg bonus **
  strike(player, enemy, attackDmg) {
     // Get random number between 1 - 10 and that is damageAmount
    let damageAmount = Math.ceil(Math.random() * attackDmg);
      // Subtract the enemy health with the damageAmount
     enemy.health -= damageAmount;
    //  Update the game and DOM with updateGame()
    updateGame(p1, p2, game.isOver);
    return `${player.name} attacks ${enemy.name} for ${damageAmount}}`;
  }
  heal(player) {
    let hpAmount = Math.ceil(Math.random() * 5);
    player.health += hpAmount;
 
    updateGame(p1,p2,game.isOver)
    return `${player.name} heals for ${hpAmount} HP`
  }
}


class Game {
  constructor() {
    this.isOver = false;
  }

  declareWinner(isOver, p1, p2) {
    let message = ''
    if (isOver){
      if (p1.health <=0){
        message = `${p2.name} WINS`
      }else if (p2.health <=0){
        message =  `${p1.name} WINS`
      }
      victoryAudio.play()
    } 
   
    return message
  }

  reset(p1, p2) {
    p1.health = 100
    p2.health = 100
    this.isOver = false
    resultDiv.textContent = ''
    updateGame(p1,p2,this.isOver)

  }

  play(p1, p2) {

    this.reset(p1,p2)
     while (!this.isOver) {
      console.log(p1,p2)
      p1.strike(p1,p2,p1.attackDmg)
      p1.heal(p1)
      p2.strike(p2,p1,p2.attackDmg)
      p2.heal(p2)

    }
   return this.declareWinner(this.isOver,p1,p2)
  }
}

let player1 = new Player("Tom", 100, 15);
let player2 = new Player("Jerry", 100, 15);
let p1 = player1;
let p2 = player2;
let game = new Game()

updateGame(p1,p2,game.isOver)

let gameState= game.isOver;

playButton.onclick = () => resultDiv.innerText = game.play(p1,p2)


document.addEventListener("keydown", function (e) {
  if (e.key=='q' && p2.health>0){
    p1.strike(p1,p2,p1.attackDmg)
    p1AttackAudio.play()
  }


});

document.addEventListener("keydown", function (e) {
  
  if (e.key=='a' && p2.health>0){
    p1.heal(p1)
    p1HealAudio.play()
  }
});

 document.addEventListener("keydown", function (e) {
  if (e.key=='p' && p1.health>0){
    p2.strike(p2,p1,p2.attackDmg)
    p2AttackAudio.play()
  }
 
});

document.addEventListener("keydown", function (e) {
  
  if (e.key=='l' && p1.health>0){
    p2.heal(p2)
    p2HealAudio.play()
  }
});


 