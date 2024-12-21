const searchBtn = document.getElementById('search-btn');
const audioBtn = document.getElementById('audio-btn');
let audio;

searchBtn.addEventListener('click', () => {
    const word = document.getElementById('search-input').value.trim();
    const resultDiv = document.getElementById('result');

    if (!word) {
        alert("Please enter a word!");
        return;
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
            if (!response.ok) throw new Error("Word not found");
            return response.json();
        })
        .then(data => {
            const result = data[0];
            document.getElementById('word').textContent = result.word;
            document.getElementById('pronunciation').textContent = result.phonetics[0]?.text || 'N/A';

            audio = new Audio(result.phonetics[0]?.audio || '');

            const meaningsDiv = document.getElementById('meanings');
            const synonymsDiv = document.getElementById('synonyms');
            const antonymsDiv = document.getElementById('antonyms');

            meaningsDiv.innerHTML = `<h3>Meanings</h3>`;
            result.meanings.forEach(meaning => {
                const definition = document.createElement('p');
                definition.textContent = meaning.definitions[0]?.definition || 'N/A';
                meaningsDiv.appendChild(definition);
            });

            synonymsDiv.innerHTML = `<h3>Synonyms</h3>`;
            (result.meanings[0]?.synonyms || []).forEach(synonym => {
                synonymsDiv.innerHTML += `<span>${synonym}</span>`;
            });

            antonymsDiv.innerHTML = `<h3>Antonyms</h3>`;
            (result.meanings[0]?.antonyms || []).forEach(antonym => {
                antonymsDiv.innerHTML += `<span>${antonym}</span>`;
            });

            resultDiv.classList.add('visible');
        })
        .catch(error => {
            alert(error.message);
            resultDiv.classList.remove('visible');
        });
});

audioBtn.addEventListener('click', () => {
    if (audio) audio.play();
    else alert("No audio available!");
});
