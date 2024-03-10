 export default function generateRandomNDigits () {
    return Math.floor(Math.random() * (9 * (Math.pow(10, 5)))) + (Math.pow(10, 5));
  }