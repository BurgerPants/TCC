function randomLetter() {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return possible.charAt(Math.floor(Math.random() * possible.length))
}

function generateLetters(num, mustHaveLetter){
    let letters = []
    while(letters.length < num){
        let newLetter = randomLetter()
        if(letters.indexOf(newLetter) === -1){
            letters.push(newLetter)
        }
    }
    if(letters.indexOf(mustHaveLetter) === -1){
        let index = Math.floor(Math.random() * num)
        letters[index] = mustHaveLetter
    }
    return letters
}

class menu extends Phaser.Scene {
    constructor() {
        super({ key: "menu" })
    }
    preload() {

    }
    update() {

    }
    create() {
        let background = this.add.graphics()
        background.fillStyle(0xff0000, 1)
        background.fillRect(0, 0, 800, 600)

        let startButton = this.add.text(100, 100, 'Começar Jogo', { fill: '#000' })
        startButton.setInteractive()
        startButton.on('pointerup', function () {
            this.scene.scene.start('main')
            console.log("qualquer coisa")
        })
    }
}

class main extends Phaser.Scene {
    constructor() {
        super({ key: "main" })
    }
    preload() {

    }
    update() {

    }
    create() {
        let background = this.add.graphics()
        background.fillStyle(0x000000, 1)
        background.fillRect(0, 0, 800, 600)

        let letterStyle = {
            fontSize: '50px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center'
        }

        let finalLetter1 = this.add.text(200, 100, "_", letterStyle)
        let finalLetter2 = this.add.text(400, 100, "_", letterStyle)
        let finalLetter3 = this.add.text(600, 100, "_", letterStyle)

        let word = ["M", "O", "T", "O"]
        let index = 0

        

        let letter1 = this.add.text(200, 300, "0", letterStyle)
        let letter2 = this.add.text(400, 300, "1", letterStyle)
        let letter3 = this.add.text(600, 300, "2", letterStyle)

        letter1.isLetter = true
        letter2.isLetter = true
        letter3.isLetter = true
    
        letter1.setInteractive()
        letter2.setInteractive()
        letter3.setInteractive()

        function refreshLetters(){
            if(index < word.length){
                let letters = generateLetters(3, word[index])
                letter1.setText(letters[0])
                letter2.setText(letters[1])
                letter3.setText(letters[2])
            }else{
                console.log("acabou!")
            }
        }

        refreshLetters()

        this.input.on('pointerup', function (pointer, gameObject) {
            console.log("algo")
            console.log(gameObject)
            console.log(gameObject[0])
            if(gameObject[0] && gameObject[0].isLetter){
                let clickedLetter = gameObject[0]._text
                if(clickedLetter === word[index]){
                    console.log('acertou!')
                    index++
                    refreshLetters()
                }else{
                    console.log('errou!')
                    refreshLetters()
                }
            }
            
            
        });

        /*letter1.on('pointerup', validateLetters)
        letter2.on('pointerup', validateLetters)
        letter3.on('pointerup', validateLetters)*/
    }
}

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [menu, main]
};

let game = new Phaser.Game(config);

