const gameTitle = document.getElementById('gameTitle');
        const mainGrid = document.getElementById('mainGrid');
        const setContainer = document.getElementById('setContainer');
        const setNumberDisplay = document.getElementById('setNumber');
        const yesAnswerBtn = document.getElementById('yesAnswer');
        const noAnswerBtn = document.getElementById('noAnswer');
        const finalResultContainer = document.getElementById('finalResultContainer');
        const finalResult = document.getElementById('finalResult');
        const playAgainBtn = document.getElementById('playAgainBtn');
        const answerButtonsDiv = document.querySelector('.answer-buttons');

        const allSets = [
            [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31],
            [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31],
            [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31],
            [8, 9, 10, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28, 29, 30, 31],
            [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
        ];
        let currentSetIndex = 0;
        let day = 0;
        const colors = ['red', 'blue', 'green', 'purple', 'deeppink']; 

        function updateGrid(container, numbers, color) {
            container.innerHTML = ''; 
            numbers.forEach(number => {
                const item = document.createElement('div');
                item.classList.add('grid-item');
                item.textContent = number;
                item.style.backgroundColor = color; 
                container.appendChild(item);
            });
        }

        function processAnswer(isYes) {
            if (currentSetIndex < allSets.length) {
                if (isYes) {
                    if (currentSetIndex === 0) day += 1;
                    else if (currentSetIndex === 1) day += 2;
                    else if (currentSetIndex === 2) day += 4;
                    else if (currentSetIndex === 3) day += 8;
                    else if (currentSetIndex === 4) day += 16;
                }
                currentSetIndex++;
                if (currentSetIndex < allSets.length) {
                    const currentColor = colors[currentSetIndex]; 
                    updateGrid(mainGrid, allSets[currentSetIndex], currentColor);
                } else {
                    gameTitle.style.display = 'none';
                    mainGrid.style.display = 'none';
                    setContainer.style.display = 'none'; 
                    finalResult.innerHTML = `Your birthday is <span style="color: green;">${day}</span>`;
                    finalResultContainer.style.display = 'flex'; 
                }
            }
        }

        function resetGame() {
            currentSetIndex = 0;
            day = 0;
            finalResultContainer.style.display = 'none';
            gameTitle.style.display = 'block';
            mainGrid.style.display = 'grid';
            setContainer.style.display = 'flex'; 
            updateGrid(mainGrid, allSets[0], colors[0]);
        }

        yesAnswerBtn.addEventListener('click', () => {
            processAnswer(true);
        });

        noAnswerBtn.addEventListener('click', () => {
            processAnswer(false);
        });

        playAgainBtn.addEventListener('click', resetGame);

        updateGrid(mainGrid, allSets[0], colors[0]);