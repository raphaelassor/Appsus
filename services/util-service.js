export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  getTimeFromStamp,
  getDateFromStamp,
};

function makeId(length = 6) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ];
  var txt = '';
  while (size > 0) {
    size--;
    txt += words[Math.floor(Math.random() * words.length)] + ' ';
  }
  return txt;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getTimeFromStamp(timeStamp) {
  // Create a new JavaScript Date object based on the timeStamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(timeStamp);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = '0' + date.getMinutes();
  // Seconds part from the timestamp
  var formattedTime = hours + ':' + minutes.substr(-2);
  return formattedTime;
}

function getDateFromStamp(timeStamp) {
  var date = new Date(timeStamp * 1000);
  var year = date.getFullYear();
  var month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth();
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
