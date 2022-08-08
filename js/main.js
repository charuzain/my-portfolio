
class Typewriter {
  constructor(textElement,words,wait = 3000) {
    this.textElement = textElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = wait;
    this.isDeleting = false;
    this.type();
  }

  type() {

    //  Get current index of the word
    const current = this.wordIndex;

    // full text of the current word
    const currentWord = this.words[current];

    // Check if state is deleting
    if (this.isDeleting) {
    // Remove more characters
      this.txt = currentWord.substring(0,this.txt.length - 1);
    } else {
    // Add characters
      this.txt = currentWord.substring(0,this.txt.length + 1);
    }

  
    this.textElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // add typing speed
    let typeSpeed = 100;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is fully typed , delete the word and type the next word
    if (!this.isDeleting && this.txt === currentWord) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    }
    if (this.txt === '' && this.isDeleting) {
      typeSpeed = this.wait;
      this.isDeleting = false;
      this.wordIndex++;
    }
    if (this.wordIndex === this.words.length) {
      this.wordIndex = 0;
    }

    setTimeout(()=>{
      this.type();
    },typeSpeed);
  }
}

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