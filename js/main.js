const Typewriter = function(textElement,words,wait = 3000) {
  this.textElement = textElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = wait;
  this.isDeleting = false; // represent the state
  this.type();
};

//Type Method
Typewriter.prototype.type = function() {

  //  Get current index of the word
  const current = this.wordIndex;

  // Text of the current word

  const currentWord = this.words[current];
  console.log(currentWord);

  // Check if state is deleting
  if (this.isDeleting) {
    // Remove more characters
    this.txt = currentWord.substring(0,this.txt.length - 1);


  } else {
    // Add characters
    this.txt = currentWord.substring(0,this.txt.length + 1);
  }

  // ADD
  this.textElement.innerHTML = `<span class="txt">${this.txt}</span>`;


  setTimeout(()=>{
    this.type();
  },500);
  
};


document.addEventListener('DOMContentLoaded',()=>{
  const textElement = document.querySelector(".data-type");
  // console.log(textElement);
  const words = JSON.parse(textElement.getAttribute('data-words'));
  console.log(words);
  const wait = textElement.getAttribute('data-wait');
  // console.log(wait)

  // Initialize typewriter
  new Typewriter(textElement,words,wait);
});