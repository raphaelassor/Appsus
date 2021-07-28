import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/storage-service.js';
const KEY = 'emails';
var gEmails = getEmails();

function getEmails() {
  var fromStorage = storageService.loadFromStorage(KEY);
  if (fromStorage) return fromStorage;
  else {
    var emails = [
      {
        id: utilService.makeId(),
        sender: 'Kratos of Sparta',
        from: 'godofwar@olympus.gov',
        subject: 'The True Spartan',
        to: 'MasterChief117@microsoft.com',
        body: `
        Let's end this console war.
        You and me.
        Let's see who the real Spartan is.
        Winner takes all.
        Best of 5 Mario Kart.
        Kratos`,
        isRead: false,
        sentAt: 1525074698,
        sentTime: utilService.getTimeFromStamp(1525074698),
        sentDate: utilService.getDateFromStamp(1525074698),
      },
      {
        id: utilService.makeId(),
        sender: 'Peter Parker',
        from: 'underoos@starkindustries.com',
        subject: 'Another exclusive mission from Tony..',
        to: 'pepper@starkIndustries.im',

        body: `Hey Miss Pepper.\
          Tony asked me to get him some "Afkat Hashmal" for his new suit. \
          I have a feeling he's messing with me but I want I'm afraid of being wrong again.
          If it's real could you ask Happy to get me some?
          Thanks, Spidey`,
        isRead: false,
        sentAt: 1549312452,
        sentTime: utilService.getTimeFromStamp(1549312452),
        sentDate: utilService.getDateFromStamp(1549312452),
      },
      {
        id: utilService.makeId(),
        sender: 'Argaorn, son of Arathorn',
        from: 'king@gondor.me',
        subject: 'Those damn Hobbits again...',
        to: 'theNewWhiteWizard@.whitecouncil.me',

        body: `Gandalf, have you seen Merry and Pippin? They said something about a Pakal Cafe near Rohan.
        I'm afraid they may have gotten into our secret Longbottom Leaf stash again...
        Send Sam to make sure they find their way home.
        Strider `,
        isRead: false,
        sentAt: 1569312452,
        sentTime: utilService.getTimeFromStamp(1569312452),
        sentDate: utilService.getDateFromStamp(1569312452),
      },
      {
        id: utilService.makeId(),
        sender: 'Nemo Bemo',
        from: 'hungry@feedme.now',
        subject: 'We were attacked',
        to: 'gil@appsus.com',
        body: `Yo dude.
          Someone fucked up the garden again.
          Terrible mess. Plants everywhere. There was an even a cushion there somewhere.
          Someone may have actually shat in the back.
          Better clean it up man.
          Yours, Nembuz
          P.S. I'm hungry.`,
        isRead: false,
        sentAt: 1599645452,
        sentTime: utilService.getTimeFromStamp(1599645452),
        sentDate: utilService.getDateFromStamp(1599645452),
      },
      {
        id: utilService.makeId(),
        sender: 'Tal Tarablus',
        from: 'fatfuck@siblings.com',
        subject: 'Sibs Nightttt',
        to: 'fatcow@siblings.com',
        body: `When we doing sibs night again?
        I make cookies, you and Gilbert make Bacon Mac & Cheese.
        Let's get 3rd Sib high and watch The Office.
        Nemo the 4th included.
        -2nd Rank Bro `,
        isRead: false,
        sentAt: 3136253789,
        sentTime: utilService.getTimeFromStamp(3136253789),
        sentDate: utilService.getDateFromStamp(3136253789),
      },
    ];
    storageService.saveToStorage(KEY, emails);
    return emails;
  }
}

function _getIdxById(id) {
  return gEmails.findIndex((email) => email.id === id);
}

function query(filterBy) {
  if (filterBy) {
    const filteredEmails = filterEmails(filterBy);
    return Promise.resolve(filteredEmails);
  }
  return Promise.resolve(gEmails);
}

function filterEmails(filterBy) {
  var { sender, date, showRead } = filterBy;
  if (!sender) sender = '';
  if (!date) date = '';
  var filteredEmails = gEmails.filter((email) => {
    return (
      (email.sender.toLowerCase().includes(sender.toLowerCase()) ||
        email.subject
          .toLowerCase()
          .includes(
            sender.toLowerCase() ||
              email.body.toLowerCase().includes(sender.toLowerCase())
          )) &&
      (email.sentDate ? email.sentDate.includes(date) : true)
    );
  });
  if (showRead === 'showAll') return filteredEmails;
  else {
    var bool = showRead === 'read' ? true : false;
    filteredEmails = filteredEmails.filter((email) => {
      return email.isRead === bool;
    });
    return filteredEmails;
  }
}

function getEmailById(id) {
  var email = gEmails.find((email) => {
    return email.id === id;
  });
  return Promise.resolve(email);
}

function deleteEmail(id) {
  const idx = _getIdxById(id);
  if (gEmails[idx].isTrash) gEmails.splice(idx, 1);
  else gEmails[idx].isTrash = true;
  storageService.saveToStorage(KEY, gEmails);
  return Promise.resolve();
}

function restoreEmail(id) {
  const idx = _getIdxById(id);
  gEmails[idx].isTrash = false;
  storageService.saveToStorage(KEY, gEmails);
  return Promise.resolve();
}

function setReadState(id) {
  const idx = _getIdxById(id);
  gEmails[idx].isRead = !gEmails[idx].isRead;
  storageService.saveToStorage(KEY, gEmails);
  return Promise.resolve();
}

function starEmail(id) {
  const idx = _getIdxById(id);
  if (gEmails[idx].isStarred) gEmails[idx].isStarred = false;
  else gEmails[idx].isStarred = true;
  storageService.saveToStorage(KEY, gEmails);
  return Promise.resolve();
}

function saveToDrafts(email) {
  var idx = _getIdxById(email.id);
  if (idx !== -1) {
    gEmails.splice(idx, 1);
  }
  gEmails.push(email);
  storageService.saveToStorage(KEY, gEmails);
}
function saveToEmails(email) {
  gEmails.push(email);
  storageService.saveToStorage(KEY, gEmails);
}

export const emailService = {
  gEmails,
  query,
  getEmailById,
  setReadState,
  deleteEmail,
  restoreEmail,
  starEmail,
  saveToDrafts,
  saveToEmails,
};
