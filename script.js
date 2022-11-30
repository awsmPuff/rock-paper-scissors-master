const mediaQuery1 = window.matchMedia('(min-width: 768px)')
const mediaQuery2 = window.matchMedia('(min-width: 1300px)')
// Rules
const rulesBtn = document.querySelector('.rules')
const closeBtn = document.querySelector('.close')
const rulesCon = document.querySelector('.rules-content')
rulesBtn.addEventListener('click', () => {
    rulesCon.style.display = 'flex'
})
closeBtn.addEventListener('click', () => {
    rulesCon.style.display = 'none'
})
// Game
const score = document.querySelector('.score')
const initial = document.querySelector('.whole')
const rival = document.querySelector('.rival')
const selectedPose = document.querySelector('.pose1-content')
const randomPose = document.querySelector('.pose2-content')
const expectedPose = document.querySelector('.pose1-img')
const randomImg = document.querySelector('.pose2-img')
const restart = document.querySelector('.restart')
const result = document.querySelector('.result')
const comment = document.querySelector('.comment')
const effect = document.querySelector('.effect')
const poses = ['paper', 'scissors', 'rock']

initial.addEventListener('click', (e) => {
    randomImg.style.display = 'none'

    const {target} = e;
    console.log(target);
    if(!target.matches('img')) {
        return;
    } else if (!target.classList.contains('triangle')) {
        if(target.classList.contains('paper-img')){
            selectedPose.classList.add('paper')
            selectedPose.classList.remove('rock')
            selectedPose.classList.remove('scissors')
            expectedPose.src = './images/icon-paper.svg'
            initial.style.display = 'none';
            rival.style.display = 'flex';
        }
        if(target.classList.contains('scissors-img')){
            selectedPose.classList.add('scissors')
            selectedPose.classList.remove('paper')
            selectedPose.classList.remove('rock')
            expectedPose.src = './images/icon-scissors.svg'
            initial.style.display = 'none';
            rival.style.display = 'flex';
        }
        if(target.classList.contains('rock-img')){
            selectedPose.classList.add('rock')
            expectedPose.src = './images/icon-rock.svg'
            selectedPose.classList.remove('paper')
            selectedPose.classList.remove('scissors')
            initial.style.display = 'none'
            rival.style.display = 'flex'
        }

        setTimeout(() => {
            const randomNum = Math.floor(Math.random() * 3);
            const randomClass = poses[randomNum];
            
            randomPose.classList.add(randomClass)
            randomImg.style.display = 'block'
            randomImg.src = `./images/icon-${randomClass}.svg`
            result.style.display = 'flex'
            effect.className = 'pose1 shown';
    
            const player = selectedPose.classList[1];
            const computer = randomPose.classList[1];
            game(player, computer);
        }, 800)
    }
 
})

const game = (player, computer) => {
    if(player && computer) {
        if( player === computer) {
            comment.innerHTML = 'A Tie'
            score.innerHTML
            restart.style.color = 'hsl(229, 25%, 31%)';
        } else {
            if(player === 'paper') {
                if (computer === 'rock') {
                    comment.innerHTML = 'You Win'
                    score.innerHTML++
                    restart.style.color = 'hsl(229, 25%, 31%)';
                } else {
                    comment.innerHTML = 'You Lose'
                    score.innerHTML--
                    if (mediaQuery1.matches) {
                        restart.style.color = 'hsl(349, 70%, 56%)';
                    }
                }
            }
            else if(player === 'scissors') {
                if(computer === 'rock') {
                    comment.innerHTML = 'You Lose'
                    score.innerHTML--
                    if (mediaQuery1.matches) {
                        restart.style.color = 'hsl(349, 70%, 56%)';
                    }
                } else {
                    comment.innerHTML = 'You Win'
                    score.innerHTML++
                    restart.style.color = 'hsl(229, 25%, 31%)';
                }
            }
            else {
                if(computer === 'paper') {
                    comment.innerHTML = 'You Lose'
                    score.innerHTML--
                    if (mediaQuery1.matches) {
                        restart.style.color = 'hsl(349, 70%, 56%)';
                    }
                } else {
                    comment.innerHTML = 'You Win'
                    score.innerHTML++
                    restart.style.color = 'hsl(229, 25%, 31%)';
                }
            }
        }
    } else {
        result.style.display = 'none'
    }
        console.log('player', player);
        console.log('computer', computer);
        console.log(comment.innerHTML);
}

// Restart
restart.addEventListener('click', () => {
    result.style.display = 'none'
    rival.style.display = 'none'
    initial.style.display = 'flex'
    randomPose.classList = 'pose2-content'
})

if (mediaQuery1.matches) {
    rival.style.gap = '14rem';
}
if (mediaQuery2.matches) {
  rival.style.gap = '20rem';
}