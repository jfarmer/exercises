function reverseBits2(n) {
  let width = 32;
  let current = n;
  let result = 0;

  while (current) {
    result <<= 1;
    result |= current & 1;
    current >>= 1;
    width--;
  }

  return (result << width) >>> 0;
}

function reverseBits(n) {
  let v = n;
  let s = 32;
  let mask = ~0 >>> 0;

  while ((s >>= 1) > 0) {
    mask ^= (mask << s);
    v = ((v >> s) & mask) | ((v << s) & ~mask);
  }

  return v >>> 0;
}


if (require.main === module) {
  let n = 0b00011111111111111111111111111101;

  console.log(reverseBits2(n).toString(2));
}
