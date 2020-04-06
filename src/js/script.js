export default class Keyboard {
  constructor(data) {
    this.upperLet = null;
    this.keysOfData = data;
  }

  addBasicMarkUp() {
    const bodyContainer = document.querySelector('body');
    if (localStorage.lang) {
      localStorage.lang = 'eng';
    }
    bodyContainer.innerHTML = `
    <main class="main">
      <div class="container">
        <h1 class="main__title">Virtual Keyboard</h1>
        <div class="textarea-wrapper">
          <textarea class="textarea" name="" id="textarea" cols="30" rows="10"></textarea>
        </div>
        <div class="keyboard-wrapper">
          <div class="keyboard keyboard-style">
          </div>
        </div>
        <p>Developed on Windows OS. Change language Left Ctrl + Left Alt</p>
      </div>
    </main>`;
    this.addBtnKeyboard();
    this.pressMouseHundlerKeyboard();
    this.pressKeyHundlerKeyboard();
  }

  addBtnKeyboard() {
    this.keyboardCont = document.querySelector('.keyboard');
    let res = '';
    if (!this.upperLet) {
      this.keysOfData.forEach((item) => {
        res += ` <div class=
        "keyboard__key ${item.eventCode}" id="${item.eventCode}">${(localStorage.lang === 'eng') ? item.lowEng : item.lowRu}</div>`;
      });
    } else {
      this.keysOfData.forEach((item, i) => {
        if (i < 14) {
          res += ` <div class=
          "keyboard__key ${item.eventCode}" id="${item.eventCode}">${(localStorage.lang === 'eng') ? item.lowEng : item.lowRu}</div>`;
        } else {
          res += ` <div class=
          "keyboard__key ${item.eventCode}" id="${item.eventCode}">${(localStorage.lang === 'eng') ? item.upperEng : item.upperRu}</div>`;
        }
      });
    }

    this.keyboardCont.innerHTML = res;
    // if (!this.upperLet) {
    //   this.keysOfData.forEach((item) => {
    //     res += ` <div class="keyboard__key ${item.eventCode}" id="${item.eventCode}">
    //                 <span>${(localStorage.lang === 'eng') ? item.lowEng : item.lowRu}</span>
    //               </div>`;
    //   });
    // } else {
    //   this.keysOfData.forEach((item, i) => {
    //     if (i < 14) {
    //       res += ` <div class="keyboard__key ${item.eventCode}" id="${item.eventCode}">
    //                 <span>${(localStorage.lang === 'eng') ? item.lowEng : item.lowRu}</span>
    //               </div>`;
    //     } else {
    //       res += ` <div class="keyboard__key ${item.eventCode}" id="${item.eventCode}">
    //                 <span>${(localStorage.lang === 'eng') ? item.upperEng : item.upperRu}</span>
    //               </div>`;
    //     }
    //   });
    // }
  }

  pressMouseHundlerKeyboard() {
    document.addEventListener('mousedown', (event) => {
      event.preventDefault();
      const target = event.target;
      const keyOfKeyboard = document.querySelectorAll('.keyboard__key');
      this.textArea = document.querySelector('.textarea');
      // console.log('letTert: ', letTert);

      if (target.classList.contains('keyboard__key')) {
        const letTer = target.textContent;
        keyOfKeyboard.forEach((item) => item.classList.remove('active'));
        target.classList.add('active');
        this.textArea.focus();
        this.insertLetters(event, letTer);
      }
      if (target.classList.contains('CapsLock')) {
        this.getUppperLetter();
      }
    });

    document.addEventListener('mouseup', (event) => {
      event.preventDefault();
      const keyOfKeyboard = document.querySelectorAll('.keyboard__key');
      keyOfKeyboard.forEach((item) => item.classList.remove('active'));
    });

    document.addEventListener('click', (event) => {
      // const target = event.target;
      // console.log('target: ', target);
      if (event.target.classList.contains('container')) {
        this.textArea = document.querySelector('.textarea');
        this.textArea.blur();
      }

      if (event.target.classList.contains('textarea')) {
        this.textArea.focus();
      }
    });
  }

  pressKeyHundlerKeyboard() {
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      const ControlLeft = document.getElementById('ControlLeft');
      const AltLeft = document.getElementById('AltLeft');
      this.textArea = document.querySelector('.textarea');
      const letTer = document.getElementById(event.code).textContent;
      document.getElementById(event.code).classList.add('active');
      this.textArea.focus();
      switch (event.code) {
        case 'CapsLock':
          this.getUppperLetter();
          break;
        case 'Backspace':
        case 'Tab':
        case 'ShiftLeft':
        case 'ControlLeft':
        case 'AltLeft':
        case 'AltRight':
        case 'ControlRight':
        case 'Delete':
          break;
        default:
          this.insertLetters(event, letTer);
      }

      if (ControlLeft.classList.contains('active') && AltLeft.classList.contains('active')) {
        this.changeLanguage();
      }
    });
    document.addEventListener('keyup', (event) => {
      event.preventDefault();
      const keyOfKeyboard = document.querySelectorAll('.keyboard__key');
      keyOfKeyboard.forEach((item) => item.classList.remove('active'));
    });
  }

  changeLanguage() {
    if (localStorage.lang === 'eng') {
      localStorage.lang = 'rus';
    } else {
      localStorage.lang = 'eng';
    }
    this.addBtnKeyboard();
  }

  getUppperLetter() {
    if (!this.upperLet) {
      this.upperLet = true;
    } else {
      this.upperLet = false;
    }
    this.addBtnKeyboard();
  }

  insertLetters(event, letTer) {
    this.textArea = document.querySelector('.textarea');
    switch (letTer) {
      case 'CapsLock':
      case 'Delete':
      case 'Backspace':
      case 'Tab':
      case 'ShiftLeft':
      case 'ControlLeft':
      case 'AltLeft':
      case 'AltRight':
      case 'ControlRight':
        break;
      default:
        this.textArea.setRangeText((letTer), this.textArea.selectionStart, this.textArea.selectionEnd, 'end');
    }
  }
}
