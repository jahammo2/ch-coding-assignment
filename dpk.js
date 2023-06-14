const createHash = require('./utils/createHash');
const pipe = require('./utils/pipe');

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

function findPartitionKey(event) {
  const { partitionKey } = event;

  if (partitionKey) return partitionKey;

  return null;
}

function handleMissingCandidate(candidate, event) {
  if (candidate) return candidate;

  const data = JSON.stringify(event);

  return createHash(data);
}

function handleCandidateType(candidate) {
  if (typeof candidate === "string") {
    return candidate;
  }

  return JSON.stringify(candidate);
}

function handleLongString(candidate) {
  if (candidate.length <= MAX_PARTITION_KEY_LENGTH) {
    return candidate;
  }

  return createHash(candidate);
}

function deterministicPartitionKey(event) {
  if (!event) return TRIVIAL_PARTITION_KEY;

  return pipe(
    () => findPartitionKey(event),
    candidate => handleMissingCandidate(candidate, event),
    handleCandidateType,
    handleLongString,
  );
}

exports.deterministicPartitionKey = deterministicPartitionKey;
