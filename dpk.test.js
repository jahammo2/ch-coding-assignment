const crypto = require("crypto");

const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toEqual("0");
  });

  it('returns the partitionKey if is a string and less than the MAX_PARTITION_KEY_LENGTH', () => {
    const key = deterministicPartitionKey({ partitionKey: 'foo' });
    expect(key).toEqual('foo');
  });

  it('returns a hashed event if no partitionKey is provided', () => {
    const hash = crypto.createHash('sha3-512').update(JSON.stringify({ bar: 'foo' })).digest('hex');
    const key = deterministicPartitionKey({ bar: 'foo' });
    expect(key).toEqual(hash);
  });

  it('returns a stringified key if the partitionKey is not a string', () => {
    const key = deterministicPartitionKey({ partitionKey: { data: 'foo' } });
    expect(key).toEqual(JSON.stringify({ data: 'foo' }));
  });

  it('returns a hashed key if it is greater than MAX_PARTITION_KEY_LENGTH', () => {
    const longString = 'foo'.repeat(100);
    const hash = crypto.createHash('sha3-512').update(longString).digest('hex');
    const key = deterministicPartitionKey({ partitionKey: longString });
    expect(key).toEqual(hash);
  });
});
