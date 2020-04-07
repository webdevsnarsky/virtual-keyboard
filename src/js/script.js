export default class Keyboard {
  constructor(data) {
    this.upperLet = null;
    this.shiftOn = null;
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
        <p>Also you can use Tab, Backspace, Enter, Left Shift</p>
      </div>
    </main>`;
    this.addBtnKeyboard();
    this.pressMouseHundlerKeyboard();
    this.pressKeyHundlerKeyboard();
  }

  addBtnKeyboard() {
    this.keyboardCont = document.querySelector('.keyboard');
    let res = '';
    this.shiftOn = false;
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
  }

  pressMouseHundlerKeyboard() {
    this.textArea = document.querySelector('.textarea');
    document.addEventListener('mousedown', (event) => {
      event.preventDefault();
      const target = event.target;
      const keyOfKeyboard = document.querySelectorAll('.keyboard__key');
      if (target.classList.contains('keyboard__key')) {
        const letTer = target.textContent;
        keyOfKeyboard.forEach((item) => item.classList.remove('active'));
        target.classList.add('active');
        this.insertLetters(event, letTer);
      }
    });

    document.addEventListener('mouseup', (event) => {
      event.preventDefault();
      const target = event.target;
      if (target.classList.contains('CapsLock')) {
        this.getUppperLetter();
      }
      const keyOfKeyboard = document.querySelectorAll('.keyboard__key');
      keyOfKeyboard.forEach((item) => item.classList.remove('active'));
    });

    document.addEventListener('click', (event) => {
      if (!event.target.classList.contains('textarea')) {
        this.textArea = document.querySelector('.textarea');
        this.textArea.blur();
      }

      if (event.target.classList.contains('textarea')
          || event.target.classList.contains('keyboard')
          || event.target.classList.contains('keyboard__key')) {
        this.textArea.focus();
      }
    });
  }

  pressKeyHundlerKeyboard() {
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      const letTer = document.getElementById(event.code).textContent;
      document.getElementById(event.code).classList.add('active');
      switch (event.code) {
        case 'ShiftLeft':
          this.getWorkOnShift();
          break;
        default:
          this.insertLetters(event, letTer);
      }
    });
    document.addEventListener('keyup', (event) => {
      event.preventDefault();
      const ControlLeft = document.getElementById('ControlLeft');
      const AltLeft = document.getElementById('AltLeft');
      if (ControlLeft.classList.contains('active') && AltLeft.classList.contains('active')) {
        this.changeLanguage();
      }
      switch (event.code) {
        case 'ShiftLeft':
          this.getWorkOnShift();
          break;
        case 'CapsLock':
          this.getUppperLetter();
          break;
        default:
      }
      const keyOfKeyboard = document.querySelectorAll('.keyboard__key');
      keyOfKeyboard.forEach((item) => item.classList.remove('active'));
    });
  }

  getWorkOnShift() {
    if (!this.shiftOn) {
      this.shiftOn = true;
    } else {
      this.shiftOn = false;
    }

    this.keyboardCont = document.querySelector('.keyboard');
    let res = '';
    if (this.shiftOn) {
      this.keysOfData.forEach((item) => {
        res += ` <div class=
        "keyboard__key ${item.eventCode}" id="${item.eventCode}">${(localStorage.lang === 'eng') ? item.upperEng : item.upperRu}</div>`;
      });
    } else {
      this.keysOfData.forEach((item) => {
        res += ` <div class=
          "keyboard__key ${item.eventCode}" id="${item.eventCode}">${(localStorage.lang === 'eng') ? item.lowEng : item.lowRu}</div>`;
      });
    }
    this.keyboardCont.innerHTML = res;
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
      case 'Backspace':
        this.textArea.value = this.textArea.value.slice(0, -1);
        break;
      case 'Tab':
        letTer = '   ';
        this.insertLetters(event, letTer);
        break;
      case 'Enter':
        letTer = '\n';
        this.insertLetters(event, letTer);
        break;
      case 'CapsLock':
      case 'Shift':
      case 'Del':
      case 'Ctrl':
      case 'Alt':
      case 'Win':
      case '▲':
      case '▼':
      case '►':
      case '◄':
        break;
      default:
        this.textArea.setRangeText(letTer, this.textArea.selectionStart, this.textArea.selectionEnd, 'end');
        this.textArea.focus();
    }
  }
}
