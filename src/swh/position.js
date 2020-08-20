class Position {
  constructor(idx, ln, col, fn, ftxt) {
    this.idx = idx || -1;
    this.ln = ln || 0;
    this.col = col || -1;
    this.fn = fn;
    this.ftxt = ftxt;
  }

  advance(currentChar = null) {
    this.idx++;
    this.col++;

    if (currentChar === '\n') {
      this.ln++;
      this.col = 0;
    }

    return this;
  }

  copy() {
    return new Position(this.idx, this.ln, this.col, this.fn, this.ftxt);
  }
}

module.exports = Position;
