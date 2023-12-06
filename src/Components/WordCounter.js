// src/WordCounter.js
import React, { useState } from 'react';

const WordCounter = () => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);

    const words = newText.split(/\s+/).filter((word) => word !== '');
    const characters = newText.length;
    const sentences = newText.split(/[.!?]+/).filter((sentence) => sentence !== '');
    const paragraphs = newText.split('\n').filter((paragraph) => paragraph.trim() !== '');

    setWordCount(words.length);
    setCharacterCount(characters);
    setSentenceCount(sentences.length);
    setParagraphCount(paragraphs.length);

    // Reading time estimation (words per minute)
    const wordsPerMinute = 200; // Change this value as needed
    const minutes = words.length / wordsPerMinute;
    setReadingTime(Math.ceil(minutes));

    // Set other state variables accordingly
  };
  const transformText = (transformType) => {
    let transformedText = '';
    switch (transformType) {
      case 'uppercase':
        transformedText = text.toUpperCase();
        break;
      case 'lowercase':
        transformedText = text.toLowerCase();
        break;
      case 'sentencecase':
        transformedText = text.replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (match) => match.toUpperCase());
        break;
      case 'titlecase':
        transformedText = text.replace(/(\w\S*)/g, (match) => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase());
        break;
      case 'alternatecase':
        transformedText = text.split('').map((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()).join('');
        break;
      case 'inversecase':
        transformedText = text.split('').map((char) => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase())).join('');
        break;
      default:
        transformedText = text;
        break;
    }

    setText(transformedText);
  };

  const clearText = () => {
    setText('');
  };

  return (
    <>
    <div className='ml-10 mt-16'>
    <div className='flex flex-row gap-5 flex-wrap mr-10'>
    <div className=''>
      <textarea
      className='border-4 border-blue-600 rounded-lg resize '
        placeholder="Enter text..."
        value={text}
        onChange={handleTextChange}
        rows={20}
        cols={160}/>
     </div>
        <div>
        <table className='border rounded-lg overflow-hidden ml-5'>
          <tbody className='text-lg ' >
          <tr className='bg-red-400 text-2xl'>
              <td colSpan="2" className='text-center  py-3'>Summary</td>
            </tr>
            <tr className='bg-blue-400 border-b border-blue-400'>
              <td className='px-3'>Word Count</td>
              <td class="px-7 py-2">: {wordCount}</td>
            </tr>
            <tr className='bg-blue-500 border-b border-blue-400'>
              <td className='px-3'>Character Count</td>
              <td class="px-7 py-2">: {characterCount}</td>
            </tr>
            <tr className='bg-blue-400 border-b border-blue-400'>
              <td className='px-3'>Sentence Count</td>
              <td class="px-7 py-2">: {sentenceCount}</td>
            </tr>
            <tr className='bg-blue-500 border-b border-blue-400'>
              <td className='px-3'>Paragraph Count</td>
              <td class="px-7 py-2">: {paragraphCount}</td>
            </tr>
            <tr className='bg-blue-400 border-b border-blue-400'>
              <td className='px-3'>Reading Time</td>
              <td class="px-7 py-2">: {readingTime} minute(s)</td>
            </tr>
          </tbody>
        </table>
        </div>
        </div>
        <div className='flex flex-wrap flex-row gap-5 m-5'>
        <button className='button-blue' onClick={() => transformText('uppercase')}>Uppercase</button>
        <button className='button-blue' onClick={() => transformText('lowercase')}>Lowercase</button>
        <button className='button-blue' onClick={() => transformText('sentencecase')}>Sentence Case</button>
        <button className='button-blue' onClick={() => transformText('titlecase')}>Title Case</button>
        <button className='button-blue' onClick={() => transformText('alternatecase')}>Alternate Case</button>
        <button className='button-blue' onClick={() => transformText('inversecase')}>Inverse Case</button>
        <button className='button-blue' onClick={clearText}>Clear</button>
      </div>
      </div>
      </>
  );
};

export default WordCounter;
