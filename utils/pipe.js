function pipe(...args) {
  return args.reduce((acc, fun) => fun(acc), null);
}

module.exports = pipe;
