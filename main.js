let realNumber;
        let intentosRealizados;
        const maxIntentos = 5;

        function resetGame() {
            realNumber = generateRandomUniqueNumbers(4, 0, 9);
            intentosRealizados = 0;

            document.getElementById("attempts-list").innerHTML = "";
            document.getElementById("intentos-restantes").innerText = `Intentos restantes: ${maxIntentos}`;

            for (let i = 1; i <= 4; i++) {
                const input = document.getElementById(`game-number-input-${i}`);
                input.value = "";
            }
        }

        function generateRandomUniqueNumbers(count, min, max) {
            const numbers = [];
            while (numbers.length < count) {
                const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
                if (!numbers.includes(randomNum)) {
                    numbers.push(randomNum);
                }
            }
            return numbers;
        }

        function evaluarNumero(valorInput) {
            if (intentosRealizados >= maxIntentos) {
                alert("¡Se han agotado los intentos!");
                resetGame();
                return;
            }

            const intento = [];
            const result = document.createElement("li");
            result.className = "attempt";

            for (let i = 0; i < 4; i++) {
                const valorNum = parseInt(valorInput[i]);
                intento.push(valorNum);

                const currentList = document.createElement("span");
                currentList.innerText = valorNum;

                if (valorNum === realNumber[i]) {
                    currentList.className = "correct";
                } else if (!isNaN(valorNum) && realNumber.includes(valorNum)) {
                    currentList.className = "partial";
                } else {
                    currentList.className = "incorrect";
                }

                result.appendChild(currentList);
            }

            result.dataset.attempt = intento.join(", ");
            document.getElementById("attempts-list").appendChild(result);

            intentosRealizados++;

            const intentosRestantes = maxIntentos - intentosRealizados;
            document.getElementById("intentos-restantes").innerText = `Intentos restantes: ${intentosRestantes}`;

            if (intentosRealizados === maxIntentos) {
                alert("¡Se han agotado los intentos!");
                resetGame();
            }

            if (realNumber.every((num, index) => num === intento[index])) {
                alert("¡Felicidades! Has acertado todos los números.");
                resetGame();
            }

            // Borrar números de los inputs después de cada turno
            for (let i = 1; i <= 4; i++) {
                const input = document.getElementById(`game-number-input-${i}`);
                input.value = "";
            }
        }

        document.getElementById('probar').addEventListener('click', () => {
            const inputValues = [];
            for (let i = 0; i < 4; i++) {
                inputValues.push(document.getElementById(`game-number-input-${i + 1}`).value);
            }

            evaluarNumero(inputValues);
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            resetGame();
        });

        // Iniciar el juego al cargar la página
        window.onload = resetGame;




