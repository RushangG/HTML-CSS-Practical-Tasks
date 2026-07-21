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
    let averageWordLength = 0;
    let mostCommonWords = [];

    characterCountwithoutSpaces = textInput.replace(/\s/g, '').length; // without spaces / =   Regular Expression (RegEx)  \s = whitespace characters /g =- global search  
    characterCountwithSpaces = textInput.length;

    wordCount = textInput.trim().split(/\s+/).length; // split by whitespace and count words

    const words = textInput.toLowerCase().match(/\b\w+\b/g) || []; // convert to array of words; \b word boundary anchor.  \w+ = letters, digits, or underscores.  g = global search 

    words.forEach(word => {
        uniqueWords.add(word);
        freqMap[word] = freqMap[word] ? freqMap[word] + 1 : 1;
    })


    const uniqueWordCount = uniqueWords.size;

    // Calculate average word length
    const totalWordLength = words.reduce((sum, word) => sum + word.length, 0);
    averageWordLength = totalWordLength / wordCount; // average = length of words sum / total words count;

    //sort freq map by descending  conver Object.entries(freqMap) to array
    // sort by frequency in descending order
    const sortedFreq = Object.entries(freqMap).sort((a, b) => b[1] - a[1]);


    // Find the most common 5 words
    mostCommonWords = sortedFreq.slice(0, 5).map(e => e[0]); // get only 5 words first.


    const resultOutput = document.getElementById('result-output');

    resultOutput.value = ''; // Clear previous results


    document.getElementById('result-output').innerHTML = `
                <p>Most Common Words: [${mostCommonWords.join(' , ')}]</p> 
                <p>Average Word Length: ${averageWordLength.toFixed(2)}</p>
                <p>Word Count(Frequency): ${wordCount}</p>
                <p>Character Count (without spaces): ${characterCountwithoutSpaces}</p>
                <p>Character Count (with spaces): ${characterCountwithSpaces}</p>
             
                <p>Unique Word Count: ${uniqueWordCount}</p>
                <p>Frequency of Words: </p>
            `;

    const freqList = document.createElement('ul');

    const listItemHeader = document.createElement('li');
    listItemHeader.textContent = 'Word:  Frequency:';
    listItemHeader.style.listStyleType = 'none';
    listItemHeader.style.fontWeight = 'bold';

    freqList.appendChild(listItemHeader);

    //    console.log('sortedFreq:', sortedFreq);
    // words frequency list sorted in descending order
    for (const [word, count] of sortedFreq) {

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
