export default function typeChecker(stringData) {
    if (!isNaN(stringData)  ) {
      return 'linear';
    } else if( (new Date(stringData) !== "Invalid Date") && !isNaN(new Date(stringData)) ) {
      return 'time';
    } else {
      return 'category';
    }
  }