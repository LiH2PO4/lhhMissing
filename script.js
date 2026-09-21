
/*--------------谜题部分----------------*/
    const correctPassword1 = "Let's play";

    document.getElementById("checkBtn1").addEventListener("click", function () {
        const input = document.getElementById("passwordInput1").value;
        if (input === correctPassword1) {
            document.getElementById("clue1").style.display = "block";
            document.getElementById("errorMsg1").style.display = "none";
            document.getElementById("passwordInput1").disabled = true;
            document.getElementById("checkBtn1").disabled = true;
        } else {
            document.getElementById("errorMsg1").style.display = "block";
        }
    });

/* =====================翻翻乐======================== */
    const imageNames = [
        'flip1.jpg',
        'flip2.jpg',
        'flip3.jpg',
        'flip4.jpg',
        'flip5.jpg',
        'flip6.jpg',
        'flip7.jpg',
        'flip8.jpg'
    ];

    const board = document.getElementById('board');
    
    let cards = [...imageNames, ...imageNames];
    cards.sort(() => Math.random() - 0.5);

    let firstCard = null;
    let lockBoard = false;

    cards.forEach(name => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
        <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">
            <img src="images/${name}" alt="">
            </div>
        </div>
        `;
        card.addEventListener('click', () => flipCard(card, name));
        board.appendChild(card);
    });

    const totalCards = cards.length; 

    function flipCard(card, name) {
        if (lockBoard) return;
        if (card.classList.contains('flipped')) return;

        card.classList.add('flipped');

        if (!firstCard) {
        firstCard = { card, name };
        return;
    }


    if (firstCard.name === name) {
        firstCard = null;
        const flippedCount = document.querySelectorAll('.card.flipped').length;
        if (flippedCount === totalCards) {
            document.getElementById('clue2').style.display = 'block';
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.card.classList.remove('flipped');
            card.classList.remove('flipped');
            firstCard = null;
            lockBoard = false;
        }, 800);
    }
  }
/* ======================第三部分======================= */
const correctPassword3 = "362857419";

document.getElementById("checkBtn3").addEventListener("click", function () {
    const input = document.getElementById("passwordInput3").value;
    if (input === correctPassword3) {
        document.getElementById("clue3").style.display = "block";
        document.getElementById("errorMsg3").style.display = "none";
        document.getElementById("passwordInput3").disabled = true;
        document.getElementById("checkBtn3").disabled = true;
    } else {
        document.getElementById("errorMsg3").style.display = "block";
    }
});

/* ======================第四部分======================= */
    const correctPassword4a1 ="10:00";
    const correctPassword4a2 ="12:25";
    const correctPassword4a3 ="18:30";
    const correctPassword4a4 ="20:55";

    function cleanTime(str) {
        return str.trim().replace(/：/g, ':');
    }

    document.getElementById("checkBtn4").addEventListener("click", function () {
        const time1 = cleanTime(document.getElementById("passwordInput4a1").value);
        const time2 = cleanTime(document.getElementById("passwordInput4a2").value);
        const time3 = cleanTime(document.getElementById("passwordInput4a3").value);
        const time4 = cleanTime(document.getElementById("passwordInput4a4").value);

        let course1 = false;
        let course2 = false;

        if(time1 === correctPassword4a1 && time2 === correctPassword4a2){
            course1 = true;
        }
        if(time3 === correctPassword4a3 && time4 === correctPassword4a4){
            course2 = true;
        }

        document.getElementById("errorMsg4a1").style.display = "none";
        document.getElementById("errorMsg4a2").style.display = "none";

        if (course1 && course2) {
            document.getElementById("clue4").style.display = "block";
            document.getElementById("passwordInput4a1").disabled = true;
            document.getElementById("passwordInput4a2").disabled = true;
            document.getElementById("passwordInput4a3").disabled = true;
            document.getElementById("passwordInput4a4").disabled = true;
            document.getElementById("checkBtn4").disabled = true;
        } else {
            if (!course1) {
                document.getElementById("errorMsg4a1").style.display = "block";
            }
            if (!course2) {
                document.getElementById("errorMsg4a2").style.display = "block";
            }
        }
    });  

/* ======================第五部分======================= */
    const correctPassword5a1 = "Lovecraft";
    const correctPassword5a2 ="I AM PROVIDENCE";

    document.getElementById("checkBtn5").addEventListener("click", function () {
        const name = document.getElementById("passwordInput5a1").value;
        const sentence = document.getElementById("passwordInput5a2").value;

        const nameCorrect = name.toLowerCase() === correctPassword5a1.toLowerCase();
        const sentenceCorrect = sentence.toLowerCase() === correctPassword5a2.toLowerCase();

        // 先全部隐藏
        document.getElementById("errorMsg5a1").style.display = "none";
        document.getElementById("errorMsg5a2").style.display = "none";

        if (nameCorrect && sentenceCorrect) {
            document.getElementById("clue5").style.display = "block";
            document.getElementById("passwordInput5a1").disabled = true;
            document.getElementById("passwordInput5a2").disabled = true;
            document.getElementById("checkBtn5").disabled = true;
        } else {
            if (!nameCorrect) {
                document.getElementById("errorMsg5a1").style.display = "block";
            }
            if (!sentenceCorrect) {
                document.getElementById("errorMsg5a2").style.display = "block";
            }
        }
    });

/* ======================琴键部分======================= */

    (function() {
        const MAX_LENGTH = 6;
        const CORRECT_ANSWER = ['g1','g1','a1','g1','c2','b1'];
        const audioMap = {
        'c1': './sounds/do.mp3',   
        'd1': './sounds/re.mp3',
        'e1': './sounds/mi.mp3',
        'f1': './sounds/fa.mp3',
        'g1': './sounds/so.mp3',
        'a1': './sounds/la.mp3',
        'b1': './sounds/xi.mp3',
        'c2': './sounds/do2.mp3',
        'd2': './sounds/re2.mp3',
        'e2': './sounds/mi2.mp3'
        };

        const userSequence = [];
        window.userSequence = userSequence;

        const audioPlayers = {};
        Object.keys(audioMap).forEach(note => {
            const src = audioMap[note];
            if (src && src.trim() !== '') {
                const audio = new Audio(src);
                audio.preload = 'auto';
                audio.volume = 0.6;
                audioPlayers[note] = audio;
            }
        });

        // 获取所有白键
        const slotsContainer = document.getElementById('slots');
        const statusEl = document.getElementById('status');
        const whiteKeys = document.querySelectorAll('.white-key');

        // 初始化槽位
        for (let i = 0; i < MAX_LENGTH; i++) {
            const slot = document.createElement('div');
            slot.className = 'slot';
            slotsContainer.appendChild(slot);
        }
        const slotEls = document.querySelectorAll('.slot');

        // 刷新界面显示
        function render() {
            slotEls.forEach((el, i) => {
                if (userSequence[i]) {
                el.textContent = userSequence[i].replace('4', ''); // 只显示字母更简洁
                el.classList.add('filled');
                } else {
                el.classList.remove('filled');
                }
                el.classList.remove('error');
            });

            // 显示状态
            if (userSequence.length === MAX_LENGTH) {
                if (isCorrect()) {
                statusEl.textContent = '✓ 正确,请点击下方钥匙';
                statusEl.className = 'status success';
                } else {
                statusEl.textContent = '✗ 错误';
                statusEl.className = 'status error';
                }
            } else {
                statusEl.textContent = `${userSequence.length} / ${MAX_LENGTH}`;
                statusEl.className = 'status';
            }
            }

            // 判断答案是否正确
        function isCorrect() {
            if (userSequence.length !== CORRECT_ANSWER.length) return false;
            return userSequence.every((v, i) => v === CORRECT_ANSWER[i]);
        }

            // 清空序列
        function clearSequence() {
            userSequence.length = 0;
            slotEls.forEach(el => {
                el.textContent = ' ';
                el.classList.remove('filled', 'error');
            });
            statusEl.textContent = `0 / ${MAX_LENGTH}`;
            statusEl.className = 'status';
        }

        window.clearSequence = clearSequence;

        // 白键点击事件
        whiteKeys.forEach(key => {
            key.addEventListener('click', function () {
                // 如果已经满了，先清空（防止溢出）
                if (userSequence.length >= MAX_LENGTH) {
                    return;
                }

                const note = this.dataset.note;
                if (!note) return;

                // 记录
                userSequence.push(note);

                const player = audioPlayers[note];
                if (player) {
                    player.currentTime = 0;
                    player.play().catch(err => console.warn(`播放 ${note} 失败:`, err));
                }

                this.classList.add('active');
                setTimeout(() => this.classList.remove('active'), 100);

                render();

                // 到达6位时判断
                if (userSequence.length === MAX_LENGTH) {
                    if (isCorrect()) {
                        console.log('✓ 答案正确:', [...userSequence]);
                        document.getElementById("keyImg").style.display = "block";
                    } else {
                        console.log('✗ 答案错误，即将清空:', [...userSequence]);
                        // 标记错误动画
                        slotEls.forEach(el => el.classList.add('error'));
                        // 延迟清空
                        setTimeout(() => {
                            clearSequence();
                        }, 800);
                    }
                }
            });
        });

        render();
        console.log('钢琴已就绪。 序列上限:', MAX_LENGTH, ' 正确答案:', CORRECT_ANSWER);

        })();
    
/* ======================表演部分======================= */
    (function() {
        const keyImg = document.getElementById('keyImg');
        const effectArea = document.getElementById('effectArea');
        const imgA = document.getElementById('imgA');
        const imgB = document.getElementById('imgB');
        let playing = false;   // 防止重复触发

        keyImg.addEventListener('click', function() {
            if (playing) return;
            playing = true;

            document.querySelector('nav').style.display = 'none';
            document.querySelector('main').style.display = 'none';
            document.getElementById("buju").style.display = "none";
            document.getElementById("q6").style.display = "none";
            document.body.style.backgroundImage = 'none';
            document.getElementById("a1").style.display = "block";

            // 显示区域
            imgA.classList.add('show');
    
            setTimeout(() => {
                const audio = new Audio('sounds/toyou.mp3');
                audio.volume = 0.6;
                audio.play().catch(err => console.warn('播放失败:', err));

                setTimeout(() => {
                imgA.classList.add('hide');

                    setTimeout(() => {
                        imgB.classList.add('zoomIn');

                        setTimeout(() => {
                        document.getElementById("final").style.display = "block";
                        }, 8000);
                    }, 800);
                }, 14000);

            }, 1000);      // ← 静止

        });
    })();
