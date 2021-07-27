let OPERATOR;
let RESULT = 0;
let NUMBER_1 = 0;
let NUMBER_2 = 0;
let IS_USE_DECIMAL = false;
let IS_START = true;
const monitorNumber = document.getElementById('monitor-number');
const monitorResult = document.getElementById('monitor-result');

function addHistory() {
  const history = document.getElementById('history-container');
  const historyCal = document.getElementById('calculator-history');
  const div = document.createElement('div');
  const span = document.createElement('span');
  span.textContent = RESULT;

  div.textContent = `${NUMBER_1} ${OPERATOR} ${NUMBER_2} = `;
  div.append(span);
  div.className = 'history-number animate-right';
  historyCal.style.overflowX = 'hidden';
  setTimeout(() => {
    historyCal.style.overflowX = 'auto';
  }, 4000);
  history.prepend(div);
}

function cal() {
  if (OPERATOR === '+') {
    RESULT = NUMBER_1 + NUMBER_2;
  } else if (OPERATOR === '-') {
    RESULT = NUMBER_1 - NUMBER_2;
  } else if (OPERATOR === 'x') {
    RESULT = NUMBER_1 * NUMBER_2;
  } else if (OPERATOR === '÷') {
    RESULT = NUMBER_1 / NUMBER_2;
  } else if (OPERATOR === '%') {
    RESULT = NUMBER_1 % NUMBER_2;
  } else {
    return;
  }
  monitorResult.textContent = `${RESULT}`;
  addHistory();
  NUMBER_1 = RESULT;
  NUMBER_2 = null;
}

function operator(type) {
  IS_USE_DECIMAL = false;

  if (NUMBER_1 === 0 || (NUMBER_1 && NUMBER_2)) {
    cal(OPERATOR);
  }
  OPERATOR = type;
  monitorResult.textContent = `${NUMBER_1} ${OPERATOR}`;
  monitorNumber.textContent = '';
}

function clearMonitor() {}

function digit(number) {
  let current = monitorNumber.textContent;

  if (current.length === 15) {
    return;
  }

  if (isNaN(current)) {
    monitorNumber.textContent = '';
  }
  if (OPERATOR === null) {
    monitorResult.textContent = '';
  }
  if (IS_START) {
    monitorNumber.textContent = number;
    IS_START = false;
  } else {
    monitorNumber.textContent = current + number;
  }
  setNumber();
}
function setNumber() {
  const num = Number.parseFloat(monitorNumber.textContent);
  if (OPERATOR) {
    NUMBER_2 = num;
  } else {
    NUMBER_1 = num;
  }
}
function decimal() {
  if (!IS_USE_DECIMAL) {
    digit('.');
    IS_USE_DECIMAL = true;
  }
}
function equals() {
  if (NUMBER_1 && NUMBER_2) {
    cal(OPERATOR);
    monitorNumber.textContent = '';
    OPERATOR = null;
  }
}
function allClear() {
  const history = document.getElementById('history-container');
  NUMBER_1 = 0;
  NUMBER_2 = 0;
  RESULT = 0;
  OPERATOR = undefined;
  IS_START = true;
  IS_USE_DECIMAL = false;
  monitorNumber.textContent = '0';
  monitorResult.textContent = '';
  history.textContent = '';
}

function clear() {
  if (IS_START) {
    return;
  }

  const curret = monitorNumber.textContent;
  monitorNumber.textContent = curret.slice(0, -1);
  setNumber();
}
function setUp() {
  const btnDigits = document.querySelectorAll('.digits');
  btnDigits.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      digit(event.target.value);
    });
  });

  const btnOperator = document.querySelectorAll('.operators');
  btnOperator.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      operator(event.target.value);
    });
  });

  const btnDecimal = document.getElementById('decimal');
  btnDecimal.addEventListener('click', (event) => {
    decimal();
  });
  const btnEquals = document.getElementById('equals');
  btnEquals.addEventListener('click', (event) => {
    equals();
  });

  const btnAllClear = document.getElementById('allclear');
  btnAllClear.addEventListener('click', () => {
    allClear();
  });
  const btnClear = document.getElementById('clear');
  btnClear.addEventListener('click', () => {
    clear();
  });
}

setUp();
