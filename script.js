// Atualização no layout para exibir os números sorteados ao lado do quadro
document.addEventListener('DOMContentLoaded', () => {
    const drawButton = document.getElementById('drawNumber')
    const resetButton = document.getElementById('resetBoard')
    const currentNumberDisplay = document.getElementById('currentNumber')
    const numbersDisplay = document.getElementById('numbers')
    const bingoNumbersTable = document.getElementById('bingoNumbers')

    const columns = {
        B: Array.from({ length: 15 }, (_, i) => i + 1),
        I: Array.from({ length: 15 }, (_, i) => i + 16),
        N: Array.from({ length: 15 }, (_, i) => i + 31),
        G: Array.from({ length: 15 }, (_, i) => i + 46),
        O: Array.from({ length: 15 }, (_, i) => i + 61)
    }

    let allNumbers = [
        ...columns.B,
        ...columns.I,
        ...columns.N,
        ...columns.G,
        ...columns.O
    ]
    let calledNumbers = []

    const renderBingoBoard = () => {
        bingoNumbersTable.innerHTML = '' // Clear table
        for (let i = 0; i < 15; i++) {
            const row = document.createElement('tr')
            ;['B', 'I', 'N', 'G', 'O'].forEach(column => {
                const cell = document.createElement('td')
                cell.textContent = columns[column][i]
                cell.setAttribute('data-number', columns[column][i])
                row.appendChild(cell)
            })
            bingoNumbersTable.appendChild(row)
        }
    }

    const drawNumber = () => {
        if (allNumbers.length === 0) {
            alert('Todos os números já foram sorteados!')
            return
        }
        const randomIndex = Math.floor(Math.random() * allNumbers.length)
        const drawnNumber = allNumbers.splice(randomIndex, 1)[0]
        calledNumbers.push(drawnNumber)

        const column = Object.keys(columns).find(col =>
            columns[col].includes(drawnNumber)
        )
        currentNumberDisplay.textContent = `${column}-${drawnNumber}`

        // Exibição dos números sorteados com melhoria para responsividade
        numbersDisplay.innerHTML = calledNumbers
            .map(number => `<span class="called-number">${number}</span>`)
            .join('')

        const cell = bingoNumbersTable.querySelector(
            `td[data-number="${drawnNumber}"]`
        )
        if (cell) cell.classList.add('marked')
    }

    const resetBoard = () => {
        if (confirm('Você tem certeza que deseja zerar todas as marcações?')) {
            allNumbers = [
                ...columns.B,
                ...columns.I,
                ...columns.N,
                ...columns.G,
                ...columns.O
            ]
            calledNumbers = []
            numbersDisplay.innerHTML = ''
            currentNumberDisplay.textContent = ''
            renderBingoBoard()
        }
    }

    renderBingoBoard()
    drawButton.addEventListener('click', drawNumber)
    resetButton.addEventListener('click', resetBoard)
})
