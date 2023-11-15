function generateUniqueID() {
  // Generate a random number with exactly 4 digits (between 1000 and 9999)
  const random = Math.floor(1000 + Math.random() * 9000).toString();

  // Get the current timestamp in milliseconds and convert it to a string
  const timestamp = Date.now().toString();

  // Take the last 3 digits of the timestamp (adjust as needed)
  const timestampSuffix = timestamp.slice(-3);

  // Combine the timestamp suffix and random number to create a 7-digit unique ID
  const uniqueID = `${timestampSuffix}${random}`;

  return uniqueID;
}

export default generateUniqueID;
