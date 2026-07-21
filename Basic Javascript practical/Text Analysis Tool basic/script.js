async function analyzeText() {

    const textInput = document.getElementById('text-input').value;

    if (textInput.trim() === '') {
        alert('please enter some text for analysis.');
        const resultOutput = document.getElementById('result-output');

        resultOutput.innerHTML = ''; // Clear previous results
        return;
    }

    let characterCountwithoutSpaces = 0; // without spaces
    let characterCountwithSpaces = 0; // with spaces
    let wordCount = 0;
    let freqMap = {};
    let uniqueWords = new Set();

    characterCountwithoutSpaces = textInput.replace(/\s/g, '').length; // without spaces / =   Regular Expression (RegEx)  \s = whitespace characters /g =- global search  
    characterCountwithSpaces = textInput.length;

    wordCount = textInput.trim().split(/\s+/).length; // split by whitespace and count words

    const words = textInput.toLowerCase().match(/\b\w+\b/g) || []; // convert to array of words; \b word boundary anchor.  \w+ = letters, digits, or underscores.  g = global search 

    words.forEach(word => {
        uniqueWords.add(word);
        freqMap[word] = freqMap[word] ? freqMap[word] + 1 : 1;
    })

    const uniqueWordCount = uniqueWords.size;

    const resultOutput = document.getElementById('result-output');

    resultOutput.value = ''; // Clear previous results


    document.getElementById('result-output').innerHTML = `
                <p>Character Count (without spaces): ${characterCountwithoutSpaces}</p>
                <p>Character Count (with spaces): ${characterCountwithSpaces}</p>
                <p>Word Count: ${wordCount}</p>
                <p>Unique Word Count: ${uniqueWordCount}</p>
                <p>Frequency of Words: </p>
            `;

    const freqList = document.createElement('ul');

    const listItemHeader = document.createElement('li');
    listItemHeader.textContent = 'Word:  Frequency:';
    listItemHeader.style.listStyleType = 'none';
    listItemHeader.style.fontWeight = 'bold';

    freqList.appendChild(listItemHeader);

    for (const [word, count] of Object.entries(freqMap)) {

        const listItem = document.createElement('li');

        listItem.textContent = `${word}:   ${count}`;
        listItem.style.listStyleType = 'none';
        freqList.appendChild(listItem);
    }
    document.getElementById('result-output').appendChild(freqList);





}

// run after the DOM is fully loaded fisrt html than css than js
document.addEventListener('DOMContentLoaded', () => {

    const analyzeButton = document.getElementById('analyze-button');

    analyzeButton.addEventListener('click', () => analyzeText());


});